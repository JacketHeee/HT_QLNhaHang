import styles from "./InputField.module.css"

const InputField = (props) => (// register, error
    <div className={styles.inputItem}>
        <h6>{props.children}</h6>
        <input
            {...props.register}
            readOnly={props.readOnly}
        />
        {props.error && <p style={{ color: 'red' }}>{props.error.message}</p>}
    </div>
)



export default InputField

