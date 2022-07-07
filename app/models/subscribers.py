from .db import db


class Subscriber(db.Model):
    ___tablename__ = 'subscriber'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="subscribers")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id
        }
    
# from .db import db


# subscribers = db.Table(
#     "Subscribers",
#     db.Column(
#         "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
#     )
# )
