import { useEffect, useState } from "react";
import CustomPopUpCreate from "../CustomPopUpCreate/CustomPopUpCreate"
import styles from "./AddRole.module.css"
import { isExisted } from "../../api/services/roleService";
import { updateAccount } from "../../api/services/accountService";

export default function AddRole(props) {
    const listFunction = ["Món ăn", "Bàn ăn", "Đơn hàng", "Bảng điều khiển bếp", "Quản lý nhân viên", "Quản lý tài khoản", "Phân quyền"]
    const listObjFunction = [
        {id:1, name:"Món ăn"},
        {id:2, name:"Bàn ăn"},
        {id:3, name:"Đơn hàng"},
        {id:4, name:"Bảng điều khiển bếp"},
        {id:5, name:"Quản lý nhân viên"},
        {id:6, name:"Quản lý tài khoản"},
        {id:7, name:"Phân quyền"}
    ]

    const [roleName, setRoleName] = useState('');
    const [error, setError] = useState('');
    const [updateRole, setUpdateRole] = useState(null);

    const initialCheckedState = listFunction.reduce((acc, curr) => {    //trả kiểu object {"Món Ăn": false ....}
        acc[curr] = false;
        return acc;
    }, {});

    const [checkedItems, setCheckedItems] = useState(initialCheckedState);

    const handleChange = () => {
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // chặn reload
        if(roleName.trim() === ''){
            setError("Tên không được để trống")
            return;
        }
        if(await isExisted(roleName)){
            setError("Tên đã tồn tại")
            return;
        }
        const allUnchecked = Object.values(checkedItems).every(value => value === false); // kiểm tra nếu tất cả các checkbox đều false
        if (allUnchecked) {
            setError("Phải chọn ít nhất một chức năng");
            return;
        }
        const selectedIndexes = listFunction
        .map((key, index) => (checkedItems[key] ? index + 1 : null))
        .filter((val) => val !== null);
        props.onSubmit(roleName, selectedIndexes);
        props.onClose();
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault(); // chặn reload
        if(roleName.trim() === ''){
            setError("Tên không được để trống")
            return;
        }
        console.log(roleName)
        console.log(updateRole.name)
        if(updateRole.name !== roleName){
            if(await isExisted(roleName)){// có thay đổi thì mới validate
                setError("Tên đã tồn tại")
                return;
            }
        }
        const allUnchecked = Object.values(checkedItems).every(value => value === false); // kiểm tra nếu tất cả các checkbox đều false
        if (allUnchecked) {
            setError("Phải chọn ít nhất một chức năng");
            return;
        }
        const selectedIndexes = listFunction
        .map((key, index) => (checkedItems[key] ? index + 1 : null))
        .filter((val) => val !== null);
        props.onSubmit(updateRole.id, roleName, selectedIndexes);
        props.onClose();
    }

    useEffect(() => {   
        if (props.updateRole) {
            setUpdateRole(props.updateRole)
            setOldData(props.updateRole)
        }
    }, [props.updateRole]);

    const setOldData = (obj) => {
        setRoleName(obj.name);

        const listFeature = obj.listFR.map((item) => (item.featureId));
        const listFeatureObj = listObjFunction.filter((item) => {
            return listFeature.includes(item.id)
        })

        const newChecked = {};
        listFeatureObj.forEach((item) => {
            newChecked[item.name] = true;   //tạo obj set các thuộc tính có trong mảng truyền
        })

        setCheckedItems({
            ...checkedItems,
            ...newChecked
        })
    }

    const formCreate = () => (
        <div className={styles.container}>
            <form className={styles.infor} onSubmit = {(e) => {props.isUpdate ? handleSubmitUpdate(e) : handleSubmit(e)}}>
                {props.isUpdate ?<h5>Sửa phân quyền</h5> : <h5>Thêm phân quyền</h5>}
                <div className={styles.inputField}>
                    <h6>Tên nhóm quyền:</h6>
                    <input type="text" value={roleName} onChange={(e) => {
                        setRoleName(e.currentTarget.value);
                        handleChange();
                    }}/>
                </div>
                {error ? <p style={{ color: 'red' }}>{error}</p> : null}

                {listFunction.map((item) => (
                    <div className={styles.checkboxs}>
                        <h6>{item}: </h6>
                        <input
                            type="checkbox"
                            checked={checkedItems[item] || false} //set trạng thái theo mảng checkedItems
                            onChange = {(e) => {
                                setCheckedItems({
                                    ...checkedItems,
                                    [item]: e.target.checked,
                                });
                            }}
                        />
                    </div>
                ))}
                <button>Thêm</button>
            </form>
        </div>
    )

    return (
        <CustomPopUpCreate onClose={props.onClose}>
            {formCreate()}
        </CustomPopUpCreate>
    )
}