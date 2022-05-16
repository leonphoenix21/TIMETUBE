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
        song_id=request.form['song_id'],
        song_timestamp=request.form['song_timestamp']
    )
    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()
