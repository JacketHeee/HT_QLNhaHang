import { useState } from "react";
import { formatCurrency } from "../../utils/format";
import { ImageLoader } from "../../utils/ImageLoader";
import Popup from "../PopUp/PopUp";

import styles from "./ProductDetailAdmin.module.css"

// Chuyển thành object map { "1.jpg": path, ... }
const imageMap = ImageLoader.load();

export default function ProductDetailAdmin() {
    const [stateProduct, setStateProduct] = useState("lock")
    return (
        <Popup>
            <div className={styles.container}>
                <img src={imageMap["xchickbg.png"]} alt="" />
                <div className={styles.infor}>
                    <h4>Burger chicken dark</h4>
                    <h6>Loại: <span>Hamburger</span></h6>
                    <h6 className={styles.price}>Đơn giá: <span>{formatCurrency(1000000)}đ</span></h6>
                    <h6>Mô tả: <p>Hamburger một chiếc bán không đường không đá</p></h6>
                    <h5>Các món ăn kèm:</h5>
                    <p className={styles.sideDishes}>Phô mai lát cheese, vegetable, đậu phụ</p>

                    <button>{stateProduct === "lock" ? "Mở khóa" : "Khóa sản phẩm"}</button>
                </div>
            </div>
        </Popup>
    )
}