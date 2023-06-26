import {useSelector, useDispatch} from 'react-redux'
import { postLike, deleteLike, postDislike, deleteDislike, switchVoteLike } from '../../store/like'
import './ItemLikes.css'

const ItemLikes = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    const allLikes = useSelector(state => state.totalLikes)
    // console.log(allLikes)

    const addLikeHandler = (value) => {
        dispatch(postLike(currentItem.itemId, value))
    }

    const removeLikeHandler = () => {
        dispatch(deleteLike(currentItem.itemId))
    }

    const dislikeHandler = (value) => {
        dispatch(postDislike(currentItem.itemId, value))
    }

    const removeDislikeHandler = () => {
        dispatch(deleteDislike(currentItem.itemId))
    }

    const switchVoteHandler = (value) => {
        dispatch(switchVoteLike(currentItem.itemId, value))
    }

    let likesCount = 0;
    let dislikesCount = 0;
    let message = "This item doesn't have likes or dislikes yet, be the first to give it one!";
    if (allLikes && currentItem) {
        const likes = allLikes.filter(like => like.itemId === currentItem.itemId);  // filter likes for this specific item
        if (likes.length > 0) {
            likesCount = likes.filter(like => like.value === true).length;
            dislikesCount = likes.filter(like => like.value === false).length;
            message = `Likes: ${likesCount} Dislikes: ${dislikesCount}`;
        }
    }

    return (
        <div className='item-detail-likes'>
            <h1>Votes ({likesCount + dislikesCount})</h1>
            <h3 className='likes'>{message}</h3>
            {/* <button className='like-button' onClick={() => history.push(`/item/${item.name}/like`)}>Like</button> */}
            <button className='like-button' onClick={() => addLikeHandler(true)}>Like</button>
            <button className='remove-like-button' onClick={() => removeLikeHandler()}>Remove Like</button>
            <button className='dislike-button' onClick={() => dislikeHandler(false)}>Dislike</button>
            <button className='remove-dislike-button' onClick={() => removeDislikeHandler()}>Remove Dislike</button>
            <button className='switch-vote-button' onClick={() => switchVoteHandler(true)}>Switch Vote</button>
        </div>
    )
}

export default ItemLikes;