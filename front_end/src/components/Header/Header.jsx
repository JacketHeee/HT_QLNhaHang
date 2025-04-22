
import logo from "../../assets/img/logo.png";
import style from "./Header.module.css";

export default function Header({title}) {
    return (
        <div className={style.header}>
          <img src={logo} alt="" style={{ width: 'auto', height: '40px' }}/>
          <h4>- Bàn số {title}</h4>
        </div>
    )
}