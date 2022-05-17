from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(
        "videos.id"), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    video = db.relationship("Video", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'video_id': self.video_id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'avatar': self.avatar,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
