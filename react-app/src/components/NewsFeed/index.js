import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import theWilds from '../../assets/images/The-Wilds.jpg'
import mud from '../../assets/images/Mud.jpg'
import raptorRiding from '../../assets/images/Raptor-Riding.jpg'
import autograph from '../../assets/images/Autograph-Please.jpg'
import wildsCharacters from '../../assets/images/Wilds-Characters.jpeg'
import './NewsFeed.css'

const NewsFeed = () => {
    return (
        <>
            <h2>Latest News</h2>
            <div className='news-feed'>
                <div className='latest-news'>
                    <div className='feed-image-container'>
                        <img className='news-image' src={theWilds} alt='The Wilds' />
                    </div>
                    <div className='news-text'>
                        <h3 className='news-text-heading'>Chapter 4 Season 3: WILDS</h3>
                        <p className='news-text-body'>The WILDS await! Explore the vast jungle on the back of a raptor, ascend the high canopies or slide through the mud for additional speed and camouflage.</p>
                    </div>
                </div>
                <div className='latest-news'>
                    <div className='feed-image-container'>
                        <img className='news-image' src={raptorRiding} alt='Raptor Riding' />
                    </div>
                    <div className='news-text'>
                        <h3 className='news-text-heading'>Raptor Riding</h3>
                        <p className='news-text-body'>Raptors are running wild! Make your enemies go extinct as you traverse the jungles on these fearsome creatures.</p>
                    </div>
                </div>
                <div className='latest-news'>
                    <div className='feed-image-container'>
                        <img className='news-image' src={mud} alt='Mud' />
                    </div>
                    <div className='news-text'>
                        <h3 className='news-text-heading'>Mud</h3>
                        <p className='news-text-body'>Watch your step! Slide through a puddle of mud for a boost in speed and gain camouflage.</p>
                    </div>
                </div>
                <div className='latest-news'>
                    <div className='feed-image-container'>
                        <img className='news-image' src={wildsCharacters} alt='Shockwave Grenades' />
                    </div>
                    <div className='news-text'>
                        <h3 className='news-text-heading'>Shockwave Grenades</h3>
                        <p className='news-text-body'>Now available in Zero Build, bounce around the jungle with Shockwave Grenades!</p>
                    </div>
                </div>
                <div className='latest-news'>
                    <div className='feed-image-container'>
                        <img className='news-image' src={autograph} alt='Autograph Please!' />
                    </div>
                    <div className='news-text'>
                        <h3 className='news-text-heading'>Autograph Please!</h3>
                        <p className='news-text-body'>A long awaited emote is expected to return soon!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsFeed;