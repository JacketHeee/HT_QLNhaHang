import { formatCurrency } from "../../utils/format";
import ButtonClose from "../../components/ButtonClose/ButtonClose";
import table from "../../assets/icon/table.svg";
import checkbox from "../../assets/icon/checkbox.svg";
import clock from "../../assets/icon/clock.svg";

import qr from "../../assets/img/QR_Web.png"

import style from "./PopupThanhToanQR.module.css"
import { useNavigate } from "react-router-dom";


export default function PopupThanhToanQR() {


    const nav = useNavigate()

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
                            <span> Bàn: B05</span>
                        </div>

                        <div>
                            <img src={checkbox} alt="" />
                            <span> Mã đơn hàng: DH0242342</span>
                        </div>

                        <div>
                            <img src={clock} alt="" />
                            <span> Thời gian tạo: 21/04/2024 - 19:13</span>
                        </div>
                    </div>

                    <div className={style.thongtinThanhtoan}>
                        <h4>Số tiền cần thanh toán:</h4>
                        <h3>{formatCurrency(141000)}đ</h3>
                    </div>

                    <div className={style.qrThanhtoan}><img src={qr} alt="" /></div> 

                    <p className={style.nhacnho}>Vui lòng sử dụng ứng dụng Momo hoặc VNPay để quét mã QR và hoàn tất thanh toán </p>

                </div>               
            </div>
        </div>
    );
}
