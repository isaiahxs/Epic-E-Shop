import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const UserProfilePage = () => {
    return (
        <div>This is the User Profile Page</div>
    )
}

export default UserProfilePage;