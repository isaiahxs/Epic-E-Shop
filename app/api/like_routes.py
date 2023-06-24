# routes for liking, unliking, changing like to dislike and vice versa, etc.

import os
from flask import Blueprint, jsonify
import requests
import json
from app.models import Like, db
from flask_login import current_user, login_user, logout_user, login_required
from flask import request

like_routes = Blueprint('likes', __name__)

@like_routes.route('/', methods=['GET'])
def get_likes():
    """
    Query for all likes and returns them in a list of like dictionaries
    """
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

#combined like and dislike routes
@like_routes.route('/<itemId>', methods=['POST'])
@login_required
def like_or_dislike(itemId):
    """
    Like or dislike an item
    """
    value = request.json.get('value') # get the value from the request
    like = Like(
        user_id=current_user.id,
        item_id=itemId,
        value=value # use the value from the request
    )
    db.session.add(like)
    db.session.commit()
    
    return like.to_dict()

#combined unlike and undislike routes
@like_routes.route('/<itemId>', methods=['DELETE'])
@login_required
def remove_like_or_dislike(itemId):
    """
    Remove a like or dislike from an item
    """
    value = request.json.get('value')  # get the value from the request

    #query for a Like with the specified value
    like = Like.query.filter_by(user_id=current_user.id, item_id=itemId, value=value).first()
    db.session.delete(like)
    db.session.commit()

    return like.to_dict()

# this will be for the switching of like to dislike or vice versa
@like_routes.route('/<itemId>', methods=['PUT'])
@login_required
def change_like_or_dislike(itemId):
    """
    Change a like to a dislike or a dislike to a like
    """
    value = request.json.get('value')

    #query for a Like, regardless of its value
    like = Like.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    if like is not None:
        like.value = not like.value
        db.session.commit()

        return like.to_dict()
    else:
        return {"error": "No like or dislike found for this user and item"}, 400