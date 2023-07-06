import {useSelector, useDispatch} from 'react-redux'
import { postLike, deleteLike, postDislike, deleteDislike, switchVoteLike } from '../../store/like'
import like from '../../assets/images/good-review.png'
import dislike from '../../assets/images/bad-review.png'
import './ItemLikes.css'

const ItemLikes = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    const allLikes = useSelector(state => state.totalLikes)
    // console.log(allLikes)
    const sessionUser = useSelector(state => state.session.user);

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

    let currentUserVote = null;
    if (allLikes && currentItem && sessionUser) {
        const currentUserLike = allLikes.find(
            (like) => like.itemId === currentItem.itemId && like.userId === sessionUser.id
        );
        if (currentUserLike) {
            currentUserVote = currentUserLike.value ? 'like' : 'dislike';
        }
    }

    return (
        <div className='item-detail-likes'>
            <h2 className='idp-subheading'>Votes ({likesCount + dislikesCount})</h2>
            <h3 className='likes'>{message}</h3>

            {/* {sessionUser &&
                <>
                    <img src={like} alt='like' className='like-button' onClick={() => addLikeHandler(true)}/>
                    <button className='like-button' onClick={() => addLikeHandler(true)}>Like</button>
                    <button className='remove-like-button' onClick={() => removeLikeHandler()}>Remove Like</button>
                    <button className='dislike-button' onClick={() => dislikeHandler(false)}>Dislike</button>
                    <button className='remove-dislike-button' onClick={() => removeDislikeHandler()}>Remove Dislike</button>
                    <button className='switch-vote-button' onClick={() => switchVoteHandler(true)}>Switch Vote</button>
                </>
            } */}

            {sessionUser && currentUserVote === null &&
                <>
                    <button className='like-button' onClick={() => addLikeHandler(true)}>Like</button>
                    <button className='dislike-button' onClick={() => dislikeHandler(false)}>Dislike</button>
                </>
            }
            {sessionUser && currentUserVote === 'like' &&
                <>
                    <button className='remove-like-button' onClick={() => removeLikeHandler()}>Remove Like</button>
                    <button className='switch-vote-button' onClick={() => switchVoteHandler(false)}>Switch to Dislike</button>
                </>
            }
            {sessionUser && currentUserVote === 'dislike' &&
                <>
                    <button className='remove-dislike-button' onClick={() => removeDislikeHandler()}>Remove Dislike</button>
                    <button className='switch-vote-button' onClick={() => switchVoteHandler(true)}>Switch to Like</button>
                </>
            }
        </div>
    )
}

export default ItemLikes;