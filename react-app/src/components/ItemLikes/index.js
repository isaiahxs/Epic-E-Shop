import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { useState, useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import { postLike } from '../../store/like'
import './ItemLikes.css'

const ItemLikes = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    const allLikes = useSelector(state => state.totalLikes.likes)
    // console.log(allLikes)

    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [message, setMessage] = useState("This item doesn't have likes or dislikes yet, be the first to give it one!");

    // const addLikeHandler = (value) => {
    //     dispatch(postLike(currentItem.itemId, value));
    //     if (value) {
    //         setLikesCount(prevLikes => prevLikes + 1)
    //     } else {
    //         setDislikesCount(prevDislikes => prevDislikes + 1)
    //     }
    // }

    // const addLikeHandler = (value) => {
    //     dispatch(postLike(currentItem.itemId, value)).then(() => {
    //         if (value) {
    //             setLikesCount(prevLikes => prevLikes + 1)
    //         } else {
    //             setDislikesCount(prevDislikes => prevDislikes + 1)
    //         }
    //     }).catch(error => {
    //         console.error('Error liking item', error);
    //     });
    // }

    const addLikeHandler = (value) => {
        dispatch(postLike(currentItem.itemId, value)).then(() => {
            if (value) {
                setLikesCount(prevLikes => prevLikes + 1)
            } else {
                setDislikesCount(prevDislikes => prevDislikes + 1)
            }
        }).catch(error => {
            console.error('Error liking item', error);
        });
    }

    useEffect(() => {
        if (allLikes && currentItem) {
            const likes = allLikes.filter(like => like.itemId === currentItem.itemId);  // filter likes for this specific item
            if (likes.length > 0) {
                setLikesCount(likes.filter(like => like.value === true).length);
                setDislikesCount(likes.filter(like => like.value === false).length);
                setMessage(`Likes: ${likesCount} Dislikes: ${dislikesCount}`);
            }
        }
    }, [allLikes, currentItem, likesCount, dislikesCount]);

    return (
        <div className='item-detail-likes'>
        <h1>hi</h1>
        <h3 className='likes'>{message}</h3>
        {/* <button className='like-button' onClick={() => history.push(`/item/${item.name}/like`)}>Like</button> */}
        <button className='like-button' onClick={() => addLikeHandler(true)}>Like</button>
    </div>
    )
}

export default ItemLikes;