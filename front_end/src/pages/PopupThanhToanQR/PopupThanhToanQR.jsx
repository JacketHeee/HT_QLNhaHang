import { formatCurrency } from "../../utils/format";
import ButtonClose from "../../components/ButtonClose/ButtonClose";
import table from "../../assets/icon/table.svg";
import checkbox from "../../assets/icon/checkbox.svg";
import clock from "../../assets/icon/clock.svg";

import qr from "../../assets/img/QR_Web.png"

import style from "./PopupThanhToanQR.module.css"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { useLoading } from "../../contexts/LoadingContext";
import { format } from "date-fns";
import { DataContext } from "../../api/services/ProductContext/DataProvider";
import { createOrder } from "../../api/services/orderService";


export default function PopupThanhToanQR() {


    const nav = useNavigate()
    const { simulateLoading } = useLoading();

    const { idTable, setNumberOfP, listCTHD, setListCTHD, setTongGia, tongGia } = useContext(DataContext); // lấy dữ liệu context dùng chung

    console.log(tongGia);

    useEffect(() => {
        const timer = setTimeout(() => {
                //Xóa hết dữ liệu đơn hàng
                setListCTHD([]);
                setNumberOfP(0);
                setTongGia(0);

                createOrder(getOrderObj(),listCTHD); //thêm order xuống cơ sở dữ liệu

                nav(`/ban/${idTable}/OrderSuccess`); 
        }, 3000); // 4 giây
    
        return () => clearTimeout(timer);
      }, [nav]);

    const formatDatetoDateString = (isoDate) => {
        const formatted = format(new Date(isoDate), 'HH:mm:ss dd/MM/yyyy');
        return formatted
    }

    const getOrderObj = () => (
        {
            tableId: +idTable,
            totalPrice: tongGia
        }
    )


    return (
        <div className={style.overLay}
        style={{ zIndex: 100 }}>
            <div className={style.mainContentContainer}>
                <ButtonClose onClick={() => {nav(-1)}} />
                <div>
                    <h4>Thông tin thanh toán</h4>
                    <div className={style.thongtinchung}>
                        <div>
                            <img src={table} alt="" />
                            <span> Bàn: B{idTable}</span>
                        </div>

                        <div>
                            <img src={checkbox} alt="" />
                            <span> Mã đơn hàng: DH0242342</span>
                        </div>

                        <div>
                            <img src={clock} alt="" />
                            <span> Thời gian tạo: {formatDatetoDateString(new Date())}</span>
                        </div>
                    </div>

                    <div className={style.thongtinThanhtoan}>
                        <h4>Số tiền cần thanh toán:</h4>
                        <h3>{formatCurrency(tongGia)}đ</h3>
                    </div>

                    <div className={style.qrThanhtoan}><img src={qr} alt="" /></div> 

                    <p className={style.nhacnho}>Vui lòng sử dụng ứng dụng Momo hoặc VNPay để quét mã QR và hoàn tất thanh toán </p>

                </div>               
            </div>
        </div>
    );
}
