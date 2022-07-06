# from email.policy import default
from .db import db


video_likes = db.Table(
    "videosLikes",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "video_id", db.Integer, db.ForeignKey("videos.id"), primary_key=True
    )
)


# class Vid_Like(db.Model):
#     __tablename__ = 'vid_likes'

#     id = db.Column(db.Integer, primary_key=True)
#     video_id = db.Column(db.Integer, db.ForeignKey(
#         "videos.id"), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     is_liked = db.Column(db.String)

#     user = db.relationship("User", back_populates="video_likes")
#     video = db.relationship("Video", back_populates="video_likes")

#     def to_dict(self):
#         return{
#             'id': self.id,
#             'user_id': self.user_id,
#             'video_id': self.video_id,
#             'is_liked': self.is_liked
#         }
