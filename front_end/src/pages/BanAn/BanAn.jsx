
import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import styles from "./BanAn.module.css"
import { formatCurrency } from "../../utils/format"

import table from "../../assets/icon/chair.svg"
import classNames from "classnames"
import { getTables } from "../../api/services/tableService"
import Timer from "../../components/Timer/Timer"
import { getOrders } from "../../api/services/orderService"
import { format } from "date-fns"
import FilterButton from "../../components/FilterButton/filterbutton"

export default function BanAn() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const [displayTables, setDisplayTables] = useState([]);
    const [displayStatusTable, setDisplayStatusTable] = useState([]);

    // const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const listStatus = [
        {
            id: "all",
            name: "Tất cả"
        },
        {
            id: true,
            name: "Còn trống"
        },
        {
            id: false,
            name: "Sử dụng"
        },
    ]

    const fetchData = async () => {
        try {
            const list = await getTables();
            setTables(list);
            // const listOrder = await getOrders();
            // setOrders(listOrder);
            setDisplayTables(list);
            setDisplayStatusTable(list);
            setStatusTable(list);//cài đặt trạng thái khi bàn đang chờ
        } catch (error) {
            throw new Error(error);
        }
        setLoading(false);
    }

    const setStatusTable = (tables) => {
        const updateTable = tables.map((tb) => {
            if(tb.listOD.length != 0 && tb.listOD.some((od) => (od.status === "Chờ xác nhận" || od.status === "Đã xác nhận"))){
                return{...tb, isEmpty: false}
            }
            else {
                return{...tb, isEmpty: true};
            }
        })
        setTables(updateTable);
        setDisplayTables(updateTable);
        setDisplayStatusTable(updateTable);
    }

    const getLongestTimeOD = (table) => {
        if(table.listOD.length === 0){
            return 0;
        }

        const listNotAcceptOD = table.listOD.filter((item) => (item.status === "Chờ xác nhận" || item.status === "Đã xác nhận"));

        if(listNotAcceptOD.length === 0){
            return 0;
        }

        const longestTimeOD = listNotAcceptOD.reduce((max, item) => {
            return new Date(item.createdAt) < new Date(max.createdAt) ? item : max
        })
        const time = new Date() - new Date(longestTimeOD.createdAt);
        const minute = Math.floor(time/60000);
        return minute;
    }

    ///Search
    const handleSearch = (keyword) => {
        if(keyword.trim() === ''){
            setDisplayTables(displayStatusTable);
        }
        else{
            const de = displayStatusTable.filter((em) => (
                em.name.toLowerCase().includes(keyword.toLowerCase())
            ))
            setDisplayTables(de);
        }
    }

    ///lọc
    const handleSelectedStatus = (id) => {
        if(tables){ // tránh trường hợp chưa load xong
            if(id === "all"){
                setDisplayStatusTable(tables);
                setDisplayTables(tables);
            }
            else if (id === true){
                const list = tables.filter((p) => {
                    if(p.isEmpty == true){
                        return p;
                    }
                })
                setDisplayStatusTable(list);
                setDisplayTables(list);
            }
            else{
                const list = tables.filter((p) => {
                    if(p.isEmpty == false){
                        return p;
                    }
                })
                setDisplayStatusTable(list);
                setDisplayTables(list);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}><Search placeHolder={"Tìm kiếm theo tên bàn..."} onSearch={(keyword) => handleSearch(keyword)}/> </div>

            <div className={styles.select}>
                {listStatus.map((index) => (
                    <FilterButton
                        id={index.id}
                        onSelect={() => {
                            handleSelectedStatus(index.id);
                            setChoosedStateDish(index.id);
                        }}
                        className={choosedStateDish === index.id ? styles.active : ""}
                    >
                        {index.name}
                    </FilterButton>
                ))}
                {/* <button onClick={()=>setChoosedStateDish("all")} className={choosedStateDish === "all" ? styles.active : ""}>Tất cả</button>
                <button onClick={()=>setChoosedStateDish("used")} className={choosedStateDish === "used" ? styles.active : ""}>Sử dụng</button>
                <button onClick={()=>setChoosedStateDish("none")} className={choosedStateDish === "none" ? styles.active : ""}>Còn trống</button> */}
            </div>

            <div className={styles.maincontent}> 
                {loading ? <div>Đang load dữ liệu...</div>: 
                    displayTables.map((tb) => (
                        <div className={tb.isEmpty ? classNames(styles.table) : classNames(styles.table, styles.active)}>
                            <h5>{tb.name}</h5>
                            <div className={styles.infor}>
                                <div>
                                    <span>{tb.isEmpty ? null : <Timer time={getLongestTimeOD(tb)}/>}</span>
                                    {tb.isEmpty ? null : <h5>tb.order.totalPrice</h5>}
                                </div>
                                <img src={table} alt="" />
                            </div>
                        </div>
                    ))  
                }

                {/* <div className={classNames(styles.table)}>
                    <h5>Bàn 1</h5>
                    <div className={styles.infor}>
                        <div>
                            <span></span>
                            <h5></h5>
                        </div>
                        <img src={table} alt="" />
                    </div>
                </div>
                <div className={classNames(styles.table)}>
                    <h5>Bàn 1</h5>
                    <div className={styles.infor}>
                        <div>
                            <span></span>
                            <h5></h5>
                        </div>
                        <img src={table} alt="" />
                    </div>
                </div> */}

            </div>
        </div>
    )
}