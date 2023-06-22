# routes for liking, unliking, changing like to dislike and vice versa, etc.

import os
from flask import Blueprint, jsonify
import requests
import json
from app.models import Like, db
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route('/likes', methods=['GET'])
def get_likes():
    """
    Query for all likes and returns them in a list of like dictionaries
    """
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}