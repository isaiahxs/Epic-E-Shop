import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { searchItems } from '../../store/items'
import './SearchPage.css'

const SearchPage = () => {
    // const dispatch = useDispatch();
    // const seedItems = useSelector(state => state.items.seedItems);
    // const dailyItems = useSelector(state => state.items.dailyItems);
    // const featuredItems = useSelector(state => state.items.featuredItems);
    // const sessionUser = useSelector(state => state.session.user);

    // //combine both lists
    // const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = useSelector(state => state.items.searchResults);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchItems(searchTerm));
    }

    return (
        <div>
            <h1>Search for any item in Fortnite history!</h1>
            <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter your search term"
                    />
                    <button type="submit">Search</button>
            </form>
            {/* {!searchResults &&
                <h2>We were unable to find your item.</h2>
            } */}
            {searchResults && searchResults.map(item => (
                <div key={item.itemId}>
                    <h2>{item.name}</h2>
                    <img src={item.images.icon} alt={item.name} />
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SearchPage;