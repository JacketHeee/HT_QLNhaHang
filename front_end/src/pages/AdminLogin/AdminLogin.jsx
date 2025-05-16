import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';
import { login } from '../../api/services/authService';
import { getFeaturesByRoleName } from '../../api/services/features_rolesService';
import Loading from '../../components/Loading/Loading';
import { getListRoute } from '../../api/services/transferFeatureName';

const AdminLogin = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [routes, setRoutes] = useState(''); //CHUỖI lưu các chức năng thằng này truy cập được
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    // Kiểm tra token khi component mount
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const firstPage = localStorage.getItem('firstpage');
    //     if (token && firstPage) {
    //     navigate(`/admin/${firstPage}`);
    //     }
    // }, [navigate]);

    const fetchToken = async (usrname, passwd) => {
        setLoad(true);
        try {
            const request = await login(usrname, passwd);
            let roleName = request.user.role;
            console.log(roleName);
            
            //set token cho các request
            localStorage.setItem('token', request.access_token);
    
            const features = await getFeaturesByRoleName(roleName);
            // console.log("features : ", features);
            const listRoute = getListRoute(features);
            // console.log("routes : ", listRoute);
            setRoutes(JSON.stringify(listRoute)); // set xong qua useEffect
            
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    const handleLogin = async (e) => {
        // Giả lập xác thực (thay bằng API thực tế)
        e.preventDefault();
        await fetchToken(username, password);
    };

    useEffect(() => {
        if(routes){// PHIỀN
            setLoad(false);
            goToFirstPage();
        } 
    },[routes]) // đợi đến khi load xong routes mới gọi goToFirstPage


    const goToFirstPage = () => {
        //chuyển hướng đến trang chủ
        // if (username === 'admin' && password === '123456') {

            const arr = JSON.parse(routes);
            const firstPage = arr[0];

            //cài đặt CHUỖI những chức năng có thể truy cập
            localStorage.setItem('routes', routes);
            // console.log("đây", routes);
            //cài đặt trang đầu
            localStorage.setItem('firstpage', firstPage);

            navigate(`/admin/${firstPage}`);

            // localStorage.setItem('adminToken', );
            // localStorage.setItem("myArray", JSON.stringify(myArray));

            // navigate('/admin/orders');

        // } else if (username === 'staff' && password === '123456') {
        //     localStorage.setItem('adminToken', 'fake-jwt-token');
        //     localStorage.setItem('userRole', 'staff');
        //     navigate('/admin/orders');
        // } else if (username === 'kitchen' && password === '123456') {
        //     localStorage.setItem('adminToken', 'fake-jwt-token');
        //     localStorage.setItem('userRole', 'kitchen');
        //     navigate('/admin/kitchen');
        // } else {
        //     setError('Tên đăng nhập hoặc mật khẩu không đúng');
        // }

        // if (username === 'admin' && password === '123456') {
        //     localStorage.setItem('adminToken', 'fake-jwt-token');
        //     localStorage.setItem('userRole', 'admin');
        //     navigate('/admin/orders');
        // } else if (username === 'staff' && password === '123456') {
        //     localStorage.setItem('adminToken', 'fake-jwt-token');
        //     localStorage.setItem('userRole', 'staff');
        //     navigate('/admin/orders');
        // } else if (username === 'kitchen' && password === '123456') {
        //     localStorage.setItem('adminToken', 'fake-jwt-token');
        //     localStorage.setItem('userRole', 'kitchen');
        //     navigate('/admin/kitchen');
        // } else {
        //     setError('Tên đăng nhập hoặc mật khẩu không đúng');
        // }
    }

    return (
        <div className={styles.container}>
            {load ? <Loading></Loading> : null}
            <div className={styles.card}>
                <h4 className={styles.title}>Đăng nhập Admin</h4>
                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tên đăng nhập</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;