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
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import KitchenDashboard from "../pages/KitchenDashboard/KitchenDashboard";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import OrderDetail from "../components/OrderDetail/OrderDetail";

// Chứa toàn bộ cấu hình định tuyến của ứng dụng
export default function AppRoutes() {
    const nav = useNavigate()
    useEffect(() => {
        // nav("/ban/06")
        // nav("/admin/kitchen")
        nav("/admin/login")
        // nav("/admin/orders/06/Detail")
    },[])

    return (
        <LoadingProvider>
            <Routes>

                {/* Routes khách hàng */}
                <Route path="/ban/:id" element={<BanLayout/>}>
                    <Route index element={<Menu/>}/>
                    <Route path=":spID/Detail" element={<ProductDetail/>}/>
                    <Route path="YourCart" element={<YourCart/>}> 
                        <Route path="ThanhToanQR" element={<PopupThanhToanQR/>}/>
                    </Route>
                    <Route path="OrderSuccess" element={<OrderSuccess/>}/>
                </Route>

                {/* Routes Admin */}
                <Route path="/admin">
                    <Route path="login" element={<AdminLogin/>}/>
                    <Route element={<AdminLayout/>}>
                        <Route path="orders" element={<OrderConfirmation/>}>
                            <Route path=":orderId/Detail" element={<OrderDetail/>} />
                        </Route>
                        <Route path="kitchen" element={<KitchenDashboard/>}/>
                    </Route> 
                    {/* <Route path="*" element={<AdminNotFound/>}/> */}
                </Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </LoadingProvider>
    )
}