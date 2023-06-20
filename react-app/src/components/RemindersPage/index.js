import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const RemindersPage = () => {
    return (
        <div>This is the Reminders Page</div>
    )
}

export default RemindersPage;