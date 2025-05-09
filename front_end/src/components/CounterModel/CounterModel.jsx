import { useState } from "react"
import style from "./CounterModel.module.css"

export default function CounterModel({onChange, value = 1}) {
    const [quantity,setQuantity] = useState(value)

    const handleDecrease = () => {
        if (quantity > 1) {
            onChange(quantity - 1);
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className={style.counterModel}>
            <button onClick= {() => {
                handleDecrease();
            }}>-</button>
            <span>{quantity}</span>
            <button onClick={() => {
                onChange(quantity+1);
                setQuantity(quantity+1);
            }}>+</button>
        </div>
    )
}