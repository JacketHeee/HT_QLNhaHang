import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';
import Search from '../../components/Search/Search';
import Table from '../../components/CustomTable/Table';
import { accept, getOrder, getOrders } from '../../api/services/orderService';
import { format } from 'date-fns';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import { getorderproducts } from '../../api/services/orderProductService';
import Loading from "../../components/Loading/Loading"
import { getSideDish } from '../../api/services/sideDish';


const OrderConfirmation = () => {
    // const nav = useNavigate();

    const [detail, setDetail] = useState(false);
    const [listOPStatus, setListOPStatus] = useState(false);

    const [orderDetail, setOrderDetail] = useState(null);
    const [listOPForDetail, setListOPForDetail] = useState(null);

    const [loadUpdate, setLoadUpdate] = useState(false);

    const [data, setData] = useState([]) //lấy dữ liệu raw
    const [orders, setOrders] = useState([]);     // Dữ liệu từ API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null);  // Lỗi nếu có
    const [listOP, setListOP] = useState([]);
    const [listSideDish, setListSideDish] = useState([]);
    const [listSideDishForDetail, setListSideDishForDetail] = useState([]);

    const [ordersDisplay, setOrdersDisplay] = useState([]);
    // const [orders, setOrders] = useState([
    //     { id: '1', table: 'Bàn 1', time: '2025-04-28 10:30', total: 150000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    //     { id: '2', table: 'Bàn 2', time: '2025-04-28 10:35', total: 200000, status: 'Chờ xác nhận'},
    // ]);

    const formatDatetoDateString = (isoDate) => {
        const formatted = format(new Date(isoDate), 'HH:mm:ss dd/MM/yyyy');
        return formatted
    }

    // Định nghĩa cột
    const columns = [
        { key: 'id', title: 'Mã đơn hàng' },
        { key: 'table', title: 'Bàn' },
        { key: 'time', title: 'Thời gian' , render: row => `${formatDatetoDateString(row.time)}`},
        { key: 'total', title: 'Tổng tiền', render: row => `${row.total.toLocaleString()} VND` },
        { key: 'status', title: 'Trạng thái' }
    ];

    const createObjForDisplay = (rawObj) => (
        {
            id: rawObj.id, 
            table: rawObj.table.name, 
            time: rawObj.createdAt, 
            total: rawObj.totalPrice, 
            status: rawObj.status
        }
    )

    const createListObjForDisplay = (list) => (
        list.map((item) => (createObjForDisplay(item)))
    )

    // Định nghĩa hành động
    const actions = (row) => {
        if (row.status !== 'Chờ xác nhận') return null;
        return (
            <div className={styles.actions} onClick={() =>{ 
                setDataForDetail(row);
                // printListOPforDetail(row)
            }}>
                Xem chi tiết
            </div>
        );
    };


    //lay du tlieu tu api 



    useEffect(() => {
        fetchOrders();
    }, []); 


    const fetchOrders = async () => {
        try {
            const rs = await getOrders();
            setData(rs);
            const listForDisplay = createListObjForDisplay(rs);
            setOrders(listForDisplay);
            setOrdersDisplay(listForDisplay);
            const list = await getorderproducts();
            setListOP(list);
            const listSD = await getSideDish();
            setListSideDish(listSD);
        } catch (error) {
            setError(error);
            throw new Error(error);
        }
        setLoading(false);
    }

    // get 

        // const fetchListOP = async (orderId) => {
        //     try {
        //         const rs = await getListOPByOrderId(orderId);
        //         setListOP(rs);
        //         setDisplayListOP(getListObjForDisplay(rs));
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        //     finally{
        //         setLoad(false);
        //     }
        // }

    const getListOPForDetail = (id) =>(
        listOP.filter((item) => (item.orderId === id))
    )

    // const getListSideDishForDetail = (arrSideDishID) => { // [1, 2, 3, 4]
    //     console.log(arrSideDishID);
    // }

    const handleSearch = (keyword) => {
        if(keyword.trim() === ''){
            setOrdersDisplay(orders);
        }
        else{
            console.log(orders);
            const de = orders.filter((em) => (
                em.id.toString().toLowerCase().includes(keyword.toLowerCase())
            ))
            setOrdersDisplay(de);
        }
    }

    const getOrderByID = (id) => (
        data.find((item) => (
            item.id === id
        ))
    )

    const getDataForDetail = (row) => {
        const idOrders = row.id;
        const order = getOrderByID(idOrders);
        const objForDetail = {
            orderId: order.id, 
            tableId: order.table.id,
            time: formatDatetoDateString(order.createdAt),
            payment: "Gửi từ khách hàng",
            note: order.note
        }
        return (objForDetail)
    }

    const setDataForDetail = (row) => {
        const rs = getDataForDetail(row);
        const list = getListOPForDetail(row.id)
        setListOPForDetail(list);
        setOrderDetail(rs);
    }

    useEffect(() => {
        if(orderDetail){
            setDetail(true);
        }
    },[orderDetail])

    useEffect(() => {
        if(listOPForDetail){
            setListOPStatus(true);
        }
    },[listOPForDetail])

    const handleAccept = async (orderId) => {
        setLoadUpdate(true);
        await accept(orderId);
        const obj = await getOrder(orderId);
        setData(prev => prev.map(item => item.id === orderId ? obj : item));
        const objectForDisplay = createObjForDisplay(obj);
        setOrders(prev => prev.map(item => item.id === orderId ? objectForDisplay : item));
        setOrdersDisplay(prev => prev.map(item => item.id === orderId ? objectForDisplay : item));
        setLoadUpdate(false);
    }


    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Danh sách đơn hàng</h3>
            <div className={styles.search_select}>
                <Search onSearch={(keyword) => {handleSearch(keyword)}} placeHolder={"Tìm kiếm theo mã đơn..."}/>
                {/* <select name="" id="">
                    <option value="">Bún bò</option>
                    <option value="">Gà sợi phở</option>
                    <option value="">Pín heo</option>
                    <option value="">Bò ba bể</option>
                </select> */}
            </div>
            {loading ? <div>Đang load dữ liệu...</div> :
                <Table columns={columns} data={ordersDisplay} actions={actions}/>
            }

            {detail && listOPStatus ? 
                <OrderDetail
                    onClose={() => {setDetail(false)}}
                    orderDetail = {orderDetail}
                    listOPForDetail = {listOPForDetail}
                    onAccept = {(orderId) => handleAccept(orderId)}
                >
                </OrderDetail> : 
                null
            }

            {loadUpdate ? <Loading></Loading>:null}
            
            <Outlet/>
        </div>
    );
};

export default OrderConfirmation;




// Hàm gọi API lấy dữ liệu
// async function getData() {
//     try {
//         const response = await fetch('https://ht-qlnhahang.onrender.com/products'); // Thay bằng URL thật của bạn
//         const data = await response.json(); // Chuyển response thành đối tượng JSON

//         // Hiển thị dữ liệu ra console
//         console.log(data);

//         // Duyệt qua từng món ăn và in ra thông tin
//         data.forEach(monan => {
//             console.log(`Tên món: ${monan.ID}`);
//             console.log(`Mô tả: ${monan.tenMonAn}`);
//             console.log(`Giá bán: ${monan.moTa} VND`);
//             console.log(`Hình ảnh: ${monan.tenHinhAnh}`);
//             console.log('------------------');
//         });

//     } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu:', error);
//     }
// }

// Gọi hàm
