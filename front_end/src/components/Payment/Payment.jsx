import style from  "./Payment.module.css"
import cart from "../../assets/icon/cart_red.svg"
import { formatCurrency } from "../../utils/format";

export default function Payment() {
    let count = 1
    let tongtien = 10000000000;
    return (
        
      <div className={style.payment}>
          <div className={style.cart}>
            <img src={cart} alt="" />
            <span>{count}</span>
          </div>
          <div className={style.thanhtoan}>
            <span>{formatCurrency(tongtien)}đ</span>
            <button>Thanh toán</button>
          </div>
      </div>
    )
}
