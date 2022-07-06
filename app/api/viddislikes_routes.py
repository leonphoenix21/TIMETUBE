import json
from flask import Blueprint, jsonify, request
from app.models import db, Video, User, video_dislikes
from datetime import datetime
from sqlalchemy.orm import relationship, sessionmaker, joinedload

dislike_routes = Blueprint('dislike', __name__)


@dislike_routes.route('/', methods=['POST'])
def dislike_video():
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


@dislike_routes.route('/', methods=['DELETE'])
def undislike_video():
    """
        Create a New like on a video
    """

    user_id = request.form["user_id"]
    video_id = request.form["video_id"]
    video = Video.query.get(int(video_id))
    user = User.query.get(int(user_id))

    video.dislikes = [like for like in video.likes if user.id != like.id]
    db.session.commit()
    return video.to_dict()
