import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import ProductManagement from "../pages/ProductManagement/ProductManagement";
import ProductDetailAdmin from "../components/ProductDetailAdmin/ProductDetailAdmin";
import BanAn from "../pages/BanAn/BanAn";
import QLTaiKhoan from "../pages/QLTaiKhoan/QLTaiKhoan";
import QLNhanVien from "../pages/QLNhanVien/QLNhanVien";
import PhanQuyen from "../pages/PhanQuyen/PhanQuyen";
import ProtectedRoute from "../components/ProtectedRoute";

// Chứa toàn bộ cấu hình định tuyến của ứng dụng
export default function AppRoutes() {
    // const nav = useNavigate()
    // useEffect(() => {
    //     nav("/ban/06")
    //     // nav("/admin/kitchen")
    //     // nav("/admin/login")
    //     // nav("/admin/account")
    //     // nav("/admin/table")
    //     // nav("/admin/productManagement")
    //     // nav("/admin/productManagement/06/productDetail")
    //     // nav("/admin/orders/06/Detail")
    // },[])

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
                {/* Chuyển hướng từ /admin sang /admin/login */}
                    <Route index element={<Navigate to="/admin/login" replace />} />
                    <Route path="login" element={<AdminLogin/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<AdminLayout/>}>
                            <Route path="account" element={<QLTaiKhoan/>}/>
                            <Route path="roleLayer" element={<PhanQuyen/>}/>
                            <Route path="staff" element={<QLNhanVien/>}/>
                            <Route path="table" element={<BanAn/>}/>
                            <Route path="orders" element={<OrderConfirmation/>}>
                                <Route path=":orderId/Detail" element={<OrderDetail/>} />
                            </Route>
                            <Route path="kitchen" element={<KitchenDashboard/>}/>
                            <Route path="productManagement" element={<ProductManagement/>}>
                                <Route path=":productId/productDetail" element={<ProductDetailAdmin/>}/>    
                            </Route>
                        </Route> 
                    </Route>
                    {/* <Route path="*" element={<AdminNotFound/>}/> */}
                </Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </LoadingProvider>
    )
}