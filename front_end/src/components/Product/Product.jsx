import cart from "../../assets/icon/cart.svg"
import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import { ImageLoader } from "../../utils/ImageLoader";
import style from  "./Product.module.css"

export default function Product({onClick, product}) {
    const imageMap = ImageLoader.load();
    // console.log(product);
    return (
      <div className={style.product} onClick={() => onClick(product)}>
        <div><img src={imageMap[product.tenHinhAnh]} alt=""/></div>
        <div>
          <div className={style.productName}>{product.ID} <span>{product.tenMonAn}</span>
            <div>
                Mô tả: <span>{product.moTa}</span>
            </div>
          </div>
          <div className={style.productAction}>
            <h4>{parseFloat(product.giaBan).toLocaleString('vi-VN')} đ</h4>
            <img src={cart} alt=""/>
          </div>
        </div>
      </div>
    )
}

function formatCurrency(amount) {
    return amount.toLocaleString('it-IT');  // 'it-IT' sử dụng dấu chấm cho phân cách hàng nghìn
}