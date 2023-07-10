import {useSelector, useDispatch} from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import './FeaturedItems.css'

const FeaturedItems = () => {
    const allFeaturedItems = useSelector(state => state.items.featuredItems)
    const history = useHistory()

    // setting up options for the carousel
    // const settings = {
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 2,
    //     centerMode: true,
    //     centerPadding: "110px",
    // };

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
            <div className='featured-items-carousel'>
                <div className='home-subheading-container'>
                    <h2 className='home-subheading'>Today's Featured Items</h2>
                </div>
                <Slider {...settings}>
                    {/* check if the items array is not empty before trying to map over it */}
                    {allFeaturedItems.length > 0 && allFeaturedItems.map((item, idx) => (
                        <div className='item-unit' key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                            {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
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

export default FeaturedItems;