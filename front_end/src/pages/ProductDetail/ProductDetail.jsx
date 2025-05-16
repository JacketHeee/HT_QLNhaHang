import Overlay from "../../components/Overlay/Overlay";
import style from "./ProductDetail.module.css"; 
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import cart from "../../assets/icon/cart.svg"
import { formatCurrency } from "../../utils/format";
import { useContext, useEffect, useState } from "react";
import Payment from "../../components/Payment/Payment";
import CounterModel from "../../components/CounterModel/CounterModel";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageLoader } from "../../utils/ImageLoader";
import { DataContext } from "../../api/services/ProductContext/DataProvider";
import SuccessToast from "../../components/Notification/Notification";

export default function ProductDetail(
    // {onClose, product, listSP, onAddToCart, numberOfProduct, updateNumberOfP, listMAK}
) {
    const location = useLocation();
    const selectedProduct = location.state.product;//lấy product truyền từ menu

    const nav = useNavigate()

    const { spID } = useParams();// lấy id product truyền từ menu
    const { products, sidedishes, listSP, numberOfP, setNumberOfP, listCTHD, setListCTHD} = useContext(DataContext); // lấy dữ liệu context dùng chung

    const [addStatus, setAddStatus] = useState(false);



    const getListSPByPID = (productId) => {
        const list = listSP.filter((item) => {
            return (item.IDMonAn === +productId)
        })
        return list;
    }
    const listSPOfSelectedProduct = getListSPByPID(spID);
    
 
    const imageMap = ImageLoader.load();

    const [quantityCounter, setQuantityCounter] = useState(1);
    const [selectedSideDish, setSelectedSideDish] = useState({});

    const [numberOfPStatus, setNumberOfPStatus] = useState(true);//set chỉ thêm số lượng ở cart 1 lần cho mỗi loại sản phẩm

    const [quantityOfProduct, setQuantityOfProduct] = useState(0);



    const handleChangeCheckBox = (e) => {
        const { name, checked } = e.target;
        setSelectedSideDish(prev => ({
            ...prev,
            [name]: checked
        }));
        // console.log(selectedSideDish);
    };

    const getListSideDishString = () => {
        const listsd = sidedishes
            .map((item) => item.tenMonAnKem)
            .filter((name) => selectedSideDish[name])
        return listsd.join(", ");
    }

    const getGiaSideDish = (string) =>{
        let gia = 0;
        const arr = string.split(", ");
        const filtered = sidedishes.filter(item =>
            arr.includes(item.tenMonAnKem)
        );
        filtered.forEach((item) => {gia += +item.price})
        gia *= quantityCounter;
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

    // const getObjForCart = () => {
    //     const listSideDishString = getListSideDishString();
    //     const giaSideDish = getGiaSideDish(listSideDishString);

    //     console.log(createObj(product, quantity, listSideDishString, giaSideDish));
    //     return createObj(product, quantity, listSideDishString, giaSideDish);
    // }

    const handleChangeCounter = (value) => {
        setQuantityCounter(value);
    }

    const handleAddToCart = () => { // cần tăng số lượng ở cả 2 thanh toán, trả về thông tin CTHD, mở tbao thành công
        //Tăng số lượng sản phẩm ở giỏ
        if(numberOfPStatus){
            setNumberOfP(prev => prev + 1);
            setNumberOfPStatus(false);
        }
        //Tăng số lượng sp trong CTHD
        setQuantityOfProduct(prev => prev + quantityCounter);
        //Lấy obj cho thanh toán
        const objForCart = getObjForCart();
        
        //trường hợp đã có sẵn trong CTHD
        if(listCTHD.some((item) => (item.product.ID === +spID))){
            setListCTHD((prev) => 
                prev.map((item) => {
                    if(item.product.ID === +spID){
                        return{...item, quantity: item.quantity + quantityCounter};
                    } 
                    return item
                })
            )
        }
        //trường hợp chưa có sp trong CTHD
        else{
            setListCTHD(prev => [...prev, objForCart])
        }

        //mở tbao thành công
        setAddStatus(true);
        setTimeout(() => {
            setAddStatus(false);
        }, 1000);
    }

    const getObjForCart = () => {
        const productForCart = selectedProduct;
        const quantityForCart = quantityCounter;
        const sideDishForCart = getListSideDishString();
        const giaSideDishForCart = getGiaSideDish(getListSideDishString());
        const dataForCart = createObj(productForCart, quantityForCart, sideDishForCart, giaSideDishForCart);
        return dataForCart;
    }

    const handleProductClose = () => { //tạo object lưu cho cart xài, 
        nav(-1);
    }

    return (
        <div className={style.productDetail}>
            <button onClick={() => handleProductClose()}>x</button>
            <div className={style.thongTinProduct}>
                <div><img src={imageMap[selectedProduct.tenHinhAnh]} alt="" /></div>
                <div style={{padding: "10px"}} className={style.chitietProduct}>
                    <h3>
                        {/* {spID} */}
                        {/* {console.log(productId)} */}
                        {selectedProduct.tenMonAn}
                    </h3>
                    <div className={style.loai_gia_product}>
                        <div>
                            <span>Loại:</span> {selectedProduct.category.tenLoaiMonAn}
                        </div>
                        <h4 className={style.giaProduct}>{parseFloat(selectedProduct.giaBan).toLocaleString('vi-VN')}đ</h4>
                    </div>
                    <div className={style.soluongProduct}>
                        <span>Số lượng:</span>
                        <CounterModel onChange={(value) => handleChangeCounter(value)} value={1}/>
                    </div>

                    <div onClick={() => {
                        // nav("/conbobietbay")
                    }}>
                        <span>Mô tả:</span>
                        <p>{selectedProduct.moTa}</p>
                    </div>

                    <h4>
                        Món ăn kèm (<span>*</span>) <br />
                        <i>Vui lòng chọn một trong các thuộc tính bên dưới!</i>
                    </h4>
                    <div className={style.sideDishes}>
                        {listSPOfSelectedProduct.map((item) => (
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
                        onClickCart={() => {
                            nav(`../YourCart`)
                        }}
                        onClick={() => {
                            handleAddToCart();
                        }}
                        count={numberOfP} // truyền cho thanh toán hiển thị
                    />
                    {addStatus ? <SuccessToast></SuccessToast> : null}
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
