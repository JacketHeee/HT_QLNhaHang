import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./NotFound.module.css";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <img 
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" 
                alt="404 Not Found" 
                className={styles.image}
            />
            <h1 className={styles.title}>Oops! Không tìm thấy trang 😢</h1>
            <p className={styles.message}>Trang bạn đang tìm có thể đã bị xoá hoặc không tồn tại.</p>
            <button className={styles.button} onClick={() => navigate(-1)}>Quay lại</button>
        </div>
    );
}