
import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import styles from "./ProductManagement.module.css" 

import locked from "../../assets/icon/okhoa.svg";
import eye from "../../assets/icon/conmat.svg";
import conmat from "../../assets/icon/conmat.svg"; 
import { Outlet, useNavigate } from "react-router-dom";
import { getProducts, lockProduct } from "../../api/services/productService";
import FilterButton from "../../components/FilterButton/filterbutton";
import { getProductsByCategoryID } from "../../api/services/categoryService";
import Product from "./Product";
import { getSideDish } from "../../api/services/sideDish";
import { getProduct_SideDish } from "../../api/services/sidedish_productService";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductDetailAdmin from "../../components/ProductDetailAdmin/ProductDetailAdmin";

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

    const listStatus = [
        {
            id: "all",
            name: "Tất cả"
        },
        {
            id: "ready",
            name: "Hiện có"
        },
        {
            id: "lock",
            name: "Đang khóa"
        },
    ]
    ////các useState
    const [choosedStateDish, setChoosedStateDish] = useState("all")
    const [categoryChoosed, setCategoryChoosed] = useState("0"); 

    const nav = useNavigate()

    const [products, setProducts] = useState([]);
    const [sidedish_product, setSidedish_Product] = useState([]);
    const [sidedish, setSidedish] = useState([]);

    const [loading, setLoading] = useState(true); //theo dõi trạng thái loading
    const [error, setError] = useState(null); //theo dõi trạng thái lỗi
    
    const [filterProducts, setFilterProducts] = useState([]); //cho tìm kiếm
    const [categoryProducts, setCategoryProducts] = useState([]); //cho phân loại
    const [statusProducts,  setStatusProducts] = useState([]); //cho trạng thái

    const [displayProducts, setDisplayProducts] = useState([]); //cho hiển thị

    const [loadingSideDish, setLoadingSideDish] = useState(true); //cho phần load sidedish
    ////các useState

    //load products: Chỉ chạy duy nhất 1 lần khi mount
    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() =>{
        fetchSideDish();
    }, [])

    const fetchAllProducts = async () =>{
        try {
            const data = await getProducts();
            setProducts(data);
            setCategoryProducts(data);
            setStatusProducts(data);
            setDisplayProducts(data);
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    const fetchSideDish = async () => {
        try {

            const [sdp, sd] = await Promise.all([
                await getProduct_SideDish(),
                await getSideDish()
            ])

            setSidedish_Product(sdp);
            setSidedish(sd);

        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        } finally{
            setLoadingSideDish(false)
        }
    }

    ////////////////////////////////////////////////////////////////// Phân loại, Phân loại trạng thái, Tìm kiếm
    // Mức ưu tiên lọc: Lọc theo category > Lọc theo status > Tìm kiếm ()
    // set danh sách hiển thị dựa trên phân loại, lấy data từ products
    const handleSelectedCategory = (id) => {
        if(products){ // tránh trường hợp chưa load xong
            if(id == 0){
                setCategoryProducts(products);
                setDisplayProducts(products);
            }
            else{
                const list = products.filter((p) => {
                    if(p.category.ID == id){
                        return p;
                    }
                })
                setCategoryProducts(list);
                setDisplayProducts(list);
            }
        }
    }

    const handleSearch = (keyWord) => {
        if (!keyWord.trim()) {
            setFilterProducts(statusProducts);
            return;
        }        
        const filtered = statusProducts.filter((p) =>
            p.tenMonAn.toLowerCase().includes(keyWord.toLowerCase())
        );
        setFilterProducts(filtered);
        setDisplayProducts(filtered);
    }

    const handleStatus = (id) => {
        if(products){ // tránh trường hợp chưa load xong
            if(id == 'all'){
                setStatusProducts(categoryProducts)
                setDisplayProducts(categoryProducts);
            }
            else if(id === 'ready'){
                const list = categoryProducts.filter((p) => {
                    if(p.isLocked === false){
                        return p;
                    }
                })
                setStatusProducts(list);
                setDisplayProducts(list);
            }
            else{   //lock
                const list = categoryProducts.filter((p) => {
                    if(p.isLocked === true){
                        return p;
                    }
                })
                setStatusProducts(list);
                setDisplayProducts(list);
            }
        }
    }


    const getListSideDish = (idProduct) => {
        const listSP = sidedish_product.filter((sp) => 
            sp.IDMonAn === idProduct
        )

        const sideDishes = sidedish.filter(sd => 
            listSP.some(sp => sp.IDMonAnKem == sd.ID)
        );
        return sideDishes
    }


    ////////////////////////////////////////////////////////////////// Phân loại, Phân loại trạng thái, Tìm kiếm

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
                            <FilterButton 
                                id={index.id} 
                                onSelect={() => {
                                    handleSelectedCategory(index.id);
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
                {listStatus.map((index) => (
                    <FilterButton
                        id={index.id} 
                        onSelect={() => {
                            handleStatus(index.id);
                            setChoosedStateDish(index.id);
                        }}
                        className={choosedStateDish === index.id ? styles.active : ""}
                    >
                        {index.name}
                    </FilterButton>
                ))}

            </div>
            
            {/* Trường hợp chưa load dữ liệu hoặc lỗi */}
            {loading && <div>Đang load dữ liệu...</div>}
            {error && <div>{error}</div>}

            {/* Các sản phẩm */}
            <div className={styles.maincontent}>
            {displayProducts.map(product => ( 
   
                <Product 
                    key={product.ID} 
                    product={product}
                    getListSideDish={(id) => getListSideDish(id)}
                ></Product>

            ))}
            </div>
            <Outlet/>
        </div>
    )
}