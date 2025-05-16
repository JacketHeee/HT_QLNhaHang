import { useEffect, useState } from "react";
import CustomPopUpCreate from "../CustomPopUpCreate/CustomPopUpCreate"
import styles from "./AddEmployee.module.css"
import { useForm } from 'react-hook-form';
import { employeeSchema } from "../Validate/EmployeeSchema/EmployeeSchema";
import InputField from "../InputField/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import Combobox from "../Combobox/Combobox";


export default function AddEmployee(props) {

    const [gioiTinh, setGioiTinh] = useState("Nam");
    const selections = ["Nam","Nữ"];

    const inputItems = [
        {
            id: "name",
            title: "Tên nhân viên"
        },
        {
            id: "soDT",
            title: "Số điện thoại"
        },
    ]

    const createObject = (ten, gt, sdt) => (
        {
            "name": ten,
            "gioiTinh": gt,
            "soDT": sdt
        }
    )

    //validate
    const{
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(employeeSchema),

    })

    const onSubmitCreate = (data) => {
        const nhanVien = createObject(data.name, data.gioiTinh, data.soDT);
        props.onCreate(nhanVien);
        props.onClose();
    }

    const onSubmitUpdate = (data) => {
        const nhanVien = createObject(data.name, data.gioiTinh, data.soDT);
        props.onCreate(props.updateEmployee.id,nhanVien);
        props.onClose();
    }

    const formCreate = () => (
        <div className={styles.container}>
            <form className={styles.infor} onSubmit={handleSubmit(onSubmitCreate)}>
                <h4>Thêm nhân viên</h4>

                {inputItems.map((item) => (
                    <InputField
                        register={register(item.id)}
                        error={errors[item.id]}
                    >{item.title}</InputField>
                ))}

                <Combobox
                    register={register("gioiTinh")}
                    list = {selections}
                >Giới tính</Combobox>
                <button>Thêm</button>
            </form>
        </div>
    )

    useEffect(() => {   //set giá trị cũ
        if (props.updateEmployee) {
            reset(props.updateEmployee); // tên giống bên schema là reset oke
        }
    }, [props.updateEmployee]);
    
    const formUpdate = () => (
        <div className={styles.container}>
            <form className={styles.infor} onSubmit={handleSubmit(onSubmitUpdate)}>
                <h4>Sửa nhân viên</h4>

                {inputItems.map((item) => (
                    <InputField
                        register={register(item.id)}
                        error={errors[item.id]}
                    >{item.title}</InputField>
                ))}
                
                <Combobox
                    register={register("gioiTinh")}
                    list = {selections}
                >Giới tính</Combobox>
                {/* <h6>Giới tính:</h6>
                <select
                    value={gioiTinh}
                    onChange={(e) => { setGioiTinh(e.target.value) }}
                >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select> */}
                <button>Sửa</button>
            </form>
        </div>
    )


    return (
        <CustomPopUpCreate onClose={props.onClose}>
            {props.isUpdate ? formUpdate() : formCreate()}
        </CustomPopUpCreate>
    )
}