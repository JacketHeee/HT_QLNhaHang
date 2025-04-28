import React, { createContext, useContext, useState } from 'react';
import Loading from '../components/Loading/Loading';

// Tạo Context
const LoadingContext = createContext();

// Hook để sử dụng Context
export const useLoading = () => useContext(LoadingContext);

// Provider component
export const LoadingProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Hàm simulateLoading
  const simulateLoading = (time = 300, callback) => {
    setShowPopup(true); // Hiển thị popup
    const timer = setTimeout(() => {
      setShowPopup(false); // Ẩn popup
      if (callback) callback(); // Thực hiện callback nếu có
    }, time);
    return () => clearTimeout(timer); // Trả về hàm dọn dẹp
  };

  return (
    <LoadingContext.Provider value={{ simulateLoading }}>
      {children}
      {showPopup && <Loading />}
    </LoadingContext.Provider>
  );
};