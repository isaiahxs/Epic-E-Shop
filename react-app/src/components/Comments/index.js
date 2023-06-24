import {useSelector, useDispatch} from 'react-redux'
import { getComments } from '../../store/comments'
import './Comments.css'


const Comments = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector(state => state.items.currentItem);
    const allComments = useSelector(state => state.comments)
    console.log(allComments)

    //filtering comments to only include those whose itemId matches the itemId of the currentItem
    const currentItemComments = allComments.filter(comment => comment.itemId === currentItem.itemId);

    return (
        <div className='item-detail-comments'>
            <h1>These will be the comments.</h1>
            {currentItemComments.map(comment => (
                <div key={comment.id}>
                    <h3>{comment.text}</h3>
                </div>
            ))}
        </div>
    )
}

export default Comments;