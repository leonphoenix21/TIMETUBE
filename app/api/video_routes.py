from flask import Blueprint, jsonify, request
from app.models import Video, db
from datetime import datetime
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from sqlalchemy.orm import relationship, sessionmaker, joinedload

video_routes = Blueprint('video', __name__)


@video_routes.route('/', methods=['POST', 'PUT'])
def new_video():
    """
    Create a New video
    """
    if request.method == 'POST':
        keys = list(request.files.to_dict().keys())
        if len(keys) != 2:
            return {"errors": "No file uploaded"}

        raw_video_url = request.files["video_url"]
        raw_image_url = request.files["image_url"]

        if not allowed_file(raw_video_url.filename):
            return {"errors": ["video file type not permitted"]}

        if not allowed_file(raw_image_url.filename):
            return {"errors": ["image file type not permitted"]}

        raw_video_url.filename = get_unique_filename(
            raw_video_url.filename)
        raw_image_url.filename = get_unique_filename(
            raw_image_url.filename)

        video_upload = upload_file_to_s3(raw_video_url)
        image_upload = upload_file_to_s3(raw_image_url)

        video_url = video_upload["url"]
        image_url = image_upload["url"]

        video = Video(
            user_id=request.form['user_id'],
            title=request.form['title'],
            video_url=video_url,
            description=request.form['description'],
            image_url=image_url,
        )

        if video:
            db.session.add(video)
        else:
            return {"errors": ["error with video/image file"]}

    else:
        if not any(request.files):
            video = Video.query.get(int(request.form["id"]))
            video.title = request.form['title']
            video.description = request.form['description']
            video.updated_at = datetime.now()
        else:
            keys = list(request.files.to_dict().keys())
            if len(keys) == 2:
                raw_video_url = request.files["video_url"]
                raw_image_url = request.files["image_url"]

                if not allowed_file(raw_video_url.filename):
                    return {"errors": ["video file type not permitted"]}

                if not allowed_file(raw_image_url.filename):
                    return {"errors": ["image file type not permitted"]}

                raw_video_url.filename = get_unique_filename(
                    raw_video_url.filename)
                raw_image_url.filename = get_unique_filename(
                    raw_image_url.filename)

                video_upload = upload_file_to_s3(raw_video_url)
                image_upload = upload_file_to_s3(raw_image_url)

                video_url = video_upload["url"]
                image_url = image_upload["url"]

                video = Video.query.get(int(request.form["id"]))
                video.title = request.form['title']
                video.video_url = video_url,
                video.description = request.form['description']
                video.image_url = image_url
                video.updated_at = datetime.now()
            elif keys[0] == "video_url":
                raw_video_url = request.files["video_url"]

                if not allowed_file(raw_video_url.filename):
                    return {"errors": ["video file type not permitted"]}

                raw_video_url.filename = get_unique_filename(
                    raw_video_url.filename)

                video_upload = upload_file_to_s3(raw_video_url)

                video_url = video_upload["url"]

                video = Video.query.get(int(request.form["id"]))
                video.title = request.form['title']
                video.video_url = video_url,
                video.description = request.form['description']
                video.updated_at = datetime.now()

            elif keys[0] == "image_url":
                raw_image_url = request.files["image_url"]

                if not allowed_file(raw_image_url.filename):
                    return {"errors": ["image file type not permitted"]}

                raw_image_url.filename = get_unique_filename(
                    raw_image_url.filename)

                image_upload = upload_file_to_s3(raw_image_url)

                image_url = image_upload["url"]

                video = Video.query.get(int(request.form["id"]))
                video.title = request.form['title']
                video.description = request.form['description']
                video.image_url = image_url
                video.updated_at = datetime.now()

    db.session.commit()
    if video:
        return video.to_dict()
    else:
        return {"errors": ["error with video/image file"]}


@video_routes.route('/')
def get_all_videos():
    """
    Get All videos
    """
    videos = Video.query.all()
    return jsonify([video.to_dict() for video in videos])


@video_routes.route('/<int:id>', methods=['DELETE'])
def delete_video(id):
    """
    Delete video of id
    """
    video = Video.query.get(id)
    if video:
        db.session.delete(video)
        db.session.commit()
        return {'id': id}


@video_routes.route('/', methods=['PATCH'])
def view_count():
    """
    View count of video id
    """
    video = Video.query.get(int(request.form['id']))
    video.view_count = request.form["view_count"]
    db.session.commit()
    return video.to_dict()
