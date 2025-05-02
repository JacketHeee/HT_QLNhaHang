import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";
import { ImageLoader } from "../../utils/ImageLoader";
import Popup from "../PopUp/PopUp";

import styles from "./ProductDetailAdmin.module.css"
import { useParams } from "react-router-dom";
import { getProduct, lockProduct, unLockProduct } from "../../api/services/productService";
import CustomPopUp from "../CustomPopUp/CustomPopUp";

// Chuyển thành object map { "1.jpg": path, ... }
const imageMap = ImageLoader.load();

export default function ProductDetailAdmin(props) {

    const [lock, setLock] = useState(props.product.isLocked);

    const changeInStatus = async () => {
            setLock(!lock)
    }

    return (
        <CustomPopUp onClose={props.onClose}>
            <div className={styles.container}>
                <img src={imageMap[props.product.tenHinhAnh]} alt="" />
                <div className={styles.infor}>
                    <h4>{props.product.tenMonAn}</h4>
                    <h6>Loại: <span>{props.product.category.tenLoaiMonAn}</span></h6>
                    <h6 className={styles.price}>Đơn giá: <span>
                            {parseFloat(props.product.giaBan).toLocaleString('vi-VN')}đ
                        </span></h6>
                    <h6>Mô tả: <p>{props.product.moTa}</p></h6>
                    <h5>Các món ăn kèm:</h5>
                    <p className={styles.sideDishes}>
                        {props.listSD.map((sd, index) => (
                            <span key={sd.ID}>
                                {sd.tenMonAnKem}
                                {index === props.listSD.length - 1 ? '' : ', '}
                            </span>
                        ))} 
                    </p>
                    {/* <p className={styles.sideDishes}>listSD</p> */}

                    <button onClick={() => {
                        props.changeStatus()
                        changeInStatus()
                    }}>{lock ? "Mở khóa" : "Khóa sản phẩm"}</button>
                </div>
            </div>
        </CustomPopUp>
    )
}