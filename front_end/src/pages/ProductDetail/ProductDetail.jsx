import Overlay from "../../components/Overlay/Overlay";
import style from "./ProductDetail.module.css"; 
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import cart from "../../assets/icon/cart.svg"
import { formatCurrency } from "../../utils/format";
import { useState } from "react";
import Payment from "../../components/Payment/Payment";
import CounterModel from "../../components/CounterModel/CounterModel";
import { useNavigate, useParams } from "react-router-dom";
import { ImageLoader } from "../../utils/ImageLoader";

export default function ProductDetail({onClose, product, listSP}) {
    // đổi qua function cha con nha !!!
    // const nav = useNavigate()

    // const handleProductClose = () => {
    //     nav(-1)
    // }
    
    // const {productId} = useParams(); //phân rã lấy productID 
    //Để tạm mốt sửa
    const imageMap = ImageLoader.load();
    console.log(product);
    console.log(listSP);

    return (
        <div className={style.productDetail}>
            <button onClick={onClose}>x</button>
            <div className={style.thongTinProduct}>
                <div><img src={imageMap[product.tenHinhAnh]} alt="" /></div>
                <div style={{padding: "10px"}} className={style.chitietProduct}>
                    <h3>
                        {/* {productId}
                        {console.log(productId)} */}
                    </h3>
                    <div className={style.loai_gia_product}>
                        <div>
                            <span>Loại:</span> {product.category.tenLoaiMonAn}
                        </div>
                        <h4 className={style.giaProduct}>{formatCurrency(product.giaBan)}đ</h4>
                    </div>
                    <div className={style.soluongProduct}>
                        <span>Số lượng:</span>
                        <CounterModel/>
                    </div>

                    <div onClick={() => {
                        // nav("/conbobietbay")
                    }}>
                        <span>Mô tả:</span>
                        <p>{product.moTa}</p>
                    </div>

                    <h4>
                        Món ăn kèm (<span>*</span>) <br />
                        <i>Vui lòng chọn một trong các thuộc tính bên dưới!</i>
                    </h4>
                    <div className={style.sideDishes}>
                        {listSP.map((item) => (
                            <Properties name={item.sideDish.tenMonAnKem} />
                        ))}
                        
                        {/* // <Properties name="Vegetebale"/>
                        // <Properties name="Vegetebale"/>
                        // <Properties name="Vegetebale"/> */}
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
