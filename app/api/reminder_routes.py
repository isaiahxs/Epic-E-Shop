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

@reminder_routes.route('/<itemId>', methods=['POST'])
@login_required
def create_reminder(itemId):
    """
    Create a new reminder
    """
    duration = request.json.get('duration')
    reminded = request.json.get('reminded')
    
    #if user has already set a reminder for this item, they cannot set another
    reminder = Reminder.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    if reminder is not None:
        return {'error': 'You cannot set two reminders on the same item.'}, 400
    
    reminder = Reminder(
        user_id=current_user.id,
        item_id=itemId,
        duration=duration,
        reminded=reminded
    )
    db.session.add(reminder)
    db.session.commit()

    return reminder.to_dict()

@reminder_routes.route('/<itemId>', methods=['PUT'])
@login_required
def update_reminder(itemId):
    """
    Update a reminder
    """
    duration = request.json.get('duration')
    reminded = request.json.get('reminded', False)
    
    reminder = Reminder.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    if reminder is None:
        return {'error': 'You do not have a reminder set for this item.'}, 400
    
    reminder.duration = duration
    reminder.reminded = reminded
    db.session.commit()

    return reminder.to_dict()

@reminder_routes.route('/<itemId>', methods=['DELETE'])
@login_required
def delete_reminder(itemId):
    """
    Delete a reminder
    """
    reminder = Reminder.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    if reminder is None:
        return {'error': 'You do not have a reminder set for this item.'}, 400
    
    db.session.delete(reminder)
    db.session.commit()

    return {'message': 'Reminder deleted successfully.'}, 200