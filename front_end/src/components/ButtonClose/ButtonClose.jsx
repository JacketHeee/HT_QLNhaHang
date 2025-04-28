
import style from "./ButtonClose.module.css"
export default function ButtonClose({onClick}) {
    return (
        <button onClick={onClick} className={style.buttonClose}>x</button>
    )
}