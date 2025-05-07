import * as yup from 'yup';
import { getAccounts } from '../../../api/services/accountService';

export const accountSchema = (initialUsername = null) => yup.object({
    username: yup
      .string()
      .required('Tên đăng nhập không được để trống')
      .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
      .test(
        'unique-username', 'Tên đăng nhập đã tồn tại',
        async (value) => {
          if (initialUsername && value === initialUsername) {//bỏ qua kiểm tra nếu tên tk không đổi cho update (*)
            return true;
          }

          if (!value) return true;

          //Kiểm tra tồn tại tài khoản (*)
          const accounts = await getAccounts();
          const exists = accounts.some(acc => acc.username === value);
          return !exists;
        }
      ),
      
    password: yup
      .string()
      .when([], {
        is: () => initialUsername === null, // Áp dụng validate khi là form thêm
        then: (schema) =>
          schema
            .required("Mật khẩu không được để trống")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        otherwise: (schema) => schema.nullable(), // Bỏ qua khi là form sửa
      }),
  });