import { useEffect, useState } from "react";

const Timer = ({time=0, onChangeTime=null, orderId=null}) => {
    const [minute, setMinute] = useState(time);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMinute(prev => prev + 1);
        }, 60000)

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if (onChangeTime && orderId) {
            onChangeTime(orderId, minute);
        }
    }, [minute])

    return (
        <div>{minute}p</div>
    )
}

export default Timer;