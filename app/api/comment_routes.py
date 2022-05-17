from crypt import methods
from flask import Blueprint, jsonify, request
from app.models import Comment, Video, db
from datetime import datetime, time

comment_routes = Blueprint('comment', __name__)


@comment_routes.route('/', methods=['POST'])
def new_comment():
    """
    Create a New Comment
    """
    comment = Comment(
        content=request.form['content'],
        user_id=request.form['user_id'],
        video_id=request.form['video_id'],
        avatar=request.form['avatar'],
        lastname=request.form['lastname'],
        firstname=request.form['firstname']
    )
    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()


@comment_routes.route('/',  methods=['PUT'])
def edit_comment():
    """
    edit comment
    """

    comment = Comment.query.get(int(request.form['id']))
    comment.content = request.form['content']
    comment.updated_at = datetime.now()
    db.session.commit()

    return comment.to_dict()


@comment_routes.route('/')
def get_comments():
    """
    Get all comments of a specific video
    """
    comments = Comment.query.all()
    print(comments, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return jsonify([comment.to_dict() for comment in comments])


@comment_routes.route('/delete', methods=['DELETE'])
def delete_comment():
    """
    Delete Comment by Id
    """
    comment = Comment.query.get(int(request.form['id']))
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
