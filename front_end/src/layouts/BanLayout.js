import  {Outlet, useParams, useLocation} from "react-router-dom";

import Header from "../components/Header/Header";
import Menu from "../pages/Menu/Menu";
import "../App.css"
import { useEffect } from "react";

export default function BanLayout() {
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        // Kiểm tra xem có token trong localStorage không (tức là người dùng có thể đến từ admin)
        const token = localStorage.getItem('token');
        if (token) {
        // Xóa thông tin đăng nhập trong localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('routes');
        localStorage.removeItem('firstpage');

        // Thay thế lịch sử trình duyệt để ngăn nút "Back" quay lại trang admin
        window.location.replace(location.pathname);
        }
    }, [location.pathname]);

    return (
        <div className="app">
            <div className="main">  
                <Header title={id}/>  
                <Outlet/>   
            </div>
        </div>
    )
}