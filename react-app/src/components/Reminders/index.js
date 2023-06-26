import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReminders, getReminders } from '../../store/reminders';
import './Reminders.css'

const Reminders = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    console.log("THESE ARE OUR STATE REMINDERS", reminders);
    const currentItem = useSelector(state => state.items.currentItem);

    useEffect(() => {
        dispatch(getReminders())
    }, [dispatch])

    const userReminderForItem = reminders.find(reminder => 
        reminder.userId === sessionUser?.id && reminder.itemId === currentItem?.itemId
    );

    return (
        <div>
            <h2>This will be our reminders section</h2>
            <div className='user-reminders'>
                <div className='reminder-message'>
                    <div>
                        {userReminderForItem && 
                            <div>
                                You've already set a reminder for this item that will expire in {userReminderForItem.duration} days! We'll let you know as soon as it returns to the shop.
                            </div>
                        }
                        {!userReminderForItem &&
                            <div>
                                Looks like you haven't created a reminder for this item yet. Click the button below to create one!
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reminders;