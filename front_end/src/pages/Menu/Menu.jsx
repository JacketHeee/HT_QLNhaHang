import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import Product from "../../components/Product/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import "./Menu.css"
import classNames from "classnames";
import "../../index.css"
import Payment from "../../components/Payment/Payment";
import YourCart from "../YourCart/YourCart";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { getProducts } from "../../api/services/productService";
import Loading from "../../components/Loading/Loading";

export default function Menu() {

  const nav = useNavigate()
  const { simulateLoading } = useLoading();

  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  const [select, setSelect] = useState('0');

  const category = [
    {
      id: '0',
      name: 'Tất cả',
      img: burger
    },
    {
      id: '1',
      name: 'Hamburger',
      img: burger
    },
    {
      id: '2',
      name: 'Coffee',
      img: 'iced_milkVNCoffee.png'
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
      img: 'xhotfudge_mcsundea.png'
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, [])



  const fetchProducts = async () => {
    try {
      const list = await getProducts();
      setProducts(list);
    } catch (error) {
      throw new Error(error);
    }
    setLoad(false);
  }





  const handelProductClick = (product) => {
    // setSelectedProduct(product)
    const spID = product?.id || "sp01";
    simulateLoading(500, () => {
      nav(`${spID}/Detail`)
    })
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
            onClick={() => {setSelect(item.id)}}
          >
          <img src={burger} alt="" />
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
          <h5>Burger</h5>
          <hr />
        </div>

        <div className="areShowProduct flex-column">

          {load ? <Loading></Loading> :
            products.map((item) => {
              return <Product onClick={handelProductClick} product={item} />
            })
          }
          {/* <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} />
          <Product onClick={handelProductClick} /> */}
        </div>
        {/* <ProductDetail product={selectedProduct} onClose={handleProductClose}/> */}
      </div>
      <Payment text="Thanh toán" onClick={() => { simulateLoading(500, () => { nav("YourCart") }) }} />

    </div>
  )
}