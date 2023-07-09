import cavalry from '../../assets/images/Cavalry-Captain.png'
import welldone from '../../assets/images/Well-Done-SC.png'
import serene from '../../assets/images/SereneHaven-SC.png'
import linkedin from '../../assets/images/linkedin-logo.svg'
import github from '../../assets/images/github-logo.svg'
import './AboutMe.css'

const AboutMe = () => {
    return (
        <div className='item-detail-container'>
            <div className='item-detail-heading about-me-heading'>
                <div>
                    <img className='item-detail-image about-me-image' src={cavalry} alt="Isaiah as a Fortnite Character"/>
                </div>
                <div className='item-details about-me-details'>
                    <h1 className='item-detail-name'>Isaiah Sinnathamby</h1>
                    <div className='item-rarity-section about-item-rarity-section'>
                        <h3 className='rarity about-me-rarity'>Mythic</h3>
                        <h3 className='item-type'>Outfit</h3>
                    </div>
                    <div className='item-detail-price about-item-detail-price'>
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

            <div className='about-me-body-container'>
                <div className='about-me-body'>

                    <h2 className='body-headers'>Check out my socials!</h2>
                    <div className='socials'>
                        <div className='linked-in'>
                            <div className='about-img-container'>
                                <a href='https://www.linkedin.com/in/isaiahxs/' target='_blank' rel='noopener noreferrer'>
                                    <img className='social-logo' src={linkedin} alt='LinkedIn Logo' />
                                </a>
                            </div>
                            <div className='social-links'>
                                <a href='https://www.linkedin.com/in/isaiahxs/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
                            </div>
                        </div>
                        <div className='github'>
                            <div className='about-img-container'>
                                <a href='https://github.com/isaiahxs' target='_blank' rel='noopener noreferrer'>
                                    <img className='social-logo' src={github} alt='GitHub Logo' />
                                </a>
                            </div>
                            <div className='social-links'>
                                <a href='https://github.com/isaiahxs' target='_blank' rel='noopener noreferrer'>GitHub</a>
                            </div>
                        </div>
                    </div>
                    
                    <h2 className='body-headers'>Check out my other projects!</h2>
                    <h4 className='about-body-subheading'>*Initial render build may take some time to load</h4>
                    <div className='other-projects'>
                        <div className='serene-haven'>
                            {/* <h3 className='project-name'>SereneHaven</h3> */}
                            <a className='project-name' href='https://serene-haven.onrender.com/' target='_blank' rel='noopener noreferrer'>SereneHaven</a>
                            <div className='about-img-container'>
                                <a href='https://serene-haven.onrender.com/' target='_blank' rel='noopener noreferrer'>
                                    <img className='project-image' src={serene} alt='serene-haven project'/>
                                </a>
                            </div>
                            <div className='project-links'>
                                <a href='https://serene-haven.onrender.com/' target='_blank' rel='noopener noreferrer'>Live Site</a>
                                <div className='separator'>|</div>
                                <a href='https://github.com/isaiahxs/SereneHaven' target='_blank' rel='noopener noreferrer'>GitHub Repo</a>
                            </div>
                        </div>

                        <div className='well-done'>
                            {/* <h3 className='project-name'>Well-Done</h3> */}
                            <a className='project-name' href='https://well-done.onrender.com/' target='_blank' rel='noopener noreferrer'>Well-Done</a>
                            <div className='about-img-container'>
                                <a href='https://well-done.onrender.com/' target='_blank' rel='noopener noreferrer'>
                                    <img className='project-image' src={welldone} alt='well-done project'/>
                                </a>
                            </div>
                            <div className='project-links'>
                                <a href='https://well-done.onrender.com/' target='_blank' rel='noopener noreferrer'>Live Site</a>
                                <div className='separator'>|</div>
                                <a href='https://github.com/isaiahxs/well-done-group-project' target='_blank' rel='noopener noreferrer'>GitHub Repo</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutMe;