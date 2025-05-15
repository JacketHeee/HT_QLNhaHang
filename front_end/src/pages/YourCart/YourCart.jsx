import { use, useContext, useEffect, useState } from "react"
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
import PopupThanhToanQR from "../PopupThanhToanQR/PopupThanhToanQR";
import { DataContext } from "../../api/services/ProductContext/DataProvider";
import { createOrder } from "../../api/services/orderService";

export default function YourCart() {

    const nav = useNavigate();

    const {idTable, tongGia, numberOfP, setNumberOfP, listCTHD, setListCTHD, setTongGia, note, setNote} = useContext(DataContext);
    
    return (
        <div className={style.yourCart}>
            <ButtonClose onClick={() => {nav(-1)}}/>
            <div className={style.header}>
                <img src={cart} alt="" />
                <h4>Giỏ hàng của bạn ({numberOfP})</h4>
                <span>Bữa tối</span>
            </div>

            <div className={style.itemShow}>
{/* 
                {console.log(data)} */}
                {listCTHD.map((item) => <ProductItem cTHD={item} listCTHD={listCTHD} setListCTHD={setListCTHD}/>)}

               {/* {console.log(data.listCTHD)} */}


                {/* {console.log(data.listCTHD[0].product.tenMonAn)} */}
                {/* <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/> */}
            </div>
            <Payment idTable={idTable} tongGia={tongGia} listCTHD={listCTHD} setListCTHD={setListCTHD} setNumberOfP={setNumberOfP} setTongGia={setTongGia} note={note} setNote={setNote}/>
            <Outlet/>
        </div>
    )
}

function ProductItem({cTHD, listCTHD, setListCTHD}) { //listCTHD để tạo mới mảng khi người dùng thay đổi quantity
    const imageMap = ImageLoader.load();

    const tinhGiaBan = (giaBan, soLuong) => {
        return +giaBan * +soLuong
    }

    const [quantityOfCTHD, setQuantityOfCTHD] = useState(cTHD.quantity);//theo dõi số lượng từng chi tiết hóa đơn

    const handleChangeQuantity = () => {
        setQuantityOfCTHD(prev => prev + 1);
    }
    useEffect(() => {//chờ quantity cập nhật xong
        updateQuantity();
    },[quantityOfCTHD])

    const updateQuantity = () =>{
        setListCTHD(prev => prev.map((item) =>{
            if(item.product.ID === cTHD.product.ID){    //lụm cTHD đang tương tác
                return{...item, quantity: quantityOfCTHD}
            }
            else{
                return item
            }
        }))
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
                    <CounterModel 
                        value={cTHD.quantity}
                        onChange={() => handleChangeQuantity()}
                    />
                    <div>
                        <h5>{formatCurrency(tinhGiaBan(cTHD.product.giaBan, quantityOfCTHD))}đ</h5>
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

function Payment({idTable, tongGia, listCTHD, setListCTHD, setNumberOfP, setTongGia, note, setNote}) {
    const [paymentMethod, setPaymentMethod] = useState('qr');

    const [thanhToanQR, setThanhToanQR] = useState(false);

    const vat = 0.1;
    const tip = 0.05

    const tinhTongGia = () => {
        let tongGia = 0;
        listCTHD.forEach((item) => {
            tongGia += +item.product.giaBan * +item.quantity + +item.giaSideDish
        })
        const giaVat = tongGia*vat;
        const giaTip = tongGia*tip;
        tongGia += giaVat + giaTip;
        setTongGia(tongGia);
        return tongGia;
    }

    const nav = useNavigate();


    const handleThanhToan = () => {
        
        if (paymentMethod === 'qr') {
            setThanhToanQR(true);
        }
        else {
            //Xóa hết dữ liệu đơn hàng
            setListCTHD([]);
            setNumberOfP(0);
            setTongGia(0);

            createOrder(getOrderObj(), listCTHD); //thêm order xuống cơ sở dữ liệu
            nav(`/ban/${idTable}/OrderSuccess`)
        }
           
    }

    const getOrderObj = () => (//cho thanh toán tiền mặt
        {
            tableId: +idTable,
            totalPrice: tongGia,
            note: note
        }
    )

    const handleChangeNote = (e) => {
        setNote(e.target.value);
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

            <textarea id="message" className={style.massage} onChange={(e) => handleChangeNote(e)} name="message" rows="3" cols="50" placeholder="Ghi chú của khách hàng">
            </textarea>
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

            {thanhToanQR ? <PopupThanhToanQR
                onClose = {() => {setThanhToanQR(false)}}
            ></PopupThanhToanQR> : null}
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
