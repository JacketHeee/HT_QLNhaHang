
import styles from "./QLNhanVien.module.css" 


import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from "../../api/services/employeeService"
import AddEmployee from "../../components/AddEmployee/AddEmployee"
import Loading from "../../components/Loading/Loading";
import AcceptForm from "../../components/AcceptForm/AcceptForm"
import SuccessToast from "../../components/Notification/Notification"


export default function QLNhanVien() {
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);

    const [employeeUpdate, setEmployeeUpdate] = useState(null);


    const [employees, setEmployees] = useState([]);

    //cho khi load từ bảng lên
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);

    //cho khi cập thêm, sửa, xoas
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [displayEmployees, setDisplayEmployees] = useState([]);

    const [accDelete, setAccDelete] = useState(false);

    const [rowForDelete, setRowForDelete] = useState(null);

    const [createSuccess, setCreateSuccess] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã nhân viên' },
            { key: 'name', title: 'Tên nhân viên' },
            { key: 'gioiTinh', title: 'Giới tính' },
            { key: 'soDT', title: 'Số điện thoại'},
        ];
    
        // Định nghĩa hành động
        const actions = (row) => { // có thông tin hàng đã chọn
            return (
                <div className={styles.actionBottoms}>
                    <img 
                        src={edit} 
                        alt="edit" 
                        onClick = {() => setOldDataUpdate(row)}
                    />
                    <img
                        src={remove} 
                        alt="remove"
                        // onClick = {() => removeEmployee(row)}
                        onClick = {() => {setAccDelete(true); setRowForDelete(row)}}
                    />
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

    const createObject = (id, ten, gt, sdt) => (
        {
            "id": id,
            "name" : ten,
            "gioiTinh" : gt,
            "soDT" : sdt 
        }
    )

    //////////////////// 

    ////// useEffect gọi khi mount
    useEffect(() =>{
        fetchEmployees()
    },[])

    const fetchEmployees = async () =>{
        try {
            const data = await getEmployees();
            // console.log(data);
            setEmployees(data);
            setDisplayEmployees(data);
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        }finally{
            setLoad(false)
        }
    }


    ///Search
    const handleSearch = (keyword) => {
        if(keyword.trim() === ''){
            setDisplayEmployees(employees);
        }
        else{
            const de = employees.filter((em) => (
                em.name.toLowerCase().includes(keyword.toLowerCase())
            ))
            setDisplayEmployees(de);
        }
    }


    ///// CRUD
    const createE = async (nhanVien) => {
        setLoadUpdate(true);
        const newEmployee = await addEmployee(nhanVien);
        setEmployees(prev => [...prev, newEmployee]);
        setDisplayEmployees(prev => [...prev, newEmployee]);
        setLoadUpdate(false);

        setCreateSuccess(true);
        setTimeout(() => {
            setCreateSuccess(false);
        }, 1000);
    }

    const updateE = async (id, nhanVien) => {
        setLoadUpdate(true);
        const newEmployee = await updateEmployee(id, nhanVien);
        setEmployees(prev => prev.map((p) => p.id === id ? newEmployee : p));
        setDisplayEmployees(prev => prev.map((p) => p.id === id ? newEmployee : p));
        setLoadUpdate(false);

        setUpdateSuccess(true);
        setTimeout(() => {
            setUpdateSuccess(false);
        }, 1000);
    }


    ///update
    const setOldDataUpdate = async (obj) => {
        const nhanVien = createObject(obj.id, obj.name, obj.gioiTinh, obj.soDT);
        setEmployeeUpdate(nhanVien);
    }

    //remove
    const removeEmployee = async (obj) => {
        setLoadUpdate(true)
        await deleteEmployee(obj.id);
        setEmployees(prev => prev.filter((p) => (p.id != obj.id)));
        setDisplayEmployees(prev => prev.filter((p) => (p.id != obj.id)));
        setLoadUpdate(false)

        setDeleteSuccess(true);
        setTimeout(() => {
            setDeleteSuccess(false);
        }, 1000);
    }
    //đợi employee cũ cập nhật xong
    useEffect(() => {
        if(!employeeUpdate) return
        setUpdate(true);
    } , [employeeUpdate])

    //////////////////// 

    return (
        <div className={styles.container}>
            {/* thanh tìm kiếm */}
            <div className={styles.search}><Search 
                placeHolder={"Tìm kiếm theo tên nhân viên..."}
                onSearch={(keyword) => {handleSearch(keyword)}}
                /> </div>
            {/* nút thêm */}
            <div className={styles.actions}>
                <button onClick ={() => {setCreate(true)}}> + Thêm</button>
            </div>

            {/* /////////////////loading///////////////// */}
            {load ? <div>Đang load dữ liệu</div> : 
                <div className={styles.maincontent}> 
                    <Table data={displayEmployees} columns={columns} actions={actions}/>
                </div>
            }

            {/* load cho create */}
            {loadUpdate ? <Loading></Loading> : null}
            {/* /////////////////loading///////////////// */}

            {create ? <AddEmployee 
                onCreate={(nhanVien) => {createE(nhanVien)}} //cho thêm
                onClose={() => {setCreate(false)}}
            ></AddEmployee> : null
            } {/*action mở popup thêm nhân viên*/}

            {update ? <AddEmployee 
                onCreate={(id, nhanVien) => {updateE(id, nhanVien)}} //cho sửa
                onClose={() => {setUpdate(false)}}
                isUpdate={true}
                updateEmployee={employeeUpdate}
            ></AddEmployee> : null
            }

            {accDelete ? <AcceptForm
                onClose={() => setAccDelete(false)}
                onAccept={() => removeEmployee(rowForDelete)}
            ></AcceptForm> : null}

            {deleteSuccess? <SuccessToast message="Xóa thành công!"></SuccessToast> : null}
            {createSuccess? <SuccessToast message="Thêm thành công!"></SuccessToast> : null}
            {updateSuccess? <SuccessToast message="Sửa thành công!"></SuccessToast> : null}
        </div>
    )
}