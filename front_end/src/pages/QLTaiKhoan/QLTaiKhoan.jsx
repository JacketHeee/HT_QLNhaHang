
import styles from "./QLTaiKhoan.module.css" 


import { useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import table from "../../assets/icon/chair.svg"
import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"

export default function QLTaiKhoan() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")


    const [listData, setListData] = useState([
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '1', tenNhanvien: 'Nguyễn Hùng Mạnh', role: 'admin', state: "Hoạt động"},
            { id: '2', tenNhanvien: 'Nguyễn Ngọc Thiên Ân', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '3', tenNhanvien: 'Lê Hoàng Sơn', role: 'Tiếp tân', state: "Hoạt động"},
            { id: '4', tenNhanvien: 'Nguyễn Dương', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '5', tenNhanvien: 'Lê Hữu Thành Vinh', role: 'Nhân viên bếp', state: "Hoạt động"},
            { id: '6', tenNhanvien: 'Lê Quang Hoàng', role: 'Tiếp tân', state: "Hoạt động"},
        ]);
    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã tài khoản' },
            { key: 'tenNhanvien', title: 'Tên nhân viên' },
            { key: 'role', title: 'Quyền hạn' },
            { key: 'state', title: 'Trạng thái'},
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