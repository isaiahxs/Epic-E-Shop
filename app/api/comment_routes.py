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
    # print("THIS IS OUR ITEM IDDDDDDADFJADJFA;JFSDJDFLJDFLJ", itemId)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item = Item.query.filter_by(item_id=itemId).first()
        # print("THIS IS THE ITEM WE'RE EXPECTING TO SEE", item)

        if item is None:
            return {'errors': ['Item not found']}, 404

        comment = Comment(
            user_id=current_user.id,
            item_id=itemId,
            text=form.data['text']
        )

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    return {'errors': form.errors}, 401

@comment_routes.route('/<itemId>', methods=['PUT'])
@login_required
def edit_comment(id):
    """
    Edit a comment by id
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data
    comment = Comment.query.get(id)
    if comment is None:
        return {'errors': ['Comment not found']}, 404
    if current_user.id != comment.user_id:
        return {'errors': ['Unauthorized. You do not have permission to edit this comment.']}, 401
    comment.user_id = current_user.id
    comment.item_id = comment.item_id
    comment.text = data['text']
    db.session.commit()
    comment = Comment.query.get(id)
    return comment.to_dict()


    # if form.validate_on_submit():
    #     comment = Comment.query.get(id)
    #     comment.text = form.data['text']
    #     db.session.commit()

    #     return comment.to_dict()
    # return {'errors': form.errors}, 401