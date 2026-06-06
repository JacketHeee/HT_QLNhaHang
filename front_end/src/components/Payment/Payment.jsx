import style from  "./Payment.module.css"
import cart from "../../assets/icon/cart_red.svg"
import { formatCurrency } from "../../utils/format";
import { useNavigate } from "react-router-dom";

export default function Payment({text,onClickCart, onClick, count = 1, tongTien = '', canPay, canAdd = false}) {
    return (
      <div className={style.payment}>
          <div className={style.cart}>
            {canPay ? <img src={cart} alt="" onClick={onClickCart}/> : <img src={cart} alt=""/>}
            
            <span>{count}</span>
          </div>
          <div className={style.thanhtoan}>
            {tongTien !== '' ?
            <span>{formatCurrency(tongTien)}đ</span> :
            null
            }

            {canAdd ? <button onClick={onClick}>{text}</button> : <button>{text}</button>}
              
          </div>
      </div>
    )
}
