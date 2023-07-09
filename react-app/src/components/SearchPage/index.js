import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { searchItems } from '../../store/items'
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
            
            {searchError &&
                <h2>{searchError}</h2>
            }

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