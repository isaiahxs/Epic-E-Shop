# handles actions related to reminders, such as creating a new one, deleting one, or getting all of a user's reminders for example.

from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

reminder_routes = Blueprint('reminders', __name__)