
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../PopUp/PopUp"
import styles from "./OrderDetail.module.css"

import { useState } from "react";
import Table from "../CustomTable/Table";
import { formatCurrency } from "../../utils/format";

export default function OrderDetail() {
    const {orderId} = useParams() 
    console.log(orderId)

    const [orders, setOrders] = useState([
        { 
            id: '1', 
            table: 'Bàn 1', 
            time: '2025-04-28 10:30', 
            total: 150000, 
            totalSideDishes: 90192, 
            status: 'Chờ xác nhận',
            orderDetail: [
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
                { 
                    dish: "Hamberger", 
                    quantity: 3, 
                    price: 190000, 
                    sideDishes: "Phô mai, rau, cơm", 
                    totalSideDishes: 100000, 
                    totalProduct: 19000 
                },
            ]
        }
    ]);

    const nav = useNavigate();

    const columns = [
        { key: 'dish', title: 'Món ăn', render: row => `${row.dish}` },
        { key: 'quantity', title: 'Số lượng', render: row => `${row.quantity}` },
        { key: 'price', title: 'Giá bán', render: row => `${row.price.toLocaleString()} đ` },
        { key: 'sideDishes', title: 'Món ăn kèm', render: row => `${row.sideDishes}` },
        { key: 'totalSideDishes', title: 'Tiền món ăn kèm', render: row => `${row.totalSideDishes.toLocaleString()} đ` },
        { key: 'totalProduct', title: 'Tổng tiền', render: row => `${row.totalProduct.toLocaleString()} đ` }
    ];

    return (
        <Popup> 
        <div className={styles.container}>
            <h3>Xác nhận đơn hàng</h3>
            <div className={styles.thongtinchung}>
                <div><h6>Mã đơn hàng:</h6> <span>1234</span></div>
                <div><h6>Số bàn:</h6> <span>B04</span></div>
                <div><h6>Thời gian đặt:</h6> <span>20-04-2025 19:04</span></div>
                <div><h6>Hình thức thanh toán:</h6> <span>Online - đã thanh toán</span></div>
            </div>
            <div className={styles.chitiet}>
                <Table data={orders[0].orderDetail} columns={columns}/>
                <h6>Tổng tiền: <span>{formatCurrency(102920349)}đ</span></h6>
            </div>
    
            <div className={styles.ghichu}>
                <h6>Ghi chú của khách hàng:</h6>
                <textarea rows="3" cols="40" placeholder="Ghi chú của khách hàng" disabled value="Hamberger không bánh không đường"/>
            </div>
    
            <div className={styles.actions}>
                <button onClick={() => {nav(-1)}}>Xác nhận</button>
                <button onClick={() => {nav(-1)}}>Hủy</button>
            </div>
    
        </div>
      </Popup>
    )
}