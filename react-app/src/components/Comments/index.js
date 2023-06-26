import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { createComment, editComment, deleteComment, getComments } from '../../store/comments'
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
        await dispatch(editComment(commentId, {text: editText, userId: sessionUser.id}))
        setEditingCommentId(null);
        setEditText('');
    }

    const handleDelete = async (commentId) => {
        await dispatch(deleteComment(commentId))
        dispatch(getComments())
    }

    //filtering comments to only include those whose itemId matches the itemId of the currentItem
    const currentItemComments = allComments.filter(comment => comment.itemId === currentItem.itemId);

    return (
        <div className='item-detail-comments'>
            <h2>Comments ({allComments?.length})</h2>
            <div className='posted-comments'>
                {currentItemComments.map(comment => (
                    <div key={comment.id}>
                        <div>
                            <h3>{comment.text}</h3>
                        </div>

                        <div className='comment-content'>
                            {editingCommentId === comment?.id ?
                                <form onSubmit={(e) => handleEditSubmit(e, comment?.id)}>
                                    <input 
                                        className='comment-input'
                                        value={editText} 
                                        onChange={(e) => setEditText(e.target.value)} 
                                        required
                                    />
                                    <button className='submit-comment' type="submit">Submit Edit</button>
                                </form>
                            :
                                <p>{comment?.content}</p>
                            }
                        </div>

                        <div>
                        {userId && userId === comment?.userId && editingCommentId !== comment.id && 
                        <div>
                            <button onClick={() => handleEdit(comment.id, comment.text)}>Edit</button>
                            <button onClick={() => handleDelete(comment?.id)}>Delete</button>
                        </div>
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