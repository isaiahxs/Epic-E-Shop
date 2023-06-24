from flask import Blueprint, jsonify, session, request
from app.models import Item, Comment, db
from app.forms import LoginForm, SignUpForm, CommentForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
def get_comments():
    """
    Query for all comments and returns them in a list of comment dictionaries
    """
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/<itemId>', methods=['POST'])
@login_required
def create_comment(itemId):
    """
    Create a new comment
    """

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            item_id=itemId,
            text=form.data['text']
        )

        db.session.add(comment)
        db.session.commit()
        item = Item.query.get(comment.item_id)
        return item.to_dict()
    return {'errors': form.errors}, 401