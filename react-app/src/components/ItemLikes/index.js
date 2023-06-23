import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import Slider from 'react-slick'
import './ItemLikes.css'

const ItemLikes = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    const allLikes = useSelector(state => state.likes.likes)
    console.log(allLikes)

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
        <h1>hi</h1>
        <h3 className='likes'>{message}</h3>
        {/* <button className='like-button' onClick={() => history.push(`/item/${item.name}/like`)}>Like</button> */}
    </div>
    )
}

export default ItemLikes;