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
    const likes = useSelector(state => state.likes.likes.likes)

    useEffect(() => {
        const seedItemsStored = localStorage.getItem('seedItems');
        const dailyItemsStored = localStorage.getItem('dailyItems');
        const featuredItemsStored = localStorage.getItem('featuredItems');
        const likesStored = localStorage.getItem('likes');

        if (!seedItemsStored || !dailyItemsStored || !featuredItemsStored || !likesStored) {
            dispatch(getSeedItems())
            dispatch(getDailyItems())
            dispatch(getFeaturedItems())
            dispatch(getLikes())
        } else {
            dispatch(setSeedItems(JSON.parse(seedItemsStored)));
            dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
            dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
            dispatch(setLikes(JSON.parse(likesStored)));
        }
    }, [dispatch]);

    let likesCount = 0;
    let dislikesCount = 0;
    let message = "This item doesn't have likes or dislikes yet, be the first to give it one!";
    if (likes) {
        likesCount = likes.filter(like => like.value === true).length;
        dislikesCount = likes.filter(like => like.value === false).length;
        message = `Likes: ${likesCount} Dislikes: ${dislikesCount}`;
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