import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { setComments, addComment, getComments, createComment } from '../../store/comments'
import { editComment } from '../../store/comments'
import './Comments.css'

const Comments = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);    const allComments = useSelector(state => state.comments)
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id;
    const [commentText, setCommentText] = useState('');
    const [editText, setEditText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createComment(currentItem.itemId, {text: commentText, userId: sessionUser.id}))
        setCommentText('');
    }

    const handleEdit = (commentId, text) => {
        setEditingCommentId(commentId);
        setCommentText(text);
    }

    const handleEditSubmit = async (event, commentId) => {
        event.preventDefault();
        await dispatch(editComment(currentItem.itemId, commentId, {text: commentText, userId: sessionUser.id}))
        setEditingCommentId(null);
        setEditText('');
    }

    //filtering comments to only include those whose itemId matches the itemId of the currentItem
    const currentItemComments = allComments.filter(comment => comment.itemId === currentItem.itemId);

    return (
        <div className='item-detail-comments'>
            <div className='posted-comments'>
                <h1>Comments ({allComments?.length})</h1>
                {currentItemComments.map(comment => (
                    <div>
                        <div key={comment.id}>
                            <h3>{comment.text}</h3>
                        </div>

                        

                        <div>
                        {userId && userId === comment?.userId && editingCommentId !== comment.id && 
                            <button onClick={() => handleEdit(comment.id, comment.text)}>Edit</button>
                        }
                        </div>
                    </div>
                ))}
            </div>

            <div className='new-comment-section'>
                {sessionUser &&
                    <form className='new-comment-form' onSubmit={handleSubmit}>
                        <input
                        className='comment-input'
                        value={commentText}    
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder='Add a comment...'
                        />
                        <button className='submit-comment' type='submit'>Submit</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default Comments;