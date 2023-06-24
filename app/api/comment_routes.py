from flask import Blueprint, jsonify, session, request
from app.models import Comment, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/', methods=['GET'])
# def get_comments(itemId):
#     """
#     Get comment by itemId
#     """
#     comment = Comment.query.filter_by(item_id=itemId).all()
#     if comment is None:
#         return {'error': 'No comments found'}, 404
#     return comment.to_dict()

@comment_routes.route('/', methods=['GET'])
def get_comments():
    """
    Query for all comments and returns them in a list of comment dictionaries
    """
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}