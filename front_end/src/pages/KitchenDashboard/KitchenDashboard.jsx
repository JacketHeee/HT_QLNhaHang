import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KitchenDashboard.module.css';

const KitchenDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        { id: 1, table: 'Bàn 1', time: '2025-04-28 10:30', status: 'Đã xác nhận', items: [{ name: 'Phở bò', quantity: 2, note: 'Không hành' }] },
        { id: 2, table: 'Bàn 2', time: '2025-04-28 10:35', status: 'Đã xác nhận', items: [{ name: 'Cơm chiên', quantity: 1, note: '' }] },
    ]);

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const startCooking = (id) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: 'Đang làm' } : order
        ));
    };

    const completeOrder = (id) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: 'Hoàn thành' } : order
        ));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Bảng điều khiển bếp</h2>
            <div className={styles.orderList}>
                {orders.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                        <h3 className={styles.orderTitle}>{order.table}</h3>
                        <p className={styles.orderInfo}>Thời gian: {order.time}</p>
                        <p className={styles.orderInfo}>Trạng thái: {order.status}</p>
                        <div className={styles.orderItems}>
                            <h4 className={styles.itemsTitle}>Chi tiết món:</h4>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        {item.name} x{item.quantity} {item.note && `(${item.note})`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {order.status === 'Đã xác nhận' && (
                            <div className={styles.actions}>
                                <button
                                    onClick={() => startCooking(order.id)}
                                    className={styles.startButton}
                                >
                                    Bắt đầu chế biến
                                </button>
                            </div>
                        )}
                        {order.status === 'Đang làm' && (
                            <div className={styles.actions}>
                                <button
                                    onClick={() => completeOrder(order.id)}
                                    className={styles.completeButton}
                                >
                                    Hoàn thành
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KitchenDashboard;