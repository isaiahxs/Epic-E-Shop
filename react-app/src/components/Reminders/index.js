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

    const indefiniteMessage = reminders.find(reminder => 
        reminder.userId === sessionUser?.id && reminder.itemId === currentItem?.itemId && reminder.duration === -1
    );

    return (
        <div>
            <h2>Reminders</h2>
            <div className='user-reminders'>
                <div className='reminder-message'>
                    <div>
                        {indefiniteMessage &&
                            <h3>
                                You've set a reminder for this item that will not expire. We'll let you know as soon as it returns to the shop!
                            </h3>
                        }
                        {userReminderForItem && !indefiniteMessage &&
                            <h3>
                                You've already set a reminder for this item that will expire in {userReminderForItem.duration} days. We'll let you know as soon as it returns to the shop!
                            </h3>
                        }
                        {!userReminderForItem &&
                            <>
                                <h3>
                                    Looks like you haven't created a reminder for this item yet. Click the button below to create one!
                                </h3>
                                <button className='create-reminder'>
                                    Create Reminder
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reminders;