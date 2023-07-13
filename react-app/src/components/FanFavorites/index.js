import {useSelector, useDispatch} from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import './FanFavorites.css'

const FanFavorites = () => {
    const dispatch = useDispatch()
    const fanFavorites = useSelector(state => state.items.seedItems)
    const history = useHistory()

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
                    <h2 className='home-subheading'>All-time fan favorites</h2>
                </div>
                <Slider {...settings}>
                    {fanFavorites.length > 0 && fanFavorites.slice(0, 7).map((item, idx) => (
                        <div className='item-unit' key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                            <div className={`img-container ${item.rarity}-container`}>
                                <img className={`home-item-image ${item.rarity}`} src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
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