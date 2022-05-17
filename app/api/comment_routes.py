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


@comment_routes.route('/')
def get_comments():
    """
    Get all comments of a specific video
    """
    comments = Comment.query.all()
    print(comments, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    return jsonify([comment.to_dict() for comment in comments])
