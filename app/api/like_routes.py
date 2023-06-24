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

@like_routes.route('/<itemId>', methods=['POST'])
@login_required
def like(itemId):
    """
    Like an item
    """
    like = Like(
        user_id=current_user.id,
        item_id=itemId,
        value=request.json.get('value')
    )
    db.session.add(like)
    db.session.commit()
    
    return like.to_dict()

@like_routes.route('/<itemId>', methods=['DELETE'])
@login_required
def unlike(itemId):
    """
    Unlike an item
    """
    like = Like.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    db.session.delete(like)
    db.session.commit()

    return like.to_dict()

@like_routes.route('/<itemId>', methods=['POST'])
@login_required
def dislike(itemId):
    """
    Dislike an item
    """
    print("THIS IS OUR REQUEST JSON", request.json)

    dislike = Like(
        user_id=current_user.id,
        item_id=itemId,
        # value=False
        value=request.json.get('value')
    )
    db.session.add(dislike)
    db.session.commit()

    return dislike.to_dict()

# @like_routes.route('/<itemId>', methods=['DELETE'])
# @login_required
# def undislike(itemId):
#     """
#     Undislike an item
#     """
#     like = Like.query.filter_by(user_id=current_user.id, item_id=itemId).first()
#     db.session.delete(like)
#     db.session.commit()

#     return like.to_dict()

# this will be for the switching of like to dislike or vice versa
# @like_routes.route('/<itemId>', methods=['PUT'])