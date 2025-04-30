import { useState } from "react"
import style from "./CounterModel.module.css"

export default function CounterModel() {
    const [quantity,setQuantity] = useState(1)
    return (
        <div className={style.counterModel}>
            <button onClick={() => {setQuantity(quantity-1)}}>-</button>
            <span>{quantity}</span>
            <button onClick={() => {setQuantity(quantity+1)}}>+</button>
        </div>
    )
}