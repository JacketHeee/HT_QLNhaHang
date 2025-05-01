
import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import styles from "./ProductManagement.module.css" 

import locked from "../../assets/icon/okhoa.svg";
import eye from "../../assets/icon/conmat.svg";
import conmat from "../../assets/icon/conmat.svg"; 
import { Outlet, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/services/productService";
import FilterButton from "../../components/FilterButton/filterbutton";
import { getProductsByCategoryID } from "../../api/services/categoryService";

// Lấy tất cả ảnh .jpg trong thư mục products và các thư mục con
const requireImages = require.context('../../assets/img/products', true, /\.png$/);

// Chuyển thành object map { "1.jpg": path, ... }
const imageMap = requireImages.keys().reduce((acc, path) => {
  const fileName = path.split('/').pop(); // lấy tên file như "1.jpg"
  acc[fileName] = requireImages(path); // Lấy đường dẫn ảnh
  return acc;
}, {});


// Cách sử dụng

// {products.map(product => (
//     <div key={product.id}>
//       <img src={imageMap[product.image]} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.price.toLocaleString()} đ</p>
//     </div>
//   ))}


export default function ProductManagement() {
    const [category,setCategory] = useState([
        {
            id: '0',
            name: 'Tất cả'
        },
        {
            id: '1', 
            name: 'Hamburger'
        },
        {
            id: '2', 
            name: 'Coffee'
        },
        {
            id: '3', 
            name: 'Gà rán'
        },
        {
            id: '4', 
            name: 'Nước uống'
        },
        {
            id: '5', 
            name: 'Tráng miệng'
        },
    ]);

    const [choosedStateDish, setChoosedStateDish] = useState("all")
    const [categoryChoosed, setCategoryChoosed] = useState("0"); 

    const nav = useNavigate()

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); //theo dõi trạng thái loading
    const [error, setError] = useState(null); //theo dõi trạng thái lỗi
    const [filterProducts, setFilterProducts] = useState([]); //cho tìm kiếm

    //Chỉ chạy duy nhất 1 lần khi mount
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () =>{
        try {
            const data = await getProducts();
            setProducts(data);
            setFilterProducts(data);
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    const fetchOnCategory = async (id) =>{
        try {
            const data = await getProductsByCategoryID(id);
            setProducts(data);
            setFilterProducts(data);
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    const handleSelected = (id) => {
        if(id == 0){
            fetchAllProducts();
        }
        else{
            fetchOnCategory(id);
        }
    }

    const handleSearch = (keyWord) => {
        if (!keyWord.trim()) {
            setFilterProducts(products);
            return;
        }        
        const filtered = products.filter((p) =>
            p.tenMonAn.toLowerCase().includes(keyWord.toLowerCase())
        );
        setFilterProducts(filtered);
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <Search onSearch={(keyWord)=>handleSearch(keyWord)} placeHolder={"Tìm kiếm theo tên món..."}/>
            </div>
            {/* Thanh phân loại */}
            <div className={styles.theloai}>
                <div className={styles.category}>
                    {
                        category.map(index => (
                            // <button onClick={() => {setCategoryChoosed(index.id)}} className={categoryChoosed === index.id ? styles.active : ""}>
                            //     {index.name}
                            // </button>
                            <FilterButton 
                                id={index.id} 
                                onSelect={() => {
                                    handleSelected(index.id);
                                    setCategoryChoosed(index.id)
                                }}
                                className={categoryChoosed === index.id ? styles.active : ""}
                            >
                                {index.name} 
                            </FilterButton>
                        ))
                    }
                
                </div>
            </div>
            {/* Lọc */}
            <div className={styles.select}>
                <button onClick={()=>setChoosedStateDish("all")} className={choosedStateDish === "all" ? styles.active : ""}>Tất cả</button>
                <button onClick={()=>setChoosedStateDish("ready")} className={choosedStateDish === "ready" ? styles.active : ""}>Hiện có</button>
                <button onClick={()=>setChoosedStateDish("lock")} className={choosedStateDish === "lock" ? styles.active : ""}>Đang khóa</button>
            </div>
            
            {/* Trường hợp chưa load dữ liệu hoặc lỗi */}
            {loading && <div>Đang load dữ liệu...</div>}
            {error && <div>{error}</div>}

            {/* Các sản phẩm */}
            <div className={styles.maincontent}>
            {filterProducts.map(product => (
                    <div className={styles.product}>
                        <div className={styles.productInfor}>
                            <img src={imageMap[product.tenHinhAnh]} alt="" />
                            <div>
                                <h4>{product.tenMonAn}</h4>
                                <h6>Loại: <span>{product.category.tenLoaiMonAn}</span></h6>
                                <h6 className={styles.des}>Mô tả: <span>{product.moTa}</span></h6>
                                <h6>Đơn giá: <span>{product.giaBan}đ</span></h6>
                            </div>
                        </div>
                        <div className={styles.productActions}>
                            <img src={conmat} alt="" onClick={() => {nav("06/productDetail")}}/>
                            <img src={locked} alt="" />
                        </div>
                    </div>             
            ))}
            </div>
{/* 
            <div className={styles.maincontent}>
                <div className={styles.product}>
                    <div className={styles.productInfor}>
                        <img src={imageMap["xchickbg.png"]} alt="" />
                        <div>
                            <h4>Hamberger</h4>
                            <h6>Loại: <span>Hamberger</span></h6>
                            <h6 className={styles.des}>Mô tả: <span>Đây là một hamberder không bánh không nước</span></h6>
                            <h6>Đơn giá: <span>50.000đ</span></h6>
                        </div>
                    </div>
                    <div className={styles.productActions}>
                        <img src={conmat} alt="" onClick={() => {nav("06/productDetail")}}/>
                        <img src={locked} alt="" />
                    </div>
                </div>
            </div>     */}

            
            <Outlet/>
        </div>
    )
}