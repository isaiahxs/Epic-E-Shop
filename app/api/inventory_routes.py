from flask import Blueprint, jsonify, session, request
from app.models import User, Inventory, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

inventory_routes = Blueprint('inventory', __name__)

@inventory_routes.route('/', methods=['GET'])
@login_required
def get_inventory():
    """
    Get the current user's inventory
    """
    inventory = Inventory.query.filter_by(user_id=current_user.id).all()
    return {'inventory': [inventory_item.to_dict() for inventory_item in inventory]}