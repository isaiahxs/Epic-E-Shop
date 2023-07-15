import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { useEffect, useState } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './Featured.css'

const Featured = () => {
    const dispatch = useDispatch();
    const featuredItems = useSelector(state => state.items.featuredItems);
    // console.log('featuredItems', featuredItems);
    const history = useHistory();

    const [filterType, setFilterType] = useState('all');
    const [filterRarity, setFilterRarity] = useState('all');
    const [priceFilter, setPriceFilter] = useState('');



    useEffect(() => {
        const seedItemsStored = localStorage.getItem('seedItems');
        const dailyItemsStored = localStorage.getItem('dailyItems');
        const featuredItemsStored = localStorage.getItem('featuredItems');
        const likesStored = localStorage.getItem('likes');
    
        if (!seedItemsStored || !dailyItemsStored || !featuredItemsStored || !likesStored) {
            dispatch(getSeedItems())
            dispatch(getDailyItems())
            dispatch(getFeaturedItems())
            dispatch(getLikes())
        } else {
            dispatch(setSeedItems(JSON.parse(seedItemsStored)));
            dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
            dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
            dispatch(setLikes(JSON.parse(likesStored)));
        }
    }, [dispatch]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const filteredItems = featuredItems.filter(item => {
        const itemTypeMatches = filterType === 'all' || item.type === filterType;
        const rarityMatches = filterRarity === 'all' || item.rarity === filterRarity;
    
        const price = Number(item.price.replace(",", ""));
        let priceMatches;
        switch(priceFilter) {
            case "< 500 V-Bucks":
                priceMatches = price < 500;
                break;
            case "500 - 1500 V-Bucks":
                priceMatches = price >= 500 && price <= 1500;
                break;
            case "> 1500 V-Bucks":
                priceMatches = price > 1500;
                break;
            default:
                priceMatches = true;
        }
        
        return itemTypeMatches && rarityMatches && priceMatches;
    });

    return (
        <>
            <h1 className='featured-header'>Today's Featured Items</h1>
            <div className='filter-bar'>
                <label className='filter-segment type-filter'>
                    Type:
                    <select value={filterType} className='filter-select' onChange={e => setFilterType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="outfit">Outfit</option>
                        <option value="pickaxe">Pickaxe</option>
                        <option value="glider">Glider</option>
                        <option value="emote">Emote</option>
                        <option value="backpack">Backpack</option>
                        <option value="music">Music</option>
                        <option value="wrap">Wrap</option>
                        <option value="bundle">Bundle</option>
                    </select>
                </label>
                <label className='filter-segment price-filter'>
                    Price:
                    <select value={priceFilter} className='filter-select' onChange={e => setPriceFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="< 500 V-Bucks">&lt; 500 V-Bucks</option>
                        <option value="500 - 1500 V-Bucks">500 - 1500 V-Bucks</option>
                        <option value="> 1500 V-Bucks">&gt; 1500 V-Bucks</option>
                    </select>
                </label>
                <label className='filter-segment rarity-filter'>
                    Rarity:
                    <select value={filterRarity} className='filter-select' onChange={e => setFilterRarity(e.target.value)}>
                        <option value="all">All</option>
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                        <option value="dc">DC</option>
                        <option value="marvel">Marvel</option>
                        <option value="icon_series">Icon</option>
                        <option value="shadow">Shadow</option>
                        <option value="gaming_legends">Gaming Legends</option>
                        <option value="slurp">Slurp</option>
                        <option value="frozen">Frozen</option>
                        <option value="lava">Lava</option>
                        <option value="dark">Dark</option>
                        <option value="star_wars">Star Wars</option>
                    </select>
                </label>
            </div>

            <div className='featured-items-container'>
                {featuredItems.length > 0 && filteredItems.map((item, idx) => (
                    <div key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                        <div className='featured-item'>
                            <div className='outer-img-container'>
                                <div className={`img-container ${item.rarity}-container`}>
                                    <img className={`home-item-image ${item.rarity}`} src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                </div>
                            </div>
                            <div className='home-item-information'>
                                <div className='item-name home-item-name'>{item.name}</div>
                                <div className='item-detail-price icon-and-price'>
                                    <img className='vbucks-icon' src={vbucks} alt='vbucks' />
                                    <div className='item-price home-item-price'>{item.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 &&
                <div className='no-featured-items-message-container'>
                    <h2 className='no-featured-items-message error-message'>Sorry, no items match your filters</h2>
                </div>
            }

            <div className='back-to-top-button-container'>
                <button className='back-to-top-button' onClick={scrollToTop}>Back to Top</button>
            </div>
        </>
    )
}

export default Featured;