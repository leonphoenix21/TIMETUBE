from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/', methods=['PUT'])
def user_users():
    """
    Edits the user's users
    """
    user = User.query.get(int(request.form["id"]))
    user.username = request.form['username'],
    user.firstname = request.form['firstname'],
    user.lastname = request.form['lastname'],
    user.email = request.form['email'],
    user.avatar_url = request.form["avatar_url"],
    user.banner_url = request.form["banner_url"],
    db.session.add(users)
    db.session.commit()
    return user.to_dict()
