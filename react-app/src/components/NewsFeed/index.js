import theWilds from '../../assets/images/The-Wilds.jpg'
import mud from '../../assets/images/Mud.jpg'
import raptorRiding from '../../assets/images/Raptor-Riding.jpg'
import autograph from '../../assets/images/Autograph-Please.jpg'
import summerEscape from '../../assets/images/Summer-Escape.jpeg'
import wildsCharacters from '../../assets/images/Wilds-Characters.jpeg'
import airphoria from '../../assets/images/Airphoria.jpeg'
import './NewsFeed.css'

const NewsFeed = () => {
    return (
        <>
            <div className='news-container'>
            <h2 className='home-subheading latest-news-header'>Latest News</h2>
                <div className='news-feed'>
                    <div className='latest-news'>
                        <div className='feed-image-container'>
                            {/* <div className='news-img-container'> */}
                                <img className='news-image' src={theWilds} alt='The Wilds' />
                            {/* </div> */}
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
                    {/* <div className='latest-news'>
                        <div className='feed-image-container'>
                            <img className='news-image' src={autograph} alt='Autograph Please!' />
                        </div>
                        <div className='news-text'>
                            <h3 className='news-text-heading'>Autograph Please!</h3>
                            <p className='news-text-body'>A long awaited emote is expected to return soon!</p>
                        </div>
                    </div> */}
                    <div className='latest-news'>
                        <div className='feed-image-container'>
                            <img className='news-image' src={summerEscape} alt='Summer Escape' />
                        </div>
                        <div className='news-text'>
                            <h3 className='news-text-heading'>Summer Escape</h3>
                            <p className='news-text-body'>Catch some rays at Sunswoon Lagoon, complete Quests, and find your new summer vibe. Summer Escape is on</p>
                        </div>
                    </div>
                    <div className='latest-news'>
                        <div className='feed-image-container'>
                            <img className='news-image' src={airphoria} alt='Welcome to Airphoria' />
                        </div>
                        <div className='news-text'>
                            <h3 className='news-text-heading'>Welcome to Airphoria</h3>
                            <p className='news-text-body'>Explore the sky city Airphoria and recover Airie’s lost sneakers. Play the Airphoria Island for 10 minutes to receive the Air Max 1 '86 Back Bling</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsFeed;