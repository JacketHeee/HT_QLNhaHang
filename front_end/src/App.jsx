import "./App.css"
import logo from "./assets/img/logo.png"
import burger from "./assets/img/products/burger/cheesedlx_bb.png"
import cart_red from "./assets/icon/cart_red.svg"
import Product from "./components/Product/Product";
import Payment from "./components/Payment/Payment";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import YourCart from "./components/YourCart/YourCart"
import { useState } from "react";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handelProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleProductClose = () => {
    setSelectedProduct(null)
  }

  
  const [clickedPayment, setClickedPayment] = useState(true)

  const handlePaymentClick = () => {
    setClickedPayment(true)
  }

  const handlePaymentClose = () => {
    setClickedPayment(false)
  }

  return (
    <div className="app">
      <div className="main">  
        <div className="header">
          <img src={logo} alt="" style={{ width: 'auto', height: '40px' }}/>
          <h4>- Bàn số 5</h4>
        </div>
        <div className="flex-column container">
          <div className="categoryProducts scroll-box">
            <div className="flex-column categoryItem selected">
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
            </div>
            <div className="flex-column categoryItem">
              <img src={burger} alt="" />
              Burger
            </div>
            <div className="flex-column categoryItem">
              <img src={burger} alt="" />
              Burger
            </div>
            
          </div>

          <div className="areaProducts">
            <div className="areaProductHeader">
              <h5>Burger</h5>
              <hr/>
            </div>

            <div className="areShowProduct flex-column"> 
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
              <Product onClick={handelProductClick}/>
            </div>
            <ProductDetail product={selectedProduct} onClose={handleProductClose}/>
          </div>                              
        </div>
      </div>
      <Payment text="Thanh toán" onClick={handlePaymentClick}/>
      <YourCart clickedPayment={clickedPayment} onClose={handlePaymentClose}/>
    </div>
  );
}



export default App;