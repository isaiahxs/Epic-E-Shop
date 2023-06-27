# contains routes for actions related to user's cart, like adding, removing, getting current contents of the cart, etc.

from flask import Blueprint, jsonify, session, request
from app.models import Cart, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_cart():
    """
    Get the current user's cart
    """
    cart = Cart.query.filter_by(user_id=current_user.id).all()
    return {'cart': [cart_item.to_dict() for cart_item in cart]}

@cart_routes.route('/<itemId>', methods=['POST'])
@login_required
def add_to_cart(itemId):
    """
    Add an item to the user's cart
    """

    #check if the item already exists in the cart
    existing_item = Cart.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    
    #ff it does, return an error message
    if existing_item:
        return jsonify({'error': 'Item already in cart.'}), 400
    
    cart_item = Cart(
        user_id=current_user.id,
        item_id=itemId
    )

    db.session.add(cart_item)
    db.session.commit()

    return cart_item.to_dict()

@cart_routes.route('/<itemId>', methods=['DELETE'])
@login_required
def remove_from_cart(itemId):
    """
    Remove an item from the user's cart
    """
    print('THIS IS THE itemId FROM INSIDE THE REMOVE_FROM_CART ROUTE', itemId)

    cart_item = Cart.query.filter_by(user_id=current_user.id, item_id=itemId).first()
    print('THIS IS THE CART_ITEM FROM INSIDE THE REMOVE_FROM_CART ROUTE', cart_item)

    if not cart_item:
        return jsonify({'error': 'Item not in cart.'}), 400

    db.session.delete(cart_item)
    db.session.commit()

    # return cart_item.to_dict()
    return {"message": 'Item removed from cart.'}