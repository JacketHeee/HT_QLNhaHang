
import styles from "./PhanQuyen.module.css" 


import { useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"

export default function PhanQuyen() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")


    const [listData, setListData] = useState([
            { id: '1', role: 'admin'},
            { id: '2', role: 'Nhân viên tiếp thị'},
            { id: '3', role: 'Nhân viên bếp'}
        ]);
    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã quyền' },
            { key: 'role', title: 'Tên quyền' },
        ];
    
        // Định nghĩa hành động
        const actions = (row) => {
            return (
                <div className={styles.actionBottoms}>
                   <img src={edit} alt="edit" />
                   <img src={remove} alt="remove" />
                </div>
            );
        };

        // const actions = (row) => {
        //         if (row.status !== 'Chờ xác nhận') return null;
        //         return (
        //             <div className={styles.action}>
        //                 Xem chi tiết
        //             </div>
        //         );
        //     };

    return (
        <div className={styles.container}>
            <div className={styles.search}><Search placeHolder={"Tìm kiếm theo tên quyền..."}/> </div>

            <div className={styles.actions}>
                <button> + Thêm</button>
            </div>
                {actions}
            {/* <div className={styles.select}>
                <button onClick={()=>setChoosedStateDish("all")} className={choosedStateDish === "all" ? styles.active : ""}>Tất cả</button>
                <button onClick={()=>setChoosedStateDish("used")} className={choosedStateDish === "used" ? styles.active : ""}>Hoạt động</button>
                <button onClick={()=>setChoosedStateDish("none")} className={choosedStateDish === "none" ? styles.active : ""}>Bị khóa</button>
            </div> */}


            <div className={styles.maincontent}> 
                <Table data={listData} columns={columns} actions={actions}/>
            </div>
        </div>
    )
}