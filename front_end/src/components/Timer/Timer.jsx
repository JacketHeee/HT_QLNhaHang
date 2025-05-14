import { useEffect, useState } from "react";

const Timer = ({time=0}) => {
    const [minute, setMinute] = useState(time);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMinute(prev => prev + 1);
        }, 60000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div>{minute}p</div>
    )
}

export default Timer;