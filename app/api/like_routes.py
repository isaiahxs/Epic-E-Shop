# routes for liking, unliking, changing like to dislike and vice versa, etc.

from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__)