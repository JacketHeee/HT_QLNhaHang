import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';
import Search from '../../components/Search/Search';
import Table from '../../components/CustomTable/Table';

const OrderConfirmation = () => {
    const nav = useNavigate();
    const [orders, setOrders] = useState([
        { id: '1', table: 'Bàn 1', time: '2025-04-28 10:30', total: 150000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
        { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    ]);

    // Định nghĩa cột
    const columns = [
        { key: 'id', title: 'Mã đơn hàng' },
        { key: 'table', title: 'Bàn' },
        { key: 'time', title: 'Thời gian' },
        { key: 'total', title: 'Tổng tiền', render: row => `${row.total.toLocaleString()} VND` },
        { key: 'status', title: 'Trạng thái' }
    ];

    // Định nghĩa hành động
    const actions = (row) => {
        if (row.status !== 'Chờ xác nhận') return null;
        return (
            <div className={styles.actions} onClick={() => {nav("06/Detail")}}>
                Xem chi tiết
            </div>
        );
    };


    //lay du tlieu tu api 

    const [data, setData] = useState([]);     // Dữ liệu từ API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null);  // Lỗi nếu có

    useEffect(() => {
        // Gọi API khi com
        getData();
    }, []); 


    const handleSearch = (keyword) => {
        console.log(keyword)
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Danh sách đơn hàng</h3>
            <div className={styles.search_select}>
                <Search onSearch={handleSearch} placeHolder={"Tìm kiếm theo mã đơn..."}/>
                <select name="" id="">
                    <option value="">Bún bò</option>
                    <option value="">Gà sợi phở</option>
                    <option value="">Pín heo</option>
                    <option value="">Bò ba bể</option>
                </select>
            </div>
            <Table columns={columns} data={orders} actions={actions}/>
            <Outlet/>
        </div>
    );
};

export default OrderConfirmation;




// Hàm gọi API lấy dữ liệu
async function getData() {
    try {
        const response = await fetch('https://ht-qlnhahang.onrender.com/products'); // Thay bằng URL thật của bạn
        const data = await response.json(); // Chuyển response thành đối tượng JSON

        // Hiển thị dữ liệu ra console
        console.log(data);

        // Duyệt qua từng món ăn và in ra thông tin
        data.forEach(monan => {
            console.log(`Tên món: ${monan.ID}`);
            console.log(`Mô tả: ${monan.tenMonAn}`);
            console.log(`Giá bán: ${monan.moTa} VND`);
            console.log(`Hình ảnh: ${monan.tenHinhAnh}`);
            console.log('------------------');
        });

    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}

// Gọi hàm
