from .db import db
from .vid_likes import video_likes
from .vid_dislikes import video_dislikes
from datetime import datetime


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(75), nullable=False)
    video_url = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="video")
    comments = db.relationship(
        "Comment", back_populates="video", cascade="all, delete")

    likes = db.relationship(
        "User",
        secondary=video_likes,
        back_populates="likes"
    )
    dislikes = db.relationship(
        "User",
        secondary=video_dislikes,
        back_populates="dislikes"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'video_url': self.video_url,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'likes': [like.id for like in self.likes],
            'dislikes': [dislike.id for dislike in self.dislikes]
        }

#  video_likes = db.relationship(
#         "Vid_Like", back_populates="video", cascade="all, delete")
