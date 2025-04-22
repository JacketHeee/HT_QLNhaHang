import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import BanLayout from "../layouts/BanLayout";
import Menu from "../pages/Menu/Menu";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import YourCart from "../pages/YourCart/YourCart";
import PopupThanhToanQR from "../pages/PopupThanhToanQR/PopupThanhToanQR";
import { useEffect,useState } from "react";
import NotFound from "../pages/NotFound/NotFound";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import { LoadingProvider } from "../contexts/LoadingContext";

// Chứa toàn bộ cấu hình định tuyến của ứng dụng
export default function AppRoutes() {
    const nav = useNavigate()
    useEffect(() => {
        nav("/ban/06")
    },[])

    return (
        <LoadingProvider>
            <Routes>
                <Route path="/ban/:id" element={<BanLayout/>}>
                    <Route index element={<Menu/>}/>
                    <Route path=":spID/Detail" element={<ProductDetail/>}/>
                    <Route path="YourCart" element={<YourCart/>}> 
                        <Route path="ThanhToanQR" element={<PopupThanhToanQR/>}/>
                    </Route>
                    <Route path="OrderSuccess" element={<OrderSuccess/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </LoadingProvider>
    )
}