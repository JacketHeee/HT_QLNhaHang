    // export default AdminLayout;
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './AdminLayout.module.css';

import iconAccount from "../../assets/icon/account.svg";
import monan from "../../assets/icon/monan.svg";
import banan from "../../assets/icon/banan.svg";
import donhang from "../../assets/icon/donhang.svg";
import bep from "../../assets/icon/kitchen.svg";
import qlnhanvien from "../../assets/icon/qlnhanvien.svg";
import hinhanh from "../../assets/icon/qlaccount.svg";
import layer from "../../assets/icon/roleLayer.svg";
import logout from "../../assets/icon/logout.svg";

const menuItems = [
    { id: "product", path: '/admin/productManagement', routeName: 'productManagement', label: 'Món ăn', icon: monan },
    { id: "table", path: '/admin/table', routeName: 'table', label: 'Bàn ăn', icon: banan },
    { id: "order", path: '/admin/orders', routeName: 'orders', label: 'Đơn hàng', icon: donhang },
    { id: "kitchen", path: '/admin/kitchen', routeName: 'kitchen', label: 'Bảng điều khiển bếp', icon: bep },
    { id: "staff", path: '/admin/staff', routeName: 'staff', label: 'Quản lý nhân viên', icon: qlnhanvien },
    { id: "account", path: '/admin/account', routeName: 'account', label: 'Quản lý tài khoản', icon: hinhanh },
    { id: "roleLayer", path: '/admin/roleLayer', routeName: 'roleLayer', label: 'Phân quyền', icon: layer },
];

const AdminLayout = () => {
    const [selectedItem, setSelectedItem] = useState("firstpage");
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    // Kiểm tra token
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Cập nhật selectedItem dựa trên đường dẫn hiện tại
    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => currentPath.startsWith(item.path));
        if (activeItem) {
            setSelectedItem(activeItem.id);
        } else {
            setSelectedItem("firstpage"); // Nếu không khớp, đặt về giá trị mặc định
        }
    }, [location.pathname]);

    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('routes');
        localStorage.removeItem('firstpage');
        navigate('/admin/login');
    };

    // Lọc các menu item mà người dùng có quyền truy cập
    const listRoutes = JSON.parse(localStorage.getItem('routes')) || [];
    const allowedMenuItems = menuItems.filter((item) =>
        listRoutes.includes(item.routeName)
    );

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div className={styles.header}>
                    <img src={iconAccount} alt="" />
                    <div>
                        <h4>Admin 1</h4>
                        <p>Chi nhánh trung tâm</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {allowedMenuItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setSelectedItem(item.id);
                                navigate(item.path);
                            }}
                            className={`${styles.navlink} ${selectedItem === item.id ? styles.active : ""}`}
                        >
                            <img src={item.icon} alt="" />
                            <p>{item.label}</p>
                        </div>
                    ))}
                </nav>
                <div className={styles.classNameButLog}>
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                    >
                        <img src={logout} alt="" />
                        Đăng xuất
                    </button>
                </div>
            </div>
            <div className={styles.mainContent}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;