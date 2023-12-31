import { useSelector, useDispatch } from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import { getDailyItems } from '../../store/items'
import Slider from 'react-slick'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './DailyItems.css'

const DailyItems = () => {
    // const dispatch = useDispatch()
    const allDailyItems = useSelector(state => state.items.dailyItems)
    const history = useHistory()

    // setting up options for the carousel
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // centerMode: true,
        // centerPadding: "110px",
        responsive: [
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='carousel-container'>
            <div className='daily-items-carousel'>
                <div className='home-subheading-container'>
                    <h2 className='home-subheading'>Today's Daily Items</h2>
                </div>
                <Slider {...settings}>
                    {allDailyItems.length > 0 && allDailyItems.map((item, idx) => (
                        <div className='item-unit' key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                            <div className={`img-container ${item.rarity}-container`}>
                                <img className={`home-item-image ${item.rarity}`} src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }} />
                            </div>
                            <div className='home-item-information'>
                                <div className='item-name'>{item.name}</div>
                                <div className='icon-and-price'>
                                    <img className='vbucks-icon' src={vbucks} alt='vbucks' />
                                    <div className='item-price'>{item.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default DailyItems;