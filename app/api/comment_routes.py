from flask import Blueprint, request
from app.models import Item, Comment, db
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['GET'])
def get_comments():
    """
    Query for all comments and returns them in a list of comment dictionaries
    """
    comments = Comment.query.all()
    # return {'comments': [comment.to_dict() for comment in comments]}

    comments_list = []
    for comment in comments:
        comment_dict = comment.to_dict()
        comment_dict['username'] = comment.user.username  #append the username to the comment dictionary
        comment_dict['profileImage'] = comment.user.profile_image  #append the profile image to the comment dictionary
        comments_list.append(comment_dict)
    return {'comments': comments_list}

@comment_routes.route('/<itemId>', methods=['POST'])
@login_required
def create_comment(itemId):
    """
    Create a new comment
    """
    # print("THIS IS OUR ITEM ID", itemId)
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
            text=form.data['text'],
        )

        db.session.add(comment)
        db.session.commit()

        # return comment.to_dict()
        comment_dict = comment.to_dict()
        comment_dict['username'] = current_user.username  #append the username to the comment dictionary
        comment_dict['profileImage'] = current_user.profile_image  #append the profile image to the comment dictionary

        return comment_dict
    return {'errors': form.errors}, 401

@comment_routes.route('/<id>', methods=['PUT'])
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

    # return comment.to_dict()
    # return comment.to_dict()
    comment_dict = comment.to_dict()
    comment_dict['username'] = current_user.username  #append the username to the comment dictionary
    comment_dict['profileImage'] = current_user.profile_image  #append the profile image to the comment dictionary

    return comment_dict

@comment_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Delete a comment by id
    """
    comment = Comment.query.get(id)
    if comment is None:
        return {'errors': ['Comment not found']}, 404
    if current_user.id != comment.user_id:
        return {'errors': ['Unauthorized. You do not have permission to delete this comment.']}, 401

    db.session.delete(comment)
    db.session.commit()

    # return {'message': 'Comment successfully deleted'}
    return {'id': id} #returning id of the deleted comment