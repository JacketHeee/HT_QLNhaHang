import style from  "./Payment.module.css"
import cart from "../../assets/icon/cart_red.svg"
import { formatCurrency } from "../../utils/format";
import { useNavigate } from "react-router-dom";

export default function Payment({text,onClickCart, onClick, count = 1, tongTien = ''}) {
    return (
      <div className={style.payment}>
          <div className={style.cart}>
            <img src={cart} alt="" onClick={onClickCart}/>
            <span>{count}</span>
          </div>
          <div className={style.thanhtoan}>
            {tongTien !== '' ?
            <span>{formatCurrency(tongTien)}đ</span> :
            null
            }
              <button onClick={onClick}>{text}</button>
          </div>
      </div>
    )
}
