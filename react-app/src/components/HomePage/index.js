import {useDispatch} from 'react-redux'
import { getDailyItems } from '../../store/items'
import { useEffect } from 'react'

const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDailyItems())
    }, [dispatch])

    return (
        <div>
            <h1>HomePage</h1>
        </div>
    )
}

export default HomePage;