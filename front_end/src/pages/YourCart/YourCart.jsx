import { use, useState } from "react"
import style from "./YourCart.module.css" 
import { formatCurrency } from "../../utils/format"
import cart from "../../assets/icon/cart_red.svg"
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import ButtonClose from "../../components/ButtonClose/ButtonClose";
import CounterModel from "../../components/CounterModel/CounterModel";
import classNames from "classnames";
import { Outlet, useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";

export default function YourCart() {
    const [count, setCount] = useState(6)

    const nav = useNavigate();

    return (
        <div className={style.yourCart}>
            <ButtonClose onClick={() => {nav(-1)}}/>
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
            <Payment/>
            <Outlet/>
        </div>
    )
}

function ProductItem() {
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

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const nav = useNavigate();
    const {simulateLoading} = useLoading()

    const handleThanhToan = () => {
        if (paymentMethod === "qr") 
            simulateLoading(1500,() => {nav("ThanhToanQR")})
        else 
            simulateLoading(4000,() => {nav("/ban/05/OrderSuccess")})
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
            <button onClick={handleThanhToan}>THANH TOÁN</button>
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