import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import Product from "../../components/Product/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import { useEffect, useState,useParams } from "react";
import "./Menu.css"
import classNames from "classnames";
import "../../index.css"
import Payment from "../../components/Payment/Payment";
import YourCart from "../YourCart/YourCart";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { getProducts } from "../../api/services/productService";
import Loading from "../../components/Loading/Loading";
import { ImageLoader } from "../../utils/ImageLoader";
import { getSideDish } from "../../api/services/sideDish";
import { getProduct_SideDish } from "../../api/services/sidedish_productService";

export default function Menu() {

  const nav = useNavigate()
  const { simulateLoading } = useLoading();
  // const { id: tableId } = useParams(); // Lấy tableId từ URL

  const [products, setProducts] = useState([]); //raw data
  const [statusListSP, setStatusListSP] = useState(false);
  const [listSP, setListSP] = useState([]);
  const [load, setLoad] = useState(true);
  const [select, setSelect] = useState('0');
  const imageMap = ImageLoader.load();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [detail, setDetail] = useState(false);
  const [productForDetail, setProductForDetail] = useState(null);
  const [listSPforDetail, setListSPForDetail] = useState([]);
  

  const category = [
    {
      id: '0',
      name: 'Tất cả',
      img: 'cheesedlx_bb.png'
    },
    {
      id: '1',
      name: 'Hamburger',
      img: 'cheesedlx_bb.png'
    },
    {
      id: '2',
      name: 'Coffee',
      img: 'iced_milkVNcoffee.png'
    },
    {
      id: '3',
      name: 'Gà rán',
      img: 'x1-ga-ran.png'
    },
    {
      id: '4',
      name: 'Nước uống',
      img:'xdasani_water.png'
    },
    {
      id: '5',
      name: 'Tráng miệng',
      img: 'xhotfudge_mcsundae.png'
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleCategory = (id) => {
      if (id == 0) {
        setCategoryProducts(products);
        setDisplayProducts(products);
      }
      else {
        const list = products.filter((p) => {
          if (p.category.ID == id) {
            return p;
          }
        })
        setCategoryProducts(list);
        setDisplayProducts(list);
      }
  }

  // const fetchProducts = async () => {
  //   try {
  //     const list = await getProducts();
  //     console.log(list)
  //     setProducts(list);
  //     setDisplayProducts(list);
  //     const listSP = await getProduct_SideDish();
  //     setListSP(listSP)
  //   } catch (error) {
  //     console.error('Error fetching products:', {
  //       status: error.response?.status,
  //       data: error.response?.data,
  //       message: error.message,
  //     });
  //     throw new Error(error);
  //   }
  //   finally {
  //     setLoad(false);
  //   }
  // }
  const fetchProducts = async () => {
    try {
      setLoad(true);
      console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL); // Debug
      const productResponse = await getProducts();
      console.log('Products:', productResponse.data);
      setProducts(productResponse.data);
      setDisplayProducts(productResponse.data);

      const sideDishResponse = await getProduct_SideDish();
      console.log('Side Dishes:', sideDishResponse.data);
      setListSP(sideDishResponse.data);
    } catch (error) {
      const errorDetails = {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
      console.error('Error fetching products:', errorDetails);
      alert(`Không thể tải sản phẩm: ${error.message}`); // Hiển thị lỗi trên UI
    } finally {
      setLoad(false);
    }
  };


  const getListSPByPID = (productId) => {
    const list = listSP.filter((item) => {
      return(item.IDMonAn === productId)
    })
    return list;
  }


  const handelProductClick = (product) => {
    // setSelectedProduct(product)
    // const spID = product?.id || "sp01";
    // simulateLoading(500, () => {
    //   nav(`${spID}/Detail`)
    // })
    setProductForDetail(product);
    setListSPForDetail(getListSPByPID(product.ID))
  }

  useEffect(() => {
    if(productForDetail){
      setDetail(true);
    }
  }, [productForDetail])

  useEffect(() => {
    if(listSPforDetail){
      setStatusListSP(true);
    }
  }, [listSPforDetail])



  return (
    //phân loại
    <div className="container">
      <div className="categoryProducts scroll-box">
        {/* <div className="flex-column categoryItem selected">
          <img src={burger} alt="" />
          Burger
        </div>
        <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div> */}
        {category.map((item) => (
          <div 
            className={`flex-column categoryItem ${select === item.id ? 'selected' : ''}`}
            onClick={() => {
              setSelect(item.id);
              handleCategory(item.id)
            }}
          >
          <img src={imageMap[item.img]} alt="" />
          {item.name}
          </div>
        ))}
        {/* <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div>
        <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div>
        <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div>
        <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div>
        <div className="flex-column categoryItem">
          <img src={burger} alt="" />
          Burger
        </div> */}

      </div>
      {/* Vùng sản phẩm */}
      <div className="areaProducts">
        <div className="areaProductHeader">
          
          <h5>{category.find((item) => (item.id == select)).name}</h5>
          <hr />
        </div>

        <div className="areShowProduct flex-column">

          {load ? <Loading></Loading> :
            displayProducts.map((item) => {
              return <Product onClick={(product) => {handelProductClick(product)}} product={item} />
            })
          }
          {/* <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} /> */}

        </div>
        {/* <ProductDetail product={selectedProduct} onClose={handleProductClose}/> */}
      </div>
      <Payment text="Thanh toán" onClick={() => { simulateLoading(500, () => { nav("YourCart") }) }} />

      {detail && statusListSP ? <ProductDetail
        onClose={() => {setDetail(false)}}
        product={productForDetail}
        listSP={listSPforDetail}
      >
      </ProductDetail> : null}
    </div>
  )
}