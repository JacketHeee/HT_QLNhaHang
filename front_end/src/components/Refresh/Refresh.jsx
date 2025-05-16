import styles from "./Refresh.module.css" 
import refresh from "../../assets/icon/refresh.svg"

export default function Refresh({whenClick}) {
    return (
        <div  className={styles.refresh}>
            <img src={refresh} alt="" onClick={whenClick} />
            <span onClick={whenClick}>Làm mới</span>
        </div>
    )
}