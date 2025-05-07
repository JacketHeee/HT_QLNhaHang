import { useEffect, useState } from "react";
import CustomPopUpCreate from "../CustomPopUpCreate/CustomPopUpCreate"
import styles from "./AddAccount.module.css"
import { useForm } from 'react-hook-form';
import InputField from "../InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../Validate/AccountSchema/AccountSchema";
import Combobox from "../Combobox/Combobox";
import Loading from "../Loading/Loading";


export default function AddAccount(props) {// listEm, listRole

    const [active, setActive] = useState(props.updateAccount.isActive)
    const [load, setLoad] = useState(false);
    const listEm = props.listEm;
    const listRole = props.listRole;

    const listEmName = listEm.map((em) => (em.name));
    const listRoleName = listRole.map((role) => (role.name));

    const initialData = props.initialData;

    const getEIDByName = (eName) => {
        const found = listEm.find((em) => em.name === eName);
        return found ? found.id : null; 
    };

    const getRIDByName = (rName) => {
        const found = listRole.find((r) => r.name === rName);
        return found ? found.id : null; 
    };

    const createObject = (usrname, passwd, emId, roleId) => (
        {
            "username": usrname,
            "password": passwd,
            "employeeId": +emId,
            "roleId": +roleId,
        }
    )

    const createObjectForUpdate = (usrname, emId, roleId) =>({
        "username": usrname,
        "employeeId": +emId,
        "roleId": +roleId,
    })

    const inputItems = [
        {
            id: "username",
            title: "Tên đăng nhập"
        },
        {
            id: "password",
            title: "Mật khẩu"
        },

    ]

    //validate
    const{
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(accountSchema(initialData?.username)),
        defaultValues: initialData || { username: "", password: "" },
    })

    const onSubmitCreate = (data) => {
        const idEm = getEIDByName(data.EName);
        const idRole = getRIDByName(data.RName);
        const taiKhoan = createObject(data.username, data.password, idEm, idRole);
        props.onCreate(taiKhoan);
        props.onClose();
    }

    const onSubmitUpdate = (data) => {
        const idEm = getEIDByName(data.EName);
        const idRole = getRIDByName(data.RName);
        // console.log(listEm);
        // console.log(listRole);
        // console.log(data);
        const acc = createObjectForUpdate(data.username, idEm, idRole);
        props.onCreate(props.updateAccount.id,acc);
        props.onClose();
    }

    const changeStatus = async() => {
        setLoad(true);
        if (active) {
            await props.onLock(props.updateAccount.id);
        } else {
            await props.onUnLock(props.updateAccount.id);
        }
        setActive(!active);
        setLoad(false);
    }

    const formCreate = () => (
        <div className={styles.container}>
            <form className={styles.infor} onSubmit={handleSubmit(onSubmitCreate)}>
                <h4>Thêm tài khoản</h4>

                {inputItems.map((item) => (
                    <InputField
                        register={register(item.id)}
                        error={errors[item.id]}
                    >{item.title}</InputField>
                ))}

                <Combobox
                    register={register("EName")}
                    list={listEmName}
                >Nhân viên</Combobox>

                <Combobox
                    register={register("RName")}
                    list={listRoleName}
                >Nhóm quyền</Combobox>
                
                <button>Thêm</button>
            </form>
        </div>
    )

    

    useEffect(() => {   //set giá trị cũ
        if (props.updateAccount) {
            reset(props.updateAccount); // tên giống bên schema là reset oke
        }
    }, [props.updateAccount]);

    const formUpdate = () => (
        <div className={styles.container}>
            <form className={styles.infor} onSubmit={handleSubmit(onSubmitUpdate)}>
                <h4>Sửa tài khoản</h4>

                <InputField
                    register={register("username")}
                    error={errors["username"]}
                >Tên đăng nhập</InputField>

                <InputField
                    readOnly={false}
                    register={register("EName")} // chỉ hiện thị bằng textField
                >Nhân viên</InputField>

                <Combobox
                    register={register("RName")}
                    list={listRoleName}
                >Nhóm quyền</Combobox>
                <div className={styles.containerButton}>
                    <button>Sửa</button>
                    <button 
                        type="button" 
                        onClick={() => {
                            changeStatus();
                        }}
                    >{active ? "Khóa" : "Mở khóa"}</button>
                </div>
                {load ? <Loading></Loading> : null}
            </form>
        </div>
    )

    return (
        <CustomPopUpCreate onClose={props.onClose}>
            {props.isUpdate ? formUpdate() : formCreate()}
            {/* {formCreate} */}
        </CustomPopUpCreate>
    )
}