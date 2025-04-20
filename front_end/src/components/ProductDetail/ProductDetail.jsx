import Overlay from "../Overlay/Overlay";
import style from "./ProductDetail.module.css"; 
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import cart from "../../assets/icon/cart.svg"
import { formatCurrency } from "../../utils/format";
import { useState } from "react";
import Payment from "../Payment/Payment";

export default function ProductDetail({product,onClose}) {
    const [quantity,setQuantity] = useState(1)

    if (!product) return null; //điều kiện để ẩn hiện popup

    return (
        <div className={style.productDetail}>
            <button onClick={onClose}>x</button>
            <div className={style.thongTinProduct}>
                <div><img src={burger} alt="" /></div>
                <div style={{padding: "10px"}} className={style.chitietProduct}>
                    <h3>
                        Hamburger Cheesedlx BB 
                    </h3>
                    <div className={style.loai_gia_product}>
                        <div>
                            <span>Loại:</span> Burger
                        </div>
                        <h4 className={style.giaProduct}>{formatCurrency(1000000)}đ</h4>
                    </div>
                    <div className={style.soluongProduct}>
                        <span>Số lượng:</span>
                        <div>
                            <button onClick={() => {setQuantity(quantity+1)}}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => {setQuantity(quantity+1)}}>+</button>
                        </div>
                    </div>

                    <div>
                        <span>Mô tả:</span>
                        <p>Sản phẩm bao gồm: 1g bò, 300g hơi nước, hết!</p>
                    </div>

                    <h4>
                        Món ăn kèm (<span>*</span>) <br />
                        <i>Vui lòng chọn một trong các thuộc tính bên dưới!</i>
                    </h4>
                    <div className={style.sideDishes}>
                        <Properties name="Vegetebale"/>
                        <Properties name="Vegetebale"/>
                        <Properties name="Vegetebale"/>
                        <Properties name="Vegetebale"/> 
                    </div>

                    <Payment text="Thêm vào giỏ hàng"/>
                </div>
            </div>
        </div>
    )
}

function Properties({name}) {
    return (
        <div>
            <input type="checkBox" className={style.custom_checkbox}/>
            <p>{name}</p>
        </div>
    )
}
