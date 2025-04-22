import burger from "../../assets/img/products/burger/cheesedlx_bb.png";
import Product from "../../components/Product/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import { useState } from "react";
import  "./Menu.css"
import classNames from "classnames";
import "../../index.css"
import Payment from "../../components/Payment/Payment";
import YourCart from "../YourCart/YourCart";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";

export default function Menu() {

    const nav = useNavigate()
    const {simulateLoading} = useLoading();
    
      const handelProductClick = (product) => {
        // setSelectedProduct(product)
        const spID = product?.id || "sp01"; 
        simulateLoading(500,() => {
          nav( `${spID}/Detail`)
        })
      }

    return (
        <div className="container">
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
            {/* <ProductDetail product={selectedProduct} onClose={handleProductClose}/> */}
          </div>    
          <Payment text="Thanh toán" onClick={() => {simulateLoading(500,() => {nav("YourCart")})}}/>                        
        </div>
    )
}