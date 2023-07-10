import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { searchItems } from '../../store/items'
import { getItemBackgroundColor } from '../../utils'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './SearchPage.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = useSelector(state => state.items.searchResults);
    const searchError = useSelector(state => state.items.searchError);


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchItems(searchTerm));
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); //this will get the month name
        const year = date.getFullYear();
        
        //function to convert day into ordinal number (1st, 2nd, 3rd, etc.)
        function getOrdinal(n) {
            const s = ["th","st","nd","rd"],
            v = n % 100;
            return n + (s[(v-20)%10] || s[v] || s[0]);
        }
    
        return `${month} ${getOrdinal(day)}, ${year}`;
    }

    function daysAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const timeDiff = now - date;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff;
    }

    return (
        <div>
            <h1 className='featured-header'>Search for any item in Fortnite history!</h1>
            <form className='featured-header' onSubmit={handleSearch}>
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter your search term"
                        className='search-input'
                    />
                    <button className='submit-comment' type="submit">Search</button>
            </form>
            
            {searchError &&
                <h2 className='featured-header'>{searchError}</h2>
            }

            <div className='item-detail-body'>
            {searchResults && searchResults.map(item => (
                <div className='item-detail-heading' key={item.itemId}>
                    <div>
                        <img className='item-detail-image search-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                    </div>
                    <div className='item-detail-stats'>
                        <div className='item-details search-details'>
                            <h1 className='item-detail-name'>{item.name}</h1>
                            <div className='item-rarity-section small-rarity-section'>
                                <h3 className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</h3>
                                <h3 className='item-type'>{item.type}</h3>
                            </div>
                            {item.price && !item.priceIconLink &&
                                <div className='item-detail-price small-detail-price'>
                                    {item.price}
                                </div>
                            }
                            
                            {item.price && item.priceIconLink &&
                                <div className='item-detail-price small-detail-price'>
                                    <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                                    {item.price}
                                </div>
                            }
                            <div className='small-item-details'>
                                <div>{item.description}</div>
                                {item.history.dates &&
                                    <>
                                        <div>Release Date: {formatDate(item.history.firstSeen)}</div>
                                        <div>Last Seen: {formatDate(item.history.lastSeen)}</div>
                                        <div>Occurrences: {item.history.occurrences}</div>
                                    </>
                                }
                            </div>
                        </div>

                        <div className='item-history'>
                            {item.history === false || !item.history.dates ? 
                                (
                                    <h3 className='occurrences'>
                                        Unfortunately, this item was a battle-pass exclusive, so you are not able to add it to your cart!
                                    </h3>
                                ) : (
                                    <>
                                        <h3 className='occurrences'>Shop Occurrences</h3>
                                        <div className='time-days'>
                                            <div className='date-days'>
                                                <div>Date</div>
                                                <div>Days Ago</div>
                                            </div>
                                            {item.history.dates.sort((a, b) => new Date(b) - new Date(a)).map(date => (
                                                <div key={date} className="date-item">
                                                    <div className='date'>{formatDate(date)}</div>
                                                    <div className='days'>{daysAgo(date)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SearchPage;