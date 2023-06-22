import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { getSeedItems } from '../../store/items'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import './FanFavorites.css'

const FanFavorites = () => {
    const dispatch = useDispatch()
    const fanFavorites = useSelector(state => state.items.seedItems)
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(getSeedItems())
    // }, [dispatch])

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: "110px",
    };

    return (
        <div className='carousel-container'>
            <div className='daily-items-carousel'>
                <h2>Some of the all-time fan favorites.</h2>
                <Slider {...settings}>
                    {/* check if the items array is not empty before trying to map over it */}
                    {fanFavorites.length > 0 && fanFavorites.map((item, idx) => (
                        <div className='item-unit' key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                            {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
                            <div className='img-container'>
                                <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                            </div>
                            <div className='home-item-information'>
                                <div className='item-name'>{item.name}</div>
                                <div className='icon-and-price'>
                                    <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
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

export default FanFavorites;