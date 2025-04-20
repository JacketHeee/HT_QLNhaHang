// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log(window.matchMedia('(display-mode: standalone)').matches);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 👇 GỌI ĐĂNG KÝ SERVICE WORKER TẠI ĐÂY
// serviceWorkerRegistration.register();
serviceWorkerRegistration.register({
  onUpdate: registration => {
    console.log("Có phiên bản mới!");
    // có thể thông báo người dùng reload trang ở đây
  },
  onSuccess: registration => {
    console.log("PWA sẵn sàng sử dụng offline!");
  }
});

// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();