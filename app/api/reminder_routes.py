# handles actions related to reminders, such as creating a new one, deleting one, or getting all of a user's reminders for example.

from flask import Blueprint, jsonify, session, request
from app.models import Reminder, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

reminder_routes = Blueprint('reminders', __name__)

@reminder_routes.route('/', methods=['GET'])
def get_reminders():
    """
    Query for all reminders and returns them in a list of dictionaries
    """
    reminders = Reminder.query.all()
    return {'reminders': [reminder.to_dict() for reminder in reminders]}