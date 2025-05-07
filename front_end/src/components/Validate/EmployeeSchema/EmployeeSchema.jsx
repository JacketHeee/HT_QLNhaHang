import * as yup from 'yup';

export const employeeSchema = yup.object({
    name: yup.string().required('Tên không được để trống'),
    soDT: yup.string().required("Số điện thoại không được để trống")
    .matches(/^(09)\d{8}/, "Số điện thoại chưa đúng định dạng")
})