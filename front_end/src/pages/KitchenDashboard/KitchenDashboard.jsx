import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KitchenDashboard.module.css';
import logout from "../../assets/icon/logout.svg";
import classNames from "classnames";
import { doneOrder, getOrders } from '../../api/services/orderService';
import { format } from 'date-fns';
import { getorderproducts } from '../../api/services/orderProductService';
import Loading from '../../components/Loading/Loading';
import SuccessToast from '../../components/Notification/Notification';

const KitchenDashboard = () => {
    const navigate = useNavigate();

    // const [orders, setOrders] = useState(
    // [
    //     { 
    //         id: '1', 
    //         table: 'Bàn 1', 
    //         time: '2025-04-28 10:30', 
    //         total: 150000, 
    //         totalSideDishes: 90192, 
    //         status: 'Chờ xác nhận',
    //         orderDetail: [
    //             { 
    //                 dish: "Hamberger", 
    //                 quantity: 3, 
    //                 price: 190000, 
    //                 sideDishes: "Phô mai, rau, cơm", 
    //                 totalSideDishes: 100000, 
    //                 totalProduct: 19000 
    //             },
    //             { 
    //                 dish: "Hamberger", 
    //                 quantity: 3, 
    //                 price: 190000, 
    //                 sideDishes: "Phô mai, rau, cơm", 
    //                 totalSideDishes: 100000, 
    //                 totalProduct: 19000 
    //             },
    //         ]
    //     },
    //     { 
    //         id: '1', 
    //         table: 'Bàn 1', 
    //         time: '2025-04-28 10:30', 
    //         total: 150000, 
    //         totalSideDishes: 90192, 
    //         status: 'Chờ xác nhận',
    //         orderDetail: [
    //             { 
    //                 dish: "Hamberger", 
    //                 quantity: 3, 
    //                 price: 190000, 
    //                 sideDishes: "Phô mai, rau, cơm", 
    //                 totalSideDishes: 100000, 
    //                 totalProduct: 19000 
    //             },
    //             { 
    //                 dish: "Hamberger", 
    //                 quantity: 3, 
    //                 price: 190000, 
    //                 sideDishes: "Phô mai, rau, cơm", 
    //                 totalSideDishes: 100000, 
    //                 totalProduct: 19000 
    //             }
    //         ]
    //     },
    // ]);

    const [orders, setOrders] = useState([]);//rawdata
    const [displayOrders, setDisplayOrders] = useState([]);
    const [load, setLoad] = useState([]);
    
    const [doneDishStatus, setDoneDishStatus] = useState(false);

    const [listOP, setListOP] = useState([]);


    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        navigate('/admin/login');
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const rs = await getOrders();
            setOrders(rs);
            const listOP = await getorderproducts();
            setListOP(listOP)
            setOrdersForDisplay(rs);
        } catch (error) {
            throw new Error(error);
        }
        setLoad(false);
    }

    const setOrdersForDisplay = (rs) => {
        const list = rs.filter((item) => (item.status == 'Đã xác nhận'));
        setDisplayOrders(list)
    }


    const formatDatetoDateString = (isoDate) => {
        const formatted = format(new Date(isoDate), 'HH:mm:ss');
        return formatted
    }

        
    const getListOPForDetail = (id) =>(
        listOP.filter((item) => (item.orderId === id))
    )

    const handleDoneOrder = async (orderId) => {
        setLoad(true);
        await doneOrder(orderId);
        setDisplayOrders(prev => prev.filter((item) => (item.id !== orderId)));
        setLoad(false);

        setDoneDishStatus(true);
        setTimeout(() => {
            setDoneDishStatus(false);
        }, 1000);
    }



    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h4>Average<br />Order Time</h4>
                    <h2>27:04</h2>
                </div>

                <div>
                    <h4>Maximum<br />Order Time</h4>
                    <h2>27:04:02</h2>
                </div>
            </div>
            <div className={styles.body}>
                {displayOrders.map((item, index) => (
                    <div className={classNames(styles.order, styles.green)}>
                        <h5>#{item.id}</h5>
                        <h4>B{item.tableId} - Eat in</h4>

                        <button 
                            className={styles.doneDish}
                            onClick={() => handleDoneOrder(item.id)}
                        >{"<<< Ready >>>"}</button>

                        <div className={styles.orderDetail}>
                            {getListOPForDetail(item.id).map((sd) => (// Lấy danh sách OP theo id 
                                <div>
                                    <div>
                                        <p>({sd.quantity}){sd.product.tenMonAn}</p>
                                    </div>
                                    <div>
                                        <p>{sd.product.moTa}</p>
                                        <span>Dữ liệu món ăn kèm từ khách hàng</span>
                                    </div>
                                </div>
                            ))}

                            {/* <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div> */}
                        </div>

                        <h5 className={styles.time}>{formatDatetoDateString(item.createdAt)}</h5>

                        <button className={styles.sothutu}>{index + 1}</button>
                    </div>
                ))}

            </div>
            <div className={styles.footer}>
                <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                >
                    <img src={logout} alt="" />
                    Đăng xuất
                </button>
            </div>

            {load ? <Loading></Loading> : null}
            {doneDishStatus? <SuccessToast message="Đã xác nhận xong món!"></SuccessToast> : null}
            
        </div>
    );
};

export default KitchenDashboard;