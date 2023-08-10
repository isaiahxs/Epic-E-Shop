import { useState, useEffect } from 'react'
import './RefreshCounter.css'

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

        // converting to EST/EDT
        const estDate = new Date(target.toLocaleString("en-US", { timeZone: "America/New_York" }));
        const estOffsetMinutes = (target - estDate) / 60000; // offset in minutes
        target.setMinutes(target.getMinutes() + estOffsetMinutes);

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
        <div className='refresh-counter'>
            <h2 className='time-left-text'>New Items In: </h2>
            <h2 className='time-left'>{formatTime(countdown)}</h2>
        </div>
    )
}

export default RefreshCounter;