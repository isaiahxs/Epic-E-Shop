# contains routes for actions related to user's cart, like adding, removing, getting current contents of the cart, etc.

from flask import Blueprint, jsonify, session, request
from app.models import Cart, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_cart():
    """
    Get the current user's cart
    """
    cart = Cart.query.filter_by(user_id=current_user.id).all()
    return {'cart': [cart_item.to_dict() for cart_item in cart]}