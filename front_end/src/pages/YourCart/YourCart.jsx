import { use, useState } from "react"
import style from "./YourCart.module.css" 
import { formatCurrency } from "../../utils/format"
import cart from "../../assets/icon/cart_red.svg"
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import ButtonClose from "../../components/ButtonClose/ButtonClose";
import CounterModel from "../../components/CounterModel/CounterModel";
import classNames from "classnames";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { ImageLoader } from "../../utils/ImageLoader";

export default function YourCart() {

    const nav = useNavigate();
    const location = useLocation();
    const data = location.state || {};
    // console.log(data)


    const [count, setCount] = useState(data.numberOfProduct);



    return (
        <div className={style.yourCart}>
            <ButtonClose onClick={() => {nav(-1)}}/>
            <div className={style.header}>
                <img src={cart} alt="" />
                <h4>Giỏ hàng của bạn ({count})</h4>
                <span>Bữa tối</span>
            </div>

            <div className={style.itemShow}>
                {data.listCTHD.map((item) => <ProductItem cTHD={item}/>)}
               {console.log(data.listCTHD)}


                {/* {console.log(data.listCTHD[0].product.tenMonAn)} */}
                {/* <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/> */}
            </div>
            <Payment data={data}/>
            <Outlet/>
        </div>
    )
}

function ProductItem({cTHD}) {
    const imageMap = ImageLoader.load();

    const tinhGiaBan = (giaBan, soLuong) => {
        return +giaBan * +soLuong
    }
    return (
        <div className={style.productItem}>
            <img src={imageMap[cTHD.product.tenHinhAnh]} alt="" />
            <div>
                <div className={style.productNameAndSideDishes}>
                    <h5>{cTHD.product.tenMonAn}</h5>
                    <div>
                        <SideDishes title="Đồ ăn kèm" des={cTHD.sideDishes} gia={cTHD.giaSideDish}/>
                    </div>
                </div>
                <div className={style.quantityAndPrice}>   
                    {console.log(cTHD.quantity)}
                    <CounterModel value={cTHD.quantity}/>
                    <div>
                        <h5>{formatCurrency(tinhGiaBan(cTHD.product.giaBan, cTHD.quantity))}đ</h5>
                        <span>(Tip 5%, VAT 10%)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function SideDishes({title,des, gia}) {
    return (
        <div className={style.sideDihes}>
            <span>{title}: {des}</span>
            <h6>{formatCurrency(gia)}đ</h6>
        </div>
    )
}

function Payment({data}) {
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const tinhTongGia = () => {
        let tongGia = 0;
        data.listCTHD.forEach((item) => {
            tongGia += +item.product.giaBan * +item.quantity + +item.giaSideDish
        })
        return tongGia;
    }

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
                    <h3>{formatCurrency(tinhTongGia())}đ</h3>
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