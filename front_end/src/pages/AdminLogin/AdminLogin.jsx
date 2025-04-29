import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('1');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Giả lập xác thực (thay bằng API thực tế)
        e.preventDefault();
        if (username === 'admin' && password === '1') {
            localStorage.setItem('adminToken', 'fake-jwt-token');
            localStorage.setItem('userRole', 'admin');
            navigate('/admin/orders');
        } else if (username === 'staff' && password === '1') {
            localStorage.setItem('adminToken', 'fake-jwt-token');
            localStorage.setItem('userRole', 'staff');
            navigate('/admin/orders');
        } else if (username === 'kitchen' && password === '1') {
            localStorage.setItem('adminToken', 'fake-jwt-token');
            localStorage.setItem('userRole', 'kitchen');
            navigate('/admin/kitchen');
        } else {
            setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className={styles.container}>
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