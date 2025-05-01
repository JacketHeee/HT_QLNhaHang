import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
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

// Danh sách menu với vai trò được phép truy cập
const menuItems = [
    {id:"product", path: '/admin/productManagement', label: 'Món ăn', roles: ['admin', 'kitchen'],icon: monan},
    {id:"table", path: '/admin/table', label: 'Bàn ăn', roles: ['admin', 'kitchen'],icon: banan},
    {id:"order", path: '/admin/orders', label: 'Đơn hàng', roles: ['admin', 'staff'],icon: donhang },
    {id:"kitchen", path: '/admin/kitchen', label: 'Bảng điều khiển bếp', roles: ['admin', 'kitchen'],icon: bep},
    {id:"staff", path: '/admin/staff', label: 'Quản lý nhân viên', roles: ['admin', 'kitchen'],icon: qlnhanvien},
    {id:"account", path: '/admin/account', label: 'Quản lý tài khoản', roles: ['admin', 'kitchen'],icon: hinhanh},
    {id:"roleLayer", path: '/admin/roleLayer', label: 'Phân quyền', roles: ['admin', 'kitchen'],icon: layer},
];


const AdminLayout = () => {
    const [selectedItem,setSelectedItem] = useState("order");
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole') || 'staff';

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) {
            navigate('/admin/login');
        }
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        navigate('/admin/login');
    };

    const allowedMenuItems = menuItems.filter(item => item.roles.includes(userRole));

    
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
                                setSelectedItem(item.id)
                                navigate(item.path)
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