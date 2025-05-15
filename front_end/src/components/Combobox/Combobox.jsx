import styles from "./Combobox.module.css"

const Combobox = (props) => (// register, list
    <div className={styles.comboItem}>
        <h6>{props.children}</h6>
        <select
            {...props.register}
        >
            {props.list.map((item) => (<option value={item}>{item}</option>))}
        </select>            
    </div>
)

export default Combobox