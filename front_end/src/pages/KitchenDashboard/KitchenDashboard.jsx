import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KitchenDashboard.module.css';
import logout from "../../assets/icon/logout.svg";
import classNames from "classnames";

const KitchenDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState(
    [
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
        },
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
        },
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
        },
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
        },
    ]);


    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        navigate('/admin/login');
    };


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

                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.yellow)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.yellow)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.yellow)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                <div className={classNames(styles.order,styles.yellow)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>
                
                <div className={classNames(styles.order,styles.red)}>
                    <h5>#312</h5>
                    <h4>B03 - Eat in</h4>

                    <button className={styles.doneDish}>{"<<< Ready >>>"}</button>

                    <div className={styles.orderDetail}>
                            <div>
                                <p>(2) Hamberger 1 cheese</p>
                                <span>Vegetable</span>
                                <span>Phô mai bào</span>
                            </div>
                            <div>
                                <p>Cocacola không đường</p>
                            </div>
                            <div>
                                <p>(2) Pepsi vị chanh không calo</p>
                            </div>
                            <div>
                                <p>Gà rán không gà</p>
                                <span>Sốt nước mắm</span>
                            </div>
                    </div>

                    <h5 className={styles.time}>2:04</h5>
                    
                    <button className={styles.sothutu}>1</button>
                </div>

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
        </div>
    );
};

export default KitchenDashboard;