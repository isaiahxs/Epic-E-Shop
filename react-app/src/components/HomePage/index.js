import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems } from '../../store/items'
import { useEffect } from 'react'

const HomePage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.dailyItems)
    // console.log("THESE ARE OUR ITEMS", items)
    // console.log('THIS IS OUR ITEMS[0] NAME', items?.[0]?.name)

    useEffect(() => {
        dispatch(getDailyItems())
    }, [dispatch])

    return (
        <div>
            <h1>HomePage</h1>
            <h2>Today's Daily Items</h2>
            {/* check if the items array is not empty before trying to map over it */}
            {items.length > 0 && items.map((item, idx) => (
                //render the name of each item
                <div key={idx}>{item.name}</div>
            ))}
        </div>
    )
}

export default HomePage;