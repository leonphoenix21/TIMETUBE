from crypt import methods
from flask import Blueprint, jsonify, request
from app.models import Subscriber, db
from datetime import datetime, time

subscribers_routes = Blueprint('subscribers', __name__)


@subscribers_routes.route('/', methods=['POST'])
def new_sub():
    """
    Create a New Subscriber
    """

    subscriber = Subscriber(
        user_id=request.form['user_id']
    )

    db.session.add(subscriber)
    db.session.commit()

    return subscriber.to_dict()


@subscribers_routes.route('/', methods=['POST'])
def remove_sub():
    """
    Remove Subscriber
    """

    user_id = request.form["user_id"]
    user = User.query.get(int(user_id))

    user.subscribers = [sub for sub in user.subscribers if user.id != sub.id]
    db.session.commit()

    return user.to_dict()
