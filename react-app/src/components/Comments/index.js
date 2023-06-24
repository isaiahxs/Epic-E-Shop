import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { setComments, addComment, getComments, createComment } from '../../store/comments'
import './Comments.css'

const Comments = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    console.log(currentItem)
    const allComments = useSelector(state => state.comments)
    const sessionUser = useSelector(state => state.session.user);
    // console.log(allComments)
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createComment(currentItem.itemId, {text: commentText, userId: sessionUser.id}))
        // dispatch(createComment({text: commentText, itemId: currentItem.itemId, userId: sessionUser.id}))
        // dispatch(createComment(currentItem.item_id, commentText))

        setCommentText('');
    }

    //filtering comments to only include those whose itemId matches the itemId of the currentItem
    const currentItemComments = allComments.filter(comment => comment.itemId === currentItem.itemId);

    return (
        <div className='item-detail-comments'>
            <div className='posted-comments'>
                <h1>Comments ({allComments?.length})</h1>
                {currentItemComments.map(comment => (
                    <div key={comment.id}>
                        <h3>{comment.text}</h3>
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