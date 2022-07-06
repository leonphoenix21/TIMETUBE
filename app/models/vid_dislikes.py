from .db import db


video_dislikes = db.Table(
    "videosdislikes",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "video_id", db.Integer, db.ForeignKey("videos.id"), primary_key=True
    )
)
