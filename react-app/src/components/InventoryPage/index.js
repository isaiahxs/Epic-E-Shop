import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const InventoryPage = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);

    return (
        <>
            <div>Your Inventory</div>
            <div>Total items: ({inventory.length})</div>
            <div>Your Reminders: ({reminders.length})</div>
        </>
    )
}

export default InventoryPage;