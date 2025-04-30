
import styles from "./QLNhanVien.module.css" 


import { useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"

export default function QLNhanVien() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")


    const [listData, setListData] = useState([
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
            { id: '4', tenNhanvien: 'Lê Hữu Thành Vinh', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
            { id: '5', tenNhanvien: 'Nguyễn Dương', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', gioitinh: 'nam', email: "jackethee@gmail.com",sdt:"0862915493"},
        ]);
    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã tài khoản' },
            { key: 'tenNhanvien', title: 'Tên nhân viên' },
            { key: 'gioitinh', title: 'Giới tính' },
            { key: 'email', email: 'Email'},
            { key: 'sdt', title: 'Số điện thoại'},
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
            <div className={styles.search}><Search placeHolder={"Tìm kiếm theo tên nhân viên..."}/> </div>

            <div className={styles.actions}>
                <button> + Thêm</button>
            </div>
                {actions}
            <div className={styles.select}>
                <button onClick={()=>setChoosedStateDish("all")} className={choosedStateDish === "all" ? styles.active : ""}>Tất cả</button>
                <button onClick={()=>setChoosedStateDish("used")} className={choosedStateDish === "used" ? styles.active : ""}>Hoạt động</button>
                <button onClick={()=>setChoosedStateDish("none")} className={choosedStateDish === "none" ? styles.active : ""}>Bị khóa</button>
            </div>


            <div className={styles.maincontent}> 
                <Table data={listData} columns={columns} actions={actions}/>
            </div>
        </div>
    )
}