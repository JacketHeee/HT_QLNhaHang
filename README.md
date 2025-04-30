# 🍽️ Restaurant POS - Quản lý nhà hàng

Hệ thống POS giúp các nhà hàng/quán ăn quản lý hiệu quả quy trình gọi món, thanh toán, quản lý thực đơn, bàn ăn và doanh thu.  
Ứng dụng được chia thành hai phần chính:

- **Frontend**: ReactJS – dành cho nhân viên, quản lý và khách hàng.
- **Backend**: NestJS – cung cấp API cho hệ thống, kết nối với cơ sở dữ liệu.

## I. Công nghệ sử dụng

### 1. Frontend (client)
- ⚛️ ReactJS
- 🎨 CSS
- 🔄 React Router
- 🌐 Axios

### 2. Backend (server)
- 🐱 NestJS
- 🐘 PostgreSQL
- 🔐 JWT Auth
- 🧠 TypeORM

## II. Cấu trúc thư mục dự án

```bash
restaurant-pos/
├── frontend_test/                   # 🌐 React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/          # 🧩 Component dùng lại nhiều nơi
│   │   ├── pages/               # 📄 Các trang chính
│   │   ├── services/            # 🌐 Gọi API (axios)
│   │   ├── App.js               # 📦 App chính
│   │   ├── index.js             # 🚪 Điểm khởi đầu
│   │   └── index.css            # 🎨 Style chung
│   │
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # 🚀 NestJS backend
│   ├── src/
│   │   ├── modules/
│   │   └── main.ts             # 🚪 Điểm khởi động ứng dụng
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── package.json              # 📦 Monorepo (nếu dùng workspace)
```

## III. Cài đặt và chạy thử

### 1. Clone dự án

```bash
git clone https://github.com/JacketHeee/HT_QLNhaHang.git
cd restaurant-pos
```

### 2. Cài đặt dependencies

**Frontend:**

```bash
cd frontend_test
npm install
```

**Backend:**

```bash
cd ../backend
npm install
```

### 3. Khởi chạy

**Frontend (React):**

```bash
npm start
```

**Backend (NestJS):**

```bash
npm run start
```

## IV. Tính năng chính

- 🧑‍🍳 Quản lý món ăn, thực đơn
- 📋 Tạo đơn hàng tại bàn, in hóa đơn
- 💳 Thanh toán tại quầy
- 📊 Xem doanh thu theo ngày/tháng/năm
- 👥 Quản lý nhân viên, phân quyền
- 🔐 Đăng nhập, bảo mật JWT

## V. Ghi chú

- Có thể dùng `Docker` để deploy production
- Database đề xuất: PostgreSQL

## VI. Đóng góp

Hãy thoải mái tạo pull request hoặc mở issue nếu bạn có ý tưởng mới hoặc phát hiện lỗi 💬

## VII. License

This project is licensed under the MIT License.

## VIII. Thành viên dự án

- Lê Hoàng Sơn
- Nguyễn Dương
- Nguyễn Ngọc Thiên Ân 
- Lê Hữu Thành Vinh
- Lê Quang Hoàng
- Nguyễn Hùng Mạnh

## IX. Tài nguyên

- **Figma**: [Xem chi tiết](https://www.figma.com/design/EfNYOadn5pLvgAbuYcpkir/Untitled?node-id=0-1&p=f&t=q8WdLEiVJLjfKfV2-0)

- **Github**: [Xem chi tiết](https://github.com/JacketHeee/HT_QLNhaHang)