import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import cavalry from '../../assets/images/Cavalry-Captain.png'
import welldone from '../../assets/images/Well-Done-SC.png'
import serene from '../../assets/images/SereneHaven-SC.png'
import linkedin from '../../assets/images/linkedin-logo.svg'
import github from '../../assets/images/github-logo.svg'
import './AboutMe.css'

const AboutMe = () => {
    const history = useHistory();

    return (
        <div className='item-detail-container'>
            <div className='item-detail-heading about-me-heading'>
                <div>
                    <img className='item-detail-image about-me-image' src={cavalry} alt="Isaiah as a Fortnite Character"/>
                </div>
                <div className='item-details about-me-details'>
                    <h1 className='item-detail-name'>Isaiah Sinnathamby</h1>
                    <div className='item-rarity-section'>
                        <h3 className='rarity about-me-rarity'>Mythic</h3>
                        <h3 className='item-type'>Outfit</h3>
                    </div>
                    <div className='item-detail-price'>
                        <img className='vbucks-icon' src={"https://image.fnbr.co/price/icon_vbucks.png"} alt='Many vbucks' />
                        1,000,000
                    </div>
                    <div>Full-stack developer with a passion for building dynamic web applications.</div>
                    <div>Release Date: 1998</div>
                    <div>Last Seen Coding: Today</div>
                    {/* <div>Total GitHub Contributions: 1,782+</div> */}
                </div>

                <div className='item-history about-me-history'>
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

                <h2>Check out my socials!</h2>
                <div className='socials'>
                    <div className='linked-in'>
                        <div className='about-img-container'>
                            <img className='social-logo' src={linkedin} alt='LinkedIn Logo' />
                        </div>
                        <div className='social-links'>
                            <a href='https://www.linkedin.com/in/isaiahxs/'>LinkedIn</a>
                        </div>
                    </div>
                    <div className='github'>
                        <div className='about-img-container'>
                            <img className='social-logo' src={github} alt='GitHub Logo' />
                        </div>
                        <div className='social-links'>
                            <a href='https://github.com/isaiahxs'>GitHub</a>
                        </div>
                    </div>
                </div>

                <h2>Check out my other projects!</h2>
                <div className='other-projects'>
                    <div className='serene-haven'>
                        <h3>SereneHaven</h3>
                        <div className='about-img-container'>
                            <img className='project-image' src={serene}/>
                        </div>
                        <div className='project-links'>
                            <a href='https://serene-haven.onrender.com/'>Live Site</a>
                            <div className='separator'>|</div>
                            <a href='https://github.com/isaiahxs/SereneHaven'>GitHub Repo</a>
                        </div>
                    </div>

                    <div className='well-done'>
                        <h3>Well-Done</h3>
                        <div className='about-img-container'>
                            <img className='project-image' src={welldone}/>
                        </div>
                        <div className='project-links'>
                            <a href='https://well-done.onrender.com/'>Live Site</a>
                            <div className='separator'>|</div>
                            <a href='https://github.com/isaiahxs/well-done-group-project'>GitHub Repo</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutMe;