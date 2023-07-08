import {useSelector, useDispatch} from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import { getDailyItems } from '../../store/items'
import Slider from 'react-slick'
import './DailyItems.css'

// const DailyItems = () => {
//     const dispatch = useDispatch()
//     const allDailyItems = useSelector(state => state.items.dailyItems)
//     const [carouselStartIndex, setCarouselStartIndex] = useState(0);
//     const history = useHistory()

//     const items = allDailyItems.slice(carouselStartIndex, carouselStartIndex + 3);

//     useEffect(() => {
//         dispatch(getDailyItems())
//         // dispatch(getFeaturedItems())
//     }, [dispatch])

//     const handleNext = () => {
//         if (carouselStartIndex < allDailyItems.length - 3) {
//             setCarouselStartIndex(carouselStartIndex + 3);
//         }
//     };

//     const handlePrev = () => {
//         if (carouselStartIndex > 0) {
//             setCarouselStartIndex(carouselStartIndex - 3);
//         }
//     };

//     return (
//         <div>
//             <h2>Today's Daily Items</h2>
//             <div className='daily-items-carousel'>
//                 <button className='arrow-button' onClick={handlePrev}>Previous</button>
//                 {/* check if the items array is not empty before trying to map over it */}
//                 {items.length > 0 && items.map((item, idx) => (
//                     <div className='item-unit' key={idx} onClick={() => history.push(`/item/${item.name}`)}>
//                         {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
//                         <div className='img-container'>
//                             <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
//                         </div>
//                         <div className='home-item-information'>
//                             <div className='item-name'>{item.name}</div>
//                             <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
//                             <div className='item-price'>{item.price}</div>
//                         </div>
//                     </div>
//                 ))}
//                 <button className='arrow-button' onClick={handleNext}>Next</button>
//             </div>
//         </div>
//     )
// }

// Alternate iteration with react-slick carousel
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
                    {/* check if the items array is not empty before trying to map over it */}
                    {allDailyItems.length > 0 && allDailyItems.map((item, idx) => (
                    // <div className='item-unit-container'>
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
                    // </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

// export default DailyItems;

export default DailyItems;