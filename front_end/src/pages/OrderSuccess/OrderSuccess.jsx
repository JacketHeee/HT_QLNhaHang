import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";
import Loading from "../../components/Loading/Loading";
import { useLoading } from "../../contexts/LoadingContext";


export default function OrderSuccess() {
  const nav = useNavigate();
  const {simulateLoading} = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      simulateLoading(1500,() => {
        nav("/ban/05");
      })
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="order-success-container">
      {/* <Loading/> */}
      <div class="circle-container">
        <svg class="circle" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38"/>
        </svg>
        <svg class="checkmark" viewBox="0 0 80 80">
            <path d="M16,40 L32,56 L64,24"/>
        </svg>
      </div>
      <h2>Đặt hàng thành công!</h2>
      <p>Chúng tôi đang chuẩn bị món ăn cho bạn. Vui lòng đợi trong giây lát...</p>

      


    </div>
  );
}