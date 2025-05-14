import React from 'react';
import style from './Notification.module.css';
import tickIcon from '../../assets/icon/checkmark-svgrepo-com.svg';

const SuccessToast = ({ message = "Đã thêm thành công !" }) => {
  return (
    <div className={style.toast}>
        <img src={tickIcon} alt="" />
        <div id={style.text}>{message}</div>
    </div>
  );
};

export default SuccessToast;