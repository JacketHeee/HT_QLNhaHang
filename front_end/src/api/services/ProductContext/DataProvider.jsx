import { createContext, useEffect, useState } from "react";
import { getProducts } from "../productService";
import { getSideDish } from "../sideDish";
import { getProduct_SideDish } from "../sidedish_productService";

//khởi tạo context
export const DataContext = createContext();

//provider cho quản lý dữ liệu
const DataProvider = ({children}) => {
  const [ products, setProducts ] = useState(null);
  const [ sidedishes, setSidedishes ] = useState(null);
  const [ listSP, setListSP ] = useState(null);
  const [ numberOfP, setNumberOfP ] = useState(0);// số lượng trên giỏ hàng nhỏ
  const [ listCTHD, setListCTHD ] = useState([]);// danh sách chi tiết hóa đơn cho cart
  const [ tongGia, setTongGia ] = useState(0);//tổng giá hóa đơn
  const [ idTable, setIdTable] = useState(0);

  const fetchData = async () => {
    if(!products && !sidedishes && !listSP){
      const products = await getProducts();
      const sidedishes = await getSideDish();
      const sidedish_products = await getProduct_SideDish();
      setProducts(products);
      setSidedishes(sidedishes);
      setListSP(sidedish_products);
    //   console.log("data fetch : ", products)
    }
  }

  return (
    <DataContext.Provider value={{ idTable, setIdTable, products, sidedishes, listSP, fetchData, numberOfP, setNumberOfP, listCTHD, setListCTHD , tongGia, setTongGia}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;