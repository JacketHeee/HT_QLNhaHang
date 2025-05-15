import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import Product from "../../components/Product/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import "./Menu.css"
import classNames from "classnames";
import "../../index.css"
import Payment from "../../components/Payment/Payment";
import YourCart from "../YourCart/YourCart";
import { useNavigate, useParams} from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { getProducts } from "../../api/services/productService";
import Loading from "../../components/Loading/Loading";
import { ImageLoader } from "../../utils/ImageLoader";
import { getSideDish } from "../../api/services/sideDish";
import { getProduct_SideDish } from "../../api/services/sidedish_productService";
import { DataContext } from "../../api/services/ProductContext/DataProvider";
import logo from '../../assets/img/logo.png';

export default function Menu() {

  const { id } = useParams();

  const nav = useNavigate()
  const { simulateLoading } = useLoading();
  // const { id: tableId } = useParams(); // Lấy tableId từ URL

  // const [products, setProducts] = useState([]); //raw data
  const [statusListSP, setStatusListSP] = useState(false);
  // const [listSP, setListSP] = useState([]);
  // const [load, setLoad] = useState(true);
  // const [select, setSelect] = useState('0');
  const imageMap = ImageLoader.load();

  const [load, setLoad] = useState(true);// state load sản phẩm

  const [displayProducts, setDisplayProducts] = useState([]);// state cho sản phẩm hiển thị 

  const [select, setSelect] = useState('0');// state theo dõi bộ lọc
  const [categoryProducts, setCategoryProducts] = useState([]); // state cho sản phẩm phân loại theo bộ lọc

  // const [productForDetail, setProductForDetail] = useState(null);// setate cho sản phẩm mà detail sẽ hiển thị
  // const [listSPforDetail, setListSPForDetail] = useState([]);// lấy list sản phẩm-món ăn kèm tương ứng để detail hiển thị

  // const [statusListSP, setStatusListSP] = useState(false);//theo dõi trạng thái list sản phẩm-món ăn kèm để mở detail

  const [dataForCart, setDataForCart] = useState([]); //danh sách chi tiết hóa đơn cho phần thanh toán
  const { setIdTable, products, sidedishes, listSP, fetchData ,numberOfP, setNumberOfP} = useContext(DataContext);
  // console.log({ products, sidedishes, listSP, fetchData });

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
    setIdTable(id);
    fetchData();
  }, [fetchData])

  useEffect(() => {
    if(products && sidedishes && listSP){
      setDislay();
    }
  }, [products, sidedishes, listSP])

  const setDislay = async () => {
    try {
      setDisplayProducts(products);
    } catch (error) {
      throw new Error(error);
    }
    setLoad(false);
  }

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
  // const fetchProducts = async () => {
  //   try {
  //     setLoad(true);
  //     const productResponse = await getProducts();
  //     setProducts(productResponse.data);
  //     setDisplayProducts(productResponse.data);

  //     const sideDishResponse = await getProduct_SideDish();
  //     console.log('Side Dishes:', sideDishResponse.data);
  //     setListSP(sideDishResponse.data);
  //   } catch (error) {
  //     const errorDetails = {
  //       status: error.response?.status,
  //       data: error.response?.data,
  //       message: error.message,
  //     };
  //     console.error('Error fetching products:', errorDetails);
  //     alert(`Không thể tải sản phẩm: ${error.message}`); // Hiển thị lỗi trên UI
  //   } 
  //     setLoad(false);
    
  // };

  // const fetchProducts = async () =>{
  //       try {
  //           setLoad(true)
  //           const data = await getProducts();
  //           console.log(data)
  //           setProducts(data);
  //           setDisplayProducts(data);
  //           const sideDishResponse = await getProduct_SideDish();
  //           console.log('Side Dishes:', sideDishResponse);
  //           setListSP(sideDishResponse);
  //       } catch (error) {
  //           alert('Load dữ liệu thất bại!');
  //           console.error(error);
  //       }finally{
  //           setLoad(false)
  //       }
  //   }


  // const getListSPByPID = (productId) => {
  //   const list = listSP.filter((item) => {
  //     return(item.IDMonAn === productId)
  //   })
  //   return list;
  // }


  const handelProductClick = (product) => {
    let spID = product.ID; 
    nav(`${spID}/Detail`, {state: {product: product}})
  }


  if(load){
    return (
      <div className="logoContainer">
        <img className="logo" src={logo}></img>
        <p>Vui lòng chờ trong giây lát!</p>
        <Loading></Loading>
      </div>
    )
  }

  return (
    //phân loại
    <div className="container">
      <div className="categoryProducts scroll-box">
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


      </div>
      {/* Vùng sản phẩm */}
      <div className="areaProducts">
        {/* Cái thanh ngang á */}
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
      <Payment 
        text="Thanh toán" 
        onClick={() => { nav("YourCart", {
          state: {
            numberOfProduct: numberOfP,
            listCTHD: dataForCart,
          }
        })}} 
        count={numberOfP}
        canPay={dataForCart.length !== 0?true:false}//để check xem nút thanh toán được bấm không
      />

      {/* {detail && statusListSP ? <ProductDetail
        onClose={() => {setDetail(false)}}
        product={productForDetail}
        listSP={listSPforDetail}
        listMAK={sidedishes}

        onAddToCart={(dataForCart) => {handleAddToCart(dataForCart)}}
        numberOfProduct={numberOfP}

        updateNumberOfP={() => {handleUpdateNumberOfP()}}
        
      >
      </ProductDetail> : null} */}


    </div>
  )
}