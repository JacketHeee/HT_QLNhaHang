import { use, useState } from "react"
import style from "./YourCart.module.css" 
import { formatCurrency } from "../../utils/format"
import cart from "../../assets/icon/cart_red.svg"
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import ButtonClose from "../ButtonClose/ButtonClose";
import CounterModel from "../CounterModel/CounterModel";
import classNames from "classnames";
import PopupThanhToanQR from "../PopupThanhToanQR/PopupThanhToanQR";

export default function YourCart({onClose,clickedPayment}) {
    const [count, setCount] = useState(6)

    if (!clickedPayment) return null;

    return (
        <div className={style.yourCart}>
            <ButtonClose onClick={onClose}/>
            <div className={style.header}>
                <img src={cart} alt="" />
                <h4>Giỏ hàng của bạn ({count})</h4>
                <span>Bữa tối</span>
            </div>

            <div className={style.itemShow}>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
            </div>

            <Payment onClose={onClose}/>
        </div>
    )
}

function ProductItem() {
    const [quantity, setQuantity] = useState(1); 

    return (
        <div className={style.productItem}>
            <img src={burger} alt="" />
            <div>
                <div className={style.productNameAndSideDishes}>
                    <h5>Grill Squid Satay</h5>
                    <div>
                        <SideDishes title="Đồ ăn kèm" des="Rau thơm"/>
                    </div>
                </div>
                <div className={style.quantityAndPrice}>   
                    <CounterModel/>
                    <div>
                        <h5>{formatCurrency(1000000)}đ</h5>
                        <span>(Tip 5%, VAT 10%)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function SideDishes({title,des}) {
    return (
        <div className={style.sideDihes}>
            <span>{title}: {des}</span>
            <h6>{formatCurrency(1000)}đ</h6>
        </div>
    )
}

function Payment({onClose}) {
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const [isShowPopupThanhToan,setIsShowPopupThanhToan] = useState(false)

    const handleClosePopup = () => {
        setIsShowPopupThanhToan(false)
    }

    const handleClickPopup = () => {
        console.log(isShowPopupThanhToan)
        setIsShowPopupThanhToan(true)
    }

    return (
        <div className={style.yourCartPayment}>
            <div>
                <h4>Tổng tiền:</h4>
                <div>
                    <h3>{formatCurrency(1000000)}đ</h3>
                    <span>(Tip 5%, VAT 10%)</span>
                </div>
            </div>
            {/* <div className={style.choosedPayment}>
                <div className={classNames(style.choosedItem)}>
                    <span>✓</span>
                    <button>Thanh toán tại quầy</button>
                </div>
                <div className={classNames(style.choosedItem,style.active)}>
                    <span>✓</span>
                    <button>TT qua QR CODE</button>
                </div>
            </div> */}
            <div className={style.choosedPayment}>
                <PaymentOption
                    label="Thanh toán tại quầy"
                    value="counter"
                    isActive={paymentMethod === 'counter'}
                    onChoose={() => setPaymentMethod('counter')}
                />
                <PaymentOption
                    label="TT qua QR CODE"
                    value="qr"
                    isActive={paymentMethod === 'qr'}
                    onChoose={() => setPaymentMethod('qr')}
                />
            </div>
            <button onClick={() => {setIsShowPopupThanhToan(true)}}>THANH TOÁN</button>
            <PopupThanhToanQR isShow={isShowPopupThanhToan} onClose={handleClosePopup}/>
        </div>
    )
}

// Component con
function PaymentOption({ label, isActive, onChoose }) {
    return (
      <div
        className={classNames(style.choosedItem, {
          [style.active]: isActive,
        })}
        onClick={onChoose}
      >
        <span>✓</span>
        <button>{label}</button>
      </div>
    );
  }