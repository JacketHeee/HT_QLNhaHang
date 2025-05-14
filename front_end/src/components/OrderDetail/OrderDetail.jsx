
import { useNavigate, useParams } from "react-router-dom";
import styles from "./OrderDetail.module.css"

import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format";
import Table from "../CustomTable/Table";
import CustomPopUp from "../CustomPopUp/CustomPopUp";

export default function OrderDetail(props) {
    const {orderId} = useParams() 
    const [listOP, setListOP] = useState([]); 
    const [displayListOP, setDisplayListOP] = useState([]);

    useEffect(()=>{
        setListOP(props.listOPForDetail)
        setDisplayListOP(getListObjForDisplay(props.listOPForDetail));
    }, [listOP])

    const orders =
    {
        id: props.orderDetail.orderId,
        table: props.orderDetail.tableId,
        time: props.orderDetail.time,
        // total: "chưa",
        // totalSideDishes: "chưa",
        // status: "Chưa thanh toán",
        // orderDetail: [
        //     {
        //         dish: "Hamberger",
        //         quantity: 3,
        //         price: 190000,
        //         sideDishes: "Phô mai, rau, cơm",
        //         totalSideDishes: 100000,
        //         totalProduct: 19000
        //     },
        //     {
        //         dish: "Hamberger",
        //         quantity: 3,
        //         price: 190000,
        //         sideDishes: "Phô mai, rau, cơm",
        //         totalSideDishes: 100000,
        //         totalProduct: 19000
        //     },
        //     {
        //         dish: "Hamberger",
        //         quantity: 3,
        //         price: 190000,
        //         sideDishes: "Phô mai, rau, cơm",
        //         totalSideDishes: 100000,
        //         totalProduct: 19000
        //     },
        //     {
        //         dish: "Hamberger",
        //         quantity: 3,
        //         price: 190000,
        //         sideDishes: "Phô mai, rau, cơm",
        //         totalSideDishes: 100000,
        //         totalProduct: 19000
        //     },
        // ]
    }

    const getGiaSideDish = (string, quantity) =>{
        let gia = 0;
        const arr = string.split(", ");
        const filtered = props.listSideDish.filter(item =>
            arr.includes(item.tenMonAnKem)
        );
        filtered.forEach((item) => {gia += +item.price})
        gia *= quantity;
        return(gia)
    }

    const getObjForDisplay = (obj) => ({
        dish: obj.product.tenMonAn,
        quantity: obj.quantity,
        price: obj.product.giaBan,
        sideDishes: obj.sideDishes,
        totalSideDishes: getGiaSideDish(obj.sideDishes, obj.quantity),
        totalProduct: obj.product.giaBan * obj.quantity + getGiaSideDish(obj.sideDishes, obj.quantity)
    })

    const getListObjForDisplay = (list) => {
        return list.map((item) => (getObjForDisplay(item)))
    }

    const tinhTongTienHoaDon = (listDisplay) => {
        let tongTien = 0;
        listDisplay.map((item) => {tongTien += item.totalProduct})
        return tongTien
    }

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
        <CustomPopUp onClose={props.onClose}> 
        <div className={styles.container}>
            <h3>Xác nhận đơn hàng</h3>
            <div className={styles.thongtinchung}>
                <div><h6>Mã đơn hàng:</h6> <span>{orders.id}</span></div>
                <div><h6>Số bàn:</h6> <span>B{orders.table}</span></div>
                <div><h6>Thời gian đặt:</h6> <span>{orders.time}</span></div>
                <div><h6>Hình thức thanh toán:</h6> <span>Online - đã thanh toán</span></div>
            </div>

                <div className={styles.chitiet}>
                    <Table data={displayListOP} columns={columns}/>
                    <h6>Tổng tiền: <span>{tinhTongTienHoaDon(displayListOP)}đ</span></h6>
                </div>

            
            <div className={styles.ghichu}>
                <h6>Ghi chú của khách hàng:</h6>
                <textarea rows="3" cols="40" placeholder="Ghi chú của khách hàng" disabled value={props.orderDetail.note}/>
            </div>
    
            <div className={styles.actions}>
                <button onClick={() => {
                    props.onAccept(props.orderDetail.orderId);
                    props.onClose();
                }}>Xác nhận</button>
                <button onClick={() => {props.onClose()}}>Hủy</button>
            </div>
            
        </div>
      </CustomPopUp>
    )
}