from re import A
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/details')
def details():
    items = User.query.all()
    return jsonify([user.to_dict() for user in items])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/edit', methods=['PUT'])
@login_required
def user_users():

    print(request.files)
    print(request.form)
    avatar = request.files["avatar"]
    header = request.files["header"]

    if not allowed_file(avatar.filename):
        return {"errors": "file type not permitted"}, 400

    if not allowed_file(header.filename):
        return {"errors": "file type not permitted"}, 400

    avatar.filename = get_unique_filename(avatar.filename)
    header.filename = get_unique_filename(header.filename)

    avatar_upload = upload_file_to_s3(avatar)
    header_upload = upload_file_to_s3(header)

    if "url" not in avatar_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return avatar_upload, 400

    if "url" not in header_upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return header_upload, 400

    avatar_url = avatar_upload["url"]
    header_url = header_upload["url"]

    """
    Edits the user's users
    """
    user = User.query.get(int(request.form["id"]))
    user.firstname = request.form['firstname'],
    user.lastname = request.form['lastname'],
    user.avatar = avatar_url,
    user.header = header_url,
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
