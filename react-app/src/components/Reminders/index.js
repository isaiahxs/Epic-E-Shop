import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReminders, createNewReminder, deleteExistingReminder, updateExistingReminder } from '../../store/reminders';
import './Reminders.css'

const Reminders = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    // console.log("THESE ARE OUR STATE REMINDERS", reminders);
    const currentItem = useSelector(state => state.items.currentItem);

    const [duration, setDuration] = useState(30);
    const [editDuration, setEditDuration] = useState(30);

    // useEffect(() => {
    //     dispatch(getReminders())
    // }, [dispatch])

    const userReminderForItem = reminders.find(reminder => 
        reminder.userId === sessionUser?.id && reminder.itemId === currentItem?.itemId
    );

    const indefiniteMessage = reminders.find(reminder => 
        reminder.userId === sessionUser?.id && reminder.itemId === currentItem?.itemId && reminder.duration === -1
    );

    const handleCreateReminder = async (e) => {
        e.preventDefault();
        const newReminder = {
            userId: sessionUser.id,
            // itemId: currentItem.itemId,
            duration,
        }
        await dispatch(createNewReminder({ ...newReminder, itemId: currentItem.itemId }));
        dispatch(getReminders())
        // const createdReminder = await dispatch(createNewReminder(newReminder));
    }

    const handleUpdateReminder = async (e) => {
        e.preventDefault();
        const updatedReminder = {
            userId: sessionUser.id,
            // itemId: currentItem.itemId,
            duration: editDuration,
        }
        await dispatch(updateExistingReminder({ ...updatedReminder, itemId: currentItem.itemId }));
        dispatch(getReminders())
    }

    const handleDeleteReminder = async (e) => {
        e.preventDefault();
        const reminderToDelete = {
            userId: sessionUser.id,
            itemId: currentItem.itemId,
        }
        await dispatch(deleteExistingReminder(reminderToDelete));
        dispatch(getReminders())
    }

    return (
        <div className='item-detail-reminders'>
            <h2 className='idp-subheading'>Reminders</h2>
            <div className='user-reminders'>
                <div className='reminder-message'>
                    <div>
                        {/* if currentItem.itemId is equal to session.user.inventory.items.itemId or something like that */}
                        {/* <div className='already-owned'>
                            Looks like you already own this item. Nice collection so far!
                        </div> */}
                        <div className='already-reminder-set'>
                            {indefiniteMessage &&
                            <>
                                <h3>
                                    You've set a reminder for this item that will not expire. We'll let you know as soon as it returns to the shop!
                                </h3>

                                <div className='update-reminder-section'>
                                        <div className='update-message'>
                                            Want to change how long your reminder is active for?
                                        </div>
                                        <form className='reminder-form' onSubmit={handleUpdateReminder}>
                                            <label>New Reminder duration:
                                                <select className='select-field' value={editDuration} onChange={(e) => setEditDuration(e.target.value)}>
                                                    <option value={30}>30</option>
                                                    <option value={60}>60</option>
                                                    <option value={-1}>Until item returns</option>
                                                </select>
                                            </label>
                                            <button className='create-reminder update-reminder' type='submit'>
                                                Update Reminder
                                            </button>
                                        </form>
                                    </div>

                                <div className='delete-reminder-section'>
                                    <div className='delete-message'>
                                        No longer want this reminder? Click the button below to delete it!
                                    </div>
                                    <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                        Delete Reminder
                                    </button>
                                </div>
                            </>
                            }
                            {userReminderForItem && !indefiniteMessage &&
                                <>
                                    <h3>
                                        You've already set a reminder for this item that will expire in {userReminderForItem.duration} days. We'll let you know as soon as it returns to the shop!
                                    </h3>

                                    <div className='update-reminder-section'>
                                        <div className='update-message'>
                                            Want to change how long your reminder is active for?
                                        </div>
                                        <form className='reminder-form' onSubmit={handleUpdateReminder}>
                                            <label>New reminder duration:
                                                <select className='select-field' value={editDuration} onChange={(e) => setEditDuration(e.target.value)}>
                                                    <option value={30}>30</option>
                                                    <option value={60}>60</option>
                                                    <option value={-1}>Until item returns</option>
                                                </select>
                                            </label>
                                            <button className='create-reminder update-reminder' type='submit'>
                                                Update Reminder
                                            </button>
                                            
                                        </form>
                                    </div>

                                    <div className='delete-reminder-section'>
                                        <div className='delete-message'>
                                            No longer want this reminder?

                                            <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                                Delete Reminder
                                            </button>

                                        </div>
                                        {/* <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                            Delete Reminder
                                        </button> */}
                                    </div>
                                </>
                            }

                        </div>
                        {!userReminderForItem && sessionUser &&
                            <>
                                <h3>
                                    Looks like you don't have a reminder for this item yet. Complete the form below to create one!
                                </h3>
                                <form className='reminder-form' onSubmit={handleCreateReminder}>
                                    <label>Reminder duration:
                                        <select className='select-field' value={duration} onChange={(e) => setDuration(e.target.value)}>
                                            <option value={30}>30</option>
                                            <option value={60}>60</option>
                                            <option value={-1}>Until item returns</option>
                                        </select>
                                    </label>
                                    <button className='create-reminder' type='submit'>
                                        Create Reminder
                                    </button>
                                </form>
                            </>
                        }

                        {!sessionUser &&
                            <>
                                <h3 className='reminder-message-logged-out'>
                                    You must be logged in to set a reminder for this item.
                                </h3>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reminders;