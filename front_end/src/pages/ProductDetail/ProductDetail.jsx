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

export default function ProductDetail({onClose, product, listSP, onAddToCart, numberOfProduct, updateNumberOfP, listMAK}) {
    // đổi qua function cha con nha !!!
    // const nav = useNavigate()

    // const handleProductClose = () => {
    //     nav(-1)
    // }
    
    // const {productId} = useParams(); //phân rã lấy productID 
    //Để tạm mốt sửa
 
    const imageMap = ImageLoader.load();

    const [quantity, setQuantity] = useState(0);
    const [selectedSideDish, setSelectedSideDish] = useState({});

    const [numberOfP, setNumberOfP] = useState(numberOfProduct) //số lượng cập nhật cho cart bên dưới

    const handleChangeCheckBox = (e) => {
        const { name, checked } = e.target;
        setSelectedSideDish(prev => ({
            ...prev,
            [name]: checked
        }));
        // console.log(selectedSideDish);
    };

    const getListSideDishString = () => {
        const listsd = listSP
            .map((item) => item.sideDish.tenMonAnKem)
            .filter((name) => selectedSideDish[name])
        return listsd.join(", ");
    }

    const getGiaSideDish = (string) =>{
        let gia = 0;
        const arr = string.split(", ");
        const filtered = listMAK.filter(item =>
            arr.includes(item.tenMonAnKem)
        );
        filtered.forEach((item) => {gia += +item.price})
        console.log(gia)
        return(gia)
    }


    const createObj = (product, quantity, listSideDishString, giaSideDish) => { //side dish kiểu string
        return {
            product: product,
            quantity: quantity,
            sideDishes: listSideDishString,
            giaSideDish: giaSideDish
        }
    }

    const getObjForCart = () => {
        const listSideDishString = getListSideDishString();
        const giaSideDish = getGiaSideDish(listSideDishString);

        console.log(createObj(product, quantity, listSideDishString, giaSideDish));
        return createObj(product, quantity, listSideDishString, giaSideDish);
    }

    const handleChangeCounter = (value) => {
        setQuantity(value);
    }

    const handleAddToCart = () => {
        onAddToCart(getObjForCart());
        setNumberOfP(prev => prev + 1);
        updateNumberOfP(1);
    }

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
                        <CounterModel onChange={(value) => handleChangeCounter(value)}/>
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
                            <Properties 
                                name={item.sideDish.tenMonAnKem}
                                checked={selectedSideDish[item.sideDish.tenMonAnKem] || false}
                                onChange={handleChangeCheckBox}
                            />
                        ))}
                        
                        {/* // <Properties name="Vegetebale"/>
                        // <Properties name="Vegetebale"/>
                        // <Properties name="Vegetebale"/> */}
                    </div>

                    <Payment 
                        text="Thêm vào giỏ hàng"
                        onClick={() => {
                            handleAddToCart()
                            onClose();
                            // printData()
                        }}
                        count={numberOfP}
                        canPay={true}
                    />
                </div>
            </div>
        </div>
    )
}

function Properties({name, onChange}) {
    return (
        <div>
            <input 
                type="checkBox" 
                className={style.custom_checkbox}
                name={name}
                onChange={onChange}
            />
            <p>{name}</p>
        </div>
    )
}
