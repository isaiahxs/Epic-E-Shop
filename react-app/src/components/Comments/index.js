import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
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
    const [newCommentText, setNewCommentText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(createComment(currentItem.itemId, {text: newCommentText, userId: sessionUser.id}))
        setNewCommentText('');
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
    const currentItemComments = currentItem ? allComments.filter(comment => comment.itemId === currentItem.itemId) : [];

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); //this will get the month name
        const year = date.getFullYear();
        
        //function to convert day into ordinal number (1st, 2nd, 3rd, etc.)
        function getOrdinal(n) {
            const s = ["th","st","nd","rd"],
            v = n % 100;
            return n + (s[(v-20)%10] || s[v] || s[0]);
        }
    
        return `${month} ${getOrdinal(day)}, ${year}`;
    }

    const userHasPosted = currentItemComments.some(comment => comment.userId === sessionUser?.id);

    return (
        currentItem ? (
            <div className='item-detail-comments'>
                <h2 className='idp-subheading'>Comments ({currentItemComments?.length})</h2>
                <div className='posted-comments'>
                    {currentItemComments.map(comment => (
                        <div key={comment.id}>
                            <div className='old-comments'>
                                <div className='comment-profile-image-container'>
                                    <img src={comment?.profileImage} alt='profile' className='comment-profile-image' />
                                </div>

                                <div className='old-comment-content'>
                                    <h3>{comment.text}</h3>
                                    {comment.updatedAt === comment.createdAt &&
                                        <h3>{comment.username} - {formatDate(comment.createdAt)}</h3>
                                    }

                                    {comment.updatedAt !== comment.createdAt &&
                                        <h3>{comment.username} - {formatDate(comment.updatedAt)} [Edited]</h3>
                                    }
                                </div>
                            </div>

                            <div className='comment-content'>
                                {editingCommentId === comment?.id &&
                                    <div className='edit-comment-container'>
                                        <form className='edit-comment-form' onSubmit={(e) => handleEditSubmit(e, comment?.id)}>
                                            <input 
                                                className='comment-input'
                                                placeholder={commentText}
                                                value={editText} 
                                                onChange={(e) => setEditText(e.target.value)} 
                                                required
                                            />
                                            <div className='active-edit-delete-comment-buttons'>
                                                <button className='submit-comment submit-edit' type="submit" disabled={editText.length === 0}>Submit Edit</button>
                                                <button className='cancel-edit red-button' onClick={() => setEditingCommentId(null)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>

                            <div>
                                {userId && userId === comment?.userId && editingCommentId !== comment.id && 
                                    <div className='edit-delete-comment-buttons'>
                                        <button className='edit-comment-button green-button' onClick={() => handleEdit(comment.id, comment.text)}>Edit</button>
                                        <button className='delete-comment-button red-button' onClick={() => handleDelete(comment?.id)}>Delete</button>
                                    </div>
                                }
                            </div>

                        </div>
                    ))}
                </div>

                {!sessionUser &&
                    <h3 className='must-be-logged-in'>You must be logged in to leave a comment on this item.</h3>
                }

                <div className='new-comment-section'>
                    {sessionUser && !userHasPosted &&
                        <form className='new-comment-form' onSubmit={handleSubmit}>
                            <input
                            className='comment-input new-comment-input'
                            value={newCommentText}    
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder='Add a comment...'
                            required
                            />
                            <button className='submit-comment' type='submit' disabled={newCommentText.length === 0}>Submit</button>
                        </form>
                    }
                </div>
            </div>
        ) :
            <div>
                Loading...
            </div>
    )
}

export default Comments;