import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import Product from "../../components/Product/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import { createContext, useContext, useEffect, useState } from "react";
import "./Menu.css"
import classNames from "classnames";
import "../../index.css"
import Payment from "../../components/Payment/Payment";
import YourCart from "../YourCart/YourCart";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { getProducts } from "../../api/services/productService";
import Loading from "../../components/Loading/Loading";
import { ImageLoader } from "../../utils/ImageLoader";
import { getSideDish } from "../../api/services/sideDish";
import { getProduct_SideDish } from "../../api/services/sidedish_productService";
import { DataContext } from "../../api/services/ProductContext/DataProvider";

export default function Menu() {
  const { id } = useParams();

  const nav = useNavigate();
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


  const handelProductClick = (product) => {
    let spID = product.ID; 
    nav(`${spID}/Detail`, {state: {product: product}})
  }




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