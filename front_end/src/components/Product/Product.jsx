import cart from "../../assets/icon/cart.svg"
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import style from  "./Product.module.css"

export default function Product() {
    let value = 100000; 
    return (
      <div className={style.product}>
        <img src={burger} alt=""/>
        <div>
          <div className={style.productName}>1. <span>Hamburger</span>
            <div>
                Protein: <span>What is lorem ipsum?</span>
            </div>
          </div>
          <div className={style.productAction}>
            <h4>{formatCurrency(value)} đ</h4>
            <img src={cart} alt=""/>
          </div>
        </div>
      </div>
    )
}

function formatCurrency(amount) {
    return amount.toLocaleString('it-IT');  // 'it-IT' sử dụng dấu chấm cho phân cách hàng nghìn
}