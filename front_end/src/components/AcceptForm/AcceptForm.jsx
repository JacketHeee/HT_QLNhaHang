import styles from './AcceptForm.module.css'
import warning from '../../assets/icon/warning-svgrepo-com.svg'

const acceptForm = ({onAccept, onClose, message="Bạn thật sự muốn xóa ?"}) => (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <button className={styles.close} onClick={() => onClose()}>x</button>
            <div className={styles.content}>
                <div className={styles.title}>
                    <img src={warning} />
                    <p>{message}</p>
                </div>
                <button onClick={() => {onAccept(); onClose()}}>ok</button>
            </div>
        </div>
    </div>
)

export default acceptForm
