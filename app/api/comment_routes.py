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

@comment_routes.route('/<id>', methods=['PUT'])
# @login_required
# def edit_comment(id):
#     """
#     Edit a comment by id
#     """
#     print('THIS IS THE REQUEST GET JSON', request.get_json())

#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate_on_submit():
#         return {'errors': form.errors}, 400

#     comment = Comment.query.get(id)
#     if comment is None:
#         return {'errors': ['Comment not found']}, 404
#     if current_user.id != comment.user_id:
#         return {'errors': ['Unauthorized. You do not have permission to edit this comment.']}, 401

#     comment.text = form.data['text']
#     print('NEW COMMENT TEXT:', comment.text)

#     # manually updating the comment to narrow down where the issue might be
#     # # Get the comment
#     # comment = Comment.query.get(4)  # replace with the correct comment id
#     # print('Old comment text:', comment.text)

#     # # Update the comment
#     # comment.text = 'New comment text'
#     # db.session.commit()

#     # # Fetch the comment again and print the new text
#     # comment = Comment.query.get(4)  # replace with the correct comment id
#     # print('New comment text:', comment.text)

#     try:
#         db.session.commit()
#     except Exception as e:
#         print('Error while committing:', e)

#     return comment.to_dict()

@login_required
def edit_comment(id):
    """
    Edit a comment by id
    """
    data = request.get_json()
    print('THIS IS THE REQUEST GET JSON', data)

    comment = Comment.query.get(id)
    if comment is None:
        return {'errors': ['Comment not found']}, 404
    if current_user.id != comment.user_id:
        return {'errors': ['Unauthorized. You do not have permission to edit this comment.']}, 401

    comment.text = data['text']
    db.session.commit()

    return comment.to_dict()