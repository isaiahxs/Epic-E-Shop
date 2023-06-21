import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import cavalry from '../../assets/images/Cavalry-Captain.png'
import './AboutMe.css'

const AboutMe = () => {
    return (
        <div>
            <div className='item-detail-heading'>
                    <div>
                        <img className='item-detail-image about-me-image' src={cavalry} alt="Isaiah as a Fortnite Character"/>
                    </div>
                    <div className='item-details'>
                        <h1 className='item-detail-name'>Isaiah Sinnathamby</h1>
                        <div className='item-rarity-section'>
                            <h3 className='about-me-rarity'>Mythic</h3>
                            <h3>Outfit</h3>
                        </div>
                        <div>
                            <img className='vbucks-icon' src={"https://image.fnbr.co/price/icon_vbucks.png"} alt='Many vbucks' />
                            1,000,000
                        </div>
                        <div>Full-stack developer with a passion for building dynamic and responsive web applications.</div>
                        <div>Release Date: 1998</div>
                        <div>Last Seen Coding: Today</div>
                        <div>Total GitHub Contributions: 1,782+</div>
                    </div>

                    <div className='item-history'>
                        <h3 className='occurrences'>Skills</h3>
                        <div className='time-days'>
                            <div className='date-days'>
                                <div>Languages & Tools</div>
                            </div>
                            <div className='date-item'>JavaScript</div>
                            <div className='date-item'>HTML</div>
                            <div className='date-item'>CSS</div>
                            <div className='date-item'>React</div>
                            <div className='date-item'>MySQL</div>
                            <div className='date-item'>Redux</div>
                            <div className='date-item'>node.js</div>
                            <div className='date-item'>PostgreSQL</div>
                            <div className='date-item'>python</div>
                        </div>
                    </div>
                </div>

                <div className='about-me-body'>
                    <h2>Check out my other projects!</h2>
                </div>
        </div>
    )
}

export default AboutMe;