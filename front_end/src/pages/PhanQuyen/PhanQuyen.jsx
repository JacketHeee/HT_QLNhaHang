
import styles from "./PhanQuyen.module.css" 


import { useEffect, useState } from "react"
import Search from "../../components/Search/Search"
import { formatCurrency } from "../../utils/format"

import classNames from "classnames"
import Table from "../../components/CustomTable/Table"

import remove from "../../assets/icon/remove.svg"
import edit from "../../assets/icon/edit.svg"
import { addRole, deleteRole, editRole, getRole, getRoles } from "../../api/services/roleService"
import AddRole from "../../components/RoleForm/AddRole"
import Loading from "../../components/Loading/Loading"
import { editFeatureForRole } from "../../api/services/features_rolesService"

export default function PhanQuyen() {

    const [create, setCreate] = useState(false);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);

    const [roles, setRoles] = useState([]); //lấy dữ liệu nguyên bản = listFeatures
    const [rolesDisplay, setRolesDisplay] = useState([]); //cài đặt dữ liệu hiển thị

    const [filterRoles, setFilterRoles] = useState([]);
    //cho khi cập thêm, sửa, xoas
    const [loadUpdate, setLoadUpdate] = useState(false);

    const[updateRole, setUpdateRole] = useState(null);//cho update


    const createObject = (id, roleName, listFeature) => {// truyền vào ListFR thô nha
        const listFeatureIds = listFeature.map((item) => (item.id));
        const listFeatureIdsString = JSON.stringify(listFeatureIds);
        return({
            id: id,
            name: roleName,
            listFeatureIds: listFeatureIdsString
        })
    }

    //////load dữ liệu khi mount
    useEffect(() =>{
        fetchRole();
    }, [])

    const autoSetData = (data) => {
        const listObj = data.map((item) => {
            const obj = createObject(item.id, item.name, item.listFR)
            return obj;
        })
        setRoles(listObj);
        setRolesDisplay(listObj);
        setFilterRoles(listObj);
    }


    const fetchRole = async () =>{
        try {
            const data = await getRoles(); //Lấy mảng dữ liệu thô
            autoSetData(data)//set dữ liệu thô + hiển thị
        } catch (error) {
            setError('Load dữ liệu thất bại!');
            console.error(error);
        }finally{
            setLoad(false)
        }
    }


    const [listData, setListData] = useState([
            { id: '1', role: 'admin'},
            { id: '2', role: 'Nhân viên tiếp thị'},
            { id: '3', role: 'Nhân viên bếp'}
        ]);
    
        // Định nghĩa cột
        const columns = [
            { key: 'id', title: 'Mã quyền' },
            { key: 'name', title: 'Tên quyền' },
        ];
    
        // Định nghĩa hành động
        const actions = (row) => {
            return (
                <div className={styles.actionBottoms}>
                   <img src={edit} alt="edit" onClick = {() => setOldDataUpdate(row)}/>
                   <img src={remove} alt="remove" onClick = {() => removeRole(row)}/>
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

    // const printobj = (roleName, listc) => {
    //     console.log(listc);
    //     console.log(roleName);
    // }

    const createRole = async (roleName, listc) => {
        setLoadUpdate(true);
        const obj = {name: roleName}
        const newRole = await addRole(obj, listc);
        console.log(newRole);
        const displayobj = createObject(newRole.id, newRole.name, newRole.listFR);
        setRoles(prev => [...prev, displayobj]);
        setRolesDisplay(prev => [...prev, displayobj]);
        setLoadUpdate(false);
    }

    const setOldDataUpdate = async (row) => {
        setLoadUpdate(true);
        const object = await getRole(row.id);
        console.log(object);
        setUpdateRole(object);//qua useEffect
        setUpdate(true);
    }

    useEffect(() =>{
        if(!updateRole) return
        setLoadUpdate(false)
    },[updateRole])

    const handleUpdate = async (id, roleName, listc) => {
        setLoadUpdate(true);
        const obj = {name: roleName};
        const newRole = await editRole(id, obj);
        await editFeatureForRole(id, listc);
        const roleobj = createObject(newRole.id, newRole.name, newRole.listFR);


        setRoles(prev => prev.map((p) => p.id === id ? roleobj : p));
        setRolesDisplay(prev => prev.map((p) => p.id === id ? roleobj : p));
        
        setLoadUpdate(false);
    }

    const removeRole = async (obj) => {
        setLoadUpdate(true)
        await deleteRole(obj.id);        
        setRoles(prev => prev.filter((p) => (p.id != obj.id)));
        setRolesDisplay(prev => prev.filter((p) => (p.id != obj.id)));
        setLoadUpdate(false)
    }

    const handleSearch = (keyword) => {
        if(keyword.trim() === ''){
            setRolesDisplay(roles);
        }
        else{
            const de = roles.filter((em) => (
                em.name.toLowerCase().includes(keyword.toLowerCase())
            ))
            setRolesDisplay(de);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.search}><Search 
            placeHolder={"Tìm kiếm theo tên quyền..."}
            onSearch={(keyword) => {handleSearch(keyword)}}
            /> </div>

            <div className={styles.actions}>
                <button
                    onClick={() => setCreate(true)}
                > + Thêm</button>
            </div>

            {load ? <div>Đang tải dữ liệu...</div>:
                <div className={styles.maincontent}>
                    <Table data={rolesDisplay} columns={columns} actions={actions} />
                </div>
            }

            {create ? <AddRole
                onClose={() => setCreate(false)}
                onSubmit={(roleName, listc) => createRole(roleName, listc)}
            ></AddRole> : null}

            {update ? <AddRole
                onClose={() => setUpdate(false)}
                onSubmit={(id, roleName, listc) => handleUpdate(id, roleName, listc)}
                isUpdate={true}
                updateRole={updateRole}
            ></AddRole> : null}

            {/* load cho create */}
            {loadUpdate ? <Loading></Loading> : null}
        </div>
    )
}