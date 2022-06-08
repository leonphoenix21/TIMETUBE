from flask import Blueprint, jsonify, request
from app.models import db, Video, User
from datetime import datetime
from sqlalchemy.orm import relationship, sessionmaker, joinedload

like_routes = Blueprint('like', __name__)


@like_routes.route('/video/', methods=['POST'])
def like_video():
    """
        Create a New like on a video
    """
    user_id = request.form["user_id"]
    video_id = request.form["video_id"]

    video = Video.query.get(int(video_id))
    user = User.query.get(int(user_id))

    video.likes.append(user)

    db.session.commit()
    return video.to_dict()


@like_routes.route('/video/', methods=['DELETE'])
def unlike_video():
    """
        Create a New like on a video
    """

    user_id = request.form["user_id"]
    video_id = request.form["video_id"]

    video = Video.query.get(int(video_id))
    user = User.query.get(int(user_id))

    video.likes = [like for like in video.likes if user.id != like.id]
    db.session.commit()
    return video.to_dict()
