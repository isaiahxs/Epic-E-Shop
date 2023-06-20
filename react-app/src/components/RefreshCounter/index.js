import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useState, useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const RefreshCounter = () => {
    const [countdown, setCountdown] = useState(getSecondsTill8PMEST());

    function getSecondsTill8PMEST() {
        const now = new Date();
        const target = new Date();

        //setting target to 8pm est. 20 being the equivalent of 8 in the 24-hour format
        target.setHours(20);
        target.setMinutes(0);
        target.setSeconds(0);
        target.setMilliseconds(0);

        //converting to est
        const utcOffset = target.getTimezoneOffset() //in minutes
        // const estOffset = 5 * 60; //est being UTC-5
        target.setMinutes(target.getMinutes() + utcOffset - 240);

        //if the target time has already passed, set it to tomorrow
        if (now > target) {
            target.setDate(target.getDate() + 1);
        }

        //returning the difference in seconds
        const diff = Math.round((target - now) / 1000);

        return diff;
    }

    // helper function to format time
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(interval);
                    return getSecondsTill8PMEST();
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <h2 className='refresh-counter'>Item Shop Reset - {formatTime(countdown)}</h2>
    )
}

export default RefreshCounter;