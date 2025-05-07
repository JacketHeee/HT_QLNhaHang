
import styles from "./QLTaiKhoan.module.css" 


import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import table from "../../assets/icon/chair.svg"
import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"
import { addAccounts, deleteAccount, getAccounts, lockAccount, unLockAccount, updateAccount } from "../../api/services/accountService"
import { getAllEmployeeNotHaveAccount, getEmployees } from "../../api/services/employeeService"
import { getRoles } from "../../api/services/roleService"
import Loading from "../../components/Loading/Loading";
import AddAccount from "../../components/AccountForm/AddAccount"
import FilterButton from "../../components/FilterButton/filterbutton"


export default function QLTaiKhoan() {
    const [choosedStateDish, setChoosedStateDish] = useState("all")

    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);

    const [accountUpdate, setAccountUpdate] = useState(null);

    //lấy data
    const [data, setData] = useState([]);

    const [accounts, setAccounts] = useState([]);

    //cho khi load từ bảng lên
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);

    //cho khi cập thêm, sửa, xoas
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [status, setStatus] = useState([]);//cho lọc

    const [displayAccounts, setDisplayAccounts] = useState([]);

    //Lấy list khóa ngoại
    const [listEm, setListEm] = useState([]);// em ko có tk
    const [listRole, setListRole] = useState([]);

    const [listAllEm, setLisAllEm] = useState([]); //tất cả em

    const listStatus = [
        {
            id: "all",
            name: "Tất cả"
        },
        {
            id: true,
            name: "Hoạt động"
        },
        {
            id: false,
            name: "Bị khóa"
        },
    ]


    // const [listData, setListData] = useState([]);
    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã tài khoản' },
            { key: 'name', title: 'Tên tài khoản' },
            { key: 'role', title: 'Quyền hạn' },
            { key: 'state', title: 'Trạng thái'},
        ];
    
        // Định nghĩa hành động
        const actions = (row) => { // có thông tin hàng đã chọn
            return (
                <div className={styles.actionBottoms}>
                    <img 
                        src={edit} 
                        alt="edit" 
                        onClick = {() => {
                            editAccount(row);
                        }}
                    />
                    <img
                        src={remove} 
                        alt="remove"
                        onClick = {() => removeAccount(row)}
                    />
                </div>
            );
        };

        // const getEIDByName = (eName) => {
        //     const found = listAllEm.find((em) => em.name === eName);
        //     return found ? found.id : null; 
        // };
    
        // const getRIDByName = (rName) => {
        //     const found = listRole.find((r) => r.name === rName);
        //     return found ? found.id : null; 
        // };
        ////////////////////////////////Format
        const getObjectByID = (id) => {//cho setOlddata
            return accounts.find((item) => 
                item.id == id
            )
        }


        const getDisplayObj= (account) => (
            {
                id: account.id,
                name: account.username,
                role: account.role.name,
                employee: account.employee.name,
                isActive: account.isActive,
                state: account.isActive === true ? "Đang hoạt động" : "Đang bị khóa",
            }
        )

        const createObject = (id, usrname, emName, roleName, isActive) => (// tạo object cho UPDATE xaif
            {
                "id": id,
                "username": usrname,
                "EName": emName,
                "RName": roleName,
                "isActive": isActive
            }
        )

        const getArrDisplay= (arr) => (
            arr.map((item) => getDisplayObj(item))
        )

        // const formatforUpdate = (EName, RName, username) => {
        //     console.log(listRole);
        //     console.log(EName);
        //     console.log(RName);
        //     return{
        //     "employeeId": getEIDByName(EName),
        //     "roleId": getRIDByName(RName),
        //     "username": username
        //     }

        // }
        ///////////////////////////////Format

        // const actions = (row) => {
        //         if (row.status !== 'Chờ xác nhận') return null;
        //         return (
        //             <div className={styles.action}>
        //                 Xem chi tiết
        //             </div>
        //         );
        //     };



        
       //////////////////// 
    
    ////// useEffect gọi khi mount
    useEffect(() => {
        fetchAccounts()
    }, [])

    const fetchAccounts = async () => {
        try {
            const data = await getAccounts();
            setData(data);
            // console.log(data);
            const listAccount = getArrDisplay(data);
            setAccounts(listAccount);
            setDisplayAccounts(listAccount);
            //////Lấy list khóa ngoại
            const listE = await getAllEmployeeNotHaveAccount();
            const listR = await getRoles();
            //////set list khóa ngoại
            setListEm(listE);
            setListRole(listR);
            //Lấy, setlistem
            const ListEm = await getEmployees();
            setLisAllEm(ListEm);
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        } finally {
            setLoad(false)
        }
    }

    ///search
    const handleSearch = (keyword) => {
        if(keyword.trim() === ''){
            setDisplayAccounts(accounts);
        }
        else{
            const de = accounts.filter((em) => (
                em.name.toLowerCase().includes(keyword.toLowerCase())
            ))
            setDisplayAccounts(de);
        }
    }

    ///lọc
    const handleSelectedStatus = (id) => {
        if(accounts){ // tránh trường hợp chưa load xong
            if(id === "all"){
                setStatus(accounts);
                setDisplayAccounts(accounts);
            }
            else{
                const list = accounts.filter((p) => {
                    if(p.isActive == id){
                        return p;
                    }
                })
                setStatus(list);
                setDisplayAccounts(list);
            }
        }
    }


    ///CRUD
    const createAcc = async (acc) => {
        setLoadUpdate(true);
        console.log(acc);
        const newAccount = await addAccounts(acc);//cho thêm xuống db
        const newAccDisplay = getDisplayObj(newAccount);//cho hiển thị
        setAccounts(prev => [...prev, newAccDisplay]);
        setDisplayAccounts(prev => [...prev, newAccDisplay]);
        setLoadUpdate(false);
    }


    const updateAcc = async (id, acc) => {
        setLoadUpdate(true);
        const newAccount = await updateAccount(id, acc);
        const newAccountDisplay = getDisplayObj(newAccount);
        setAccounts(prev => prev.map((p) => p.id === id ? newAccountDisplay : p));
        setDisplayAccounts(prev => prev.map((p) => p.id === id ? newAccountDisplay : p));
        setLoadUpdate(false);
    }

    ///update
    const setOldDataUpdate = async (obj) => {
        const account = createObject(obj.id, obj.name, obj.employee, obj.role, obj.isActive);
        setAccountUpdate(account);
    }

    const editAccount = (row) => {
        const acc = getObjectByID(row.id);
        console.log(acc)
        setOldDataUpdate(acc);
    }

    //đợi employee cũ cập nhật xong
    useEffect(() => {
        if (!accountUpdate) return
        setUpdate(true);
    }, [accountUpdate])
    
    const removeAccount = async (obj) => {
        setLoadUpdate(true)
        await deleteAccount(obj.id);
        setAccounts(prev => prev.filter((p) => (p.id != obj.id)));
        setDisplayAccounts(prev => prev.filter((p) => (p.id != obj.id)));
        setLoadUpdate(false)
    }

    const lockAcc = async (id) => {
        await lockAccount(id);
        setAccounts(prev => prev.map((p) => 
            p.id === id ? { ...p, isActive: false, state: "Đang bị khóa" } : p
        ));
        setDisplayAccounts(prev => prev.map((p) => 
            p.id === id ? { ...p, isActive: false, state: "Đang bị khóa" } : p
        ));
    }

    const unLockAcc = async (id) => {
        await unLockAccount(id);
        setAccounts(prev => prev.map((p) => 
            p.id === id ? { ...p, isActive: true, state: "Đang hoạt động" } : p
        ));
        setDisplayAccounts(prev => prev.map((p) => 
            p.id === id ? { ...p, isActive: true, state: "Đang hoạt động" } : p
        ));
    }


    return (
        <div className={styles.container}>
            <div className={styles.search}><Search 
                    placeHolder={"Tìm kiếm theo tên tài khoản..."}
                    onSearch={(keyword) => {handleSearch(keyword)}}
                /> </div>

            <div className={styles.actions}>
                <button
                    onClick ={() => {setCreate(true)}}
                > + Thêm</button>    
            </div>
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
            </div>

            {load ? <div>Đang load dữ liệu</div> :
            <div className={styles.maincontent}> 
                <Table data={displayAccounts} columns={columns} actions={actions}/>
            </div>
            }

            {/* load cho create */}
            {loadUpdate ? <Loading></Loading> : null}
            {/* /////////////////loading///////////////// */}

            {/* Nhận vào listEm, listRole */}
            {create ? <AddAccount  
                onCreate={(account) => { createAcc(account) }} //cho thêm
                onClose={() => { setCreate(false) }}
                listEm = {listEm}
                listRole = {listRole}
            ></AddAccount> : null
            } {/*action mở popup thêm nhân viên*/}            

            {update ? <AddAccount
                onCreate={(id, account) => { updateAcc(id, account) }} //cho sửa
                onClose={() => { setUpdate(false) }}
                listEm = {listEm}
                listRole = {listRole}
                isUpdate={true}
                updateAccount={accountUpdate}
                initialData={accountUpdate}
                onLock={(id) => lockAcc(id)}
                onUnLock={(id) => unLockAcc(id)}
            ></AddAccount> : null
            }
        </div>
    )
}