import { lockProduct, unLockProduct } from "../../api/services/productService"
import styles from "./ProductManagement.module.css" 
import locked from "../../assets/icon/okhoa.svg";
// import eye from "../../assets/icon/conmat.svg";
import conmat from "../../assets/icon/conmat.svg"; 
import { useState } from "react";
import ProductDetailAdmin from "../../components/ProductDetailAdmin/ProductDetailAdmin";
import Loading from "../../components/Loading/Loading";

// Lấy tất cả ảnh .jpg trong thư mục products và các thư mục con
const requireImages = require.context('../../assets/img/products', true, /\.png$/);

// Chuyển thành object map { "1.jpg": path, ... }
const imageMap = requireImages.keys().reduce((acc, path) => {
  const fileName = path.split('/').pop(); // lấy tên file như "1.jpg"
  acc[fileName] = requireImages(path); // Lấy đường dẫn ảnh
  return acc;
}, {});



// import { Outlet, useNavigate } from "react-router-dom";

// const nav = useNavigate()

function Product(props){
    const [lock, setLock] = useState(props.product.isLocked);
    const [detail, setDetail] = useState(false);
    const [load, setLoad] = useState(false);
    const [listSideDish, setListSideDish] = useState([]);

    const changeStatus = async () => {
        setLoad(true);
        try {
            if(lock){
                await unLockProduct(props.product.ID)   //gửi xuống db
            }
            else{
                await lockProduct(props.product.ID)
            }
            setLock(!lock)
            props.product.isLocked = !lock
        } catch (error) {
            throw new Error("Lỗi khóa")    
        } finally{
            setLoad(false);
        }

    }

    return(
        <div>
            <div className={styles.product}>
                <div className={`${styles.productInfor} ${lock ? styles.productLocked : ''}`}>
                    <img src={imageMap[props.product.tenHinhAnh]} alt="" />
                    <div>
                        <h4>{props.product.tenMonAn}</h4>
                        <h6>Loại: <span>{props.product.category.tenLoaiMonAn}</span></h6>
                        <h6 className={styles.des}>Mô tả: <span>{props.product.moTa}</span></h6>
                        <h6>Đơn giá: <span>
                            {parseFloat(props.product.giaBan).toLocaleString('vi-VN')}đ
                        </span></h6>
                    </div>
                </div>
                <div className={styles.productActions}>
                    <img src={conmat} alt="" onClick= {() => {
                            setListSideDish(props.getListSideDish(props.product.ID));
                            setDetail(true);
                        }}/>
                    {lock ? <img src={locked}/> : null}
                </div>
            </div>   
            {/* Mở detail */}
            {detail ? <ProductDetailAdmin 
                        onClose={() => setDetail(false)} 
                        product={props.product}
                        listSD={listSideDish}
                        changeStatus={()=>changeStatus()}
                    >
                    </ProductDetailAdmin> : null}
            {/* Load khóa */}
            {load ? <Loading></Loading> : null}
        </div>
    )
}

export default Product