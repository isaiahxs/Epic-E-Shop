# contains routes for actions related to user's cart, like adding, removing, getting current contents of the cart, etc.

from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

cart_routes = Blueprint('cart', __name__)