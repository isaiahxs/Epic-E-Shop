import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReminders, createNewReminder, deleteExistingReminder, updateExistingReminder } from '../../store/reminders';
import './Reminders.css'

const Reminders = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    const currentItem = useSelector(state => state.items.currentItem);

    const [duration, setDuration] = useState(30);
    const [editDuration, setEditDuration] = useState(30);

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

    const seedItemIds = ["5da5d9bf377bc5b20a96e5e1", "61bb53b3bd358a192111d97c", "6467a03b03356945427f6068", "5daedbcebffa742e002c321c", "5df2d48bb84283d7abdeb062", "5fd2b936c0132843480146e8", "60b033cd0b408201818d663d"];

    return (
        <>
            {currentItem ? (
                <div className='item-detail-reminders'>
                    <h2 className='idp-subheading'>Reminders</h2>
                    <div className='user-reminders'>
                        <div className='reminder-message'>
                            <div>

                                <div className='already-reminder-set'>
                                    {indefiniteMessage &&
                                        <>
                                            <h3>
                                                You've set a reminder for this item that will not expire. We'll let you know as soon as it returns to the shop!
                                            </h3>

                                            <div className='update-reminder-section'>
                                                <div className='update-message bolder'>
                                                    Want to change how long your reminder is active for?
                                                </div>
                                                <form className='reminder-form' onSubmit={handleUpdateReminder}>
                                                    <label className='update-reminder-label bolder'>New duration:
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
                                                <div className='delete-message bolder'>
                                                    No longer want this reminder?
                                                    <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                                        Delete Reminder
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {userReminderForItem && !indefiniteMessage && userReminderForItem.reminded === false &&
                                        <>
                                            <h3>
                                                You've already set a reminder for this item that will expire in {userReminderForItem.duration} days. We'll let you know as soon as it returns to the shop!
                                            </h3>

                                            <div className='update-reminder-section'>
                                                <div className='update-message bolder'>
                                                    Want to change how long your reminder is active for?
                                                </div>
                                                <form className='reminder-form' onSubmit={handleUpdateReminder}>
                                                    <label className='update-reminder-label bolder'>New duration:
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
                                                <div className='delete-message bolder'>
                                                    No longer want this reminder?
                                                </div>
                                                <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                                    Delete Reminder
                                                </button>
                                            </div>
                                        </>
                                    }

                                    {userReminderForItem && userReminderForItem.reminded === true &&
                                        <>
                                            <h3>
                                                You previously set a reminder for this item, now's your chance to add it to your collection!
                                            </h3>

                                            <div className='delete-reminder-section'>
                                                <div className='delete-message bolder'>
                                                    No longer want this reminder?
                                                </div>
                                                <button className='delete-reminder-button' onClick={handleDeleteReminder}>
                                                    Delete Reminder
                                                </button>
                                            </div>
                                        </>
                                    }

                                </div>
                                {seedItemIds.includes(currentItem.itemId) &&
                                    <h3>No need to worry about missing out on our fan favorites! They'll always be around!</h3>
                                }

                                {!userReminderForItem && sessionUser && currentItem.history.dates && !seedItemIds.includes(currentItem.itemId) &&
                                    <>
                                        <h3>
                                            Looks like you don't have a reminder for this item yet. Complete the form below to create one!
                                        </h3>
                                        <form className='reminder-form' onSubmit={handleCreateReminder}>
                                            <label className='bolder'>Reminder duration:
                                                <select className='select-field' value={duration} onChange={(e) => setDuration(e.target.value)}>
                                                    <option value={30}>30</option>
                                                    <option value={60}>60</option>
                                                    <option value={-1}>Until item returns</option>
                                                </select>
                                            </label>
                                            <button className='create-reminder green-button' type='submit'>
                                                Create Reminder
                                            </button>
                                        </form>
                                    </>
                                }

                                {!currentItem.history.dates &&
                                    <>
                                        <h3>Unfortunately, this item was a battle-pass exclusive from a previous season so it will not be coming to the shop.</h3>
                                    </>
                                }

                                {!sessionUser && currentItem.history.dates && !seedItemIds.includes(currentItem.itemId) &&
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
            ) : (
                <div className='loading-message-container'>
                    <h2 className='loading-message'>Loading...</h2>
                </div>
            )}
        </>
    )
}

export default Reminders;