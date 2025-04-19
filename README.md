# 🍽️ Restaurant POS - Quản lý nhà hàng

Hệ thống POS giúp các nhà hàng/quán ăn quản lý hiệu quả quy trình gọi món, thanh toán, quản lý thực đơn, bàn ăn và doanh thu.  
Ứng dụng được chia thành hai phần chính:

- **Frontend**: ReactJS (Vite) – dành cho nhân viên, quản lý sử dụng giao diện người dùng.
- **Backend**: NestJS – cung cấp API cho hệ thống, kết nối với cơ sở dữ liệu.

---

## 🚀 Công nghệ sử dụng

### Frontend (client)
- ⚛️ ReactJS
- ⚡ Vite
- 🎨 CSS Modules / TailwindCSS
- 🔄 React Router
- 🌐 Axios

### Backend (server)
- 🐱 NestJS
- 🐘 PostgreSQL / MongoDB (tùy chọn)
- 🔐 JWT Auth
- 🧠 TypeORM / Prisma
- 📈 Swagger (tài liệu API)

---

## 🏗️ Cấu trúc thư mục dự án

```bash
restaurant-pos/
├── client/                   # 🌐 React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/              # 📸 Hình ảnh, icon, fonts,...
│   │   │   ├── images/
│   │   │   └── icons/
│   │
│   │   ├── components/          # 🧩 Component dùng lại nhiều nơi
│   │   │   ├── Button/
│   │   │   │   ├── Button.js
│   │   │   │   └── Button.module.css
│   │   │   └── ...
│   │
│   │   ├── pages/               # 📄 Các trang chính (Home, Login,...)
│   │   │   ├── Home/
│   │   │   │   ├── Home.js
│   │   │   │   └── Home.module.css
│   │   │   └── ...
│   │
│   │   ├── layouts/             # 🧱 Layout chung (Header, Footer,...)
│   │   │   ├── MainLayout.js
│   │   │   └── AdminLayout.js
│   │
│   │   ├── routes/              # 🗺️ Định tuyến react-router-dom
│   │   │   └── index.js
│   │
│   │   ├── services/            # 🌐 Gọi API (axios)
│   │   │   └── userService.js
│   │
│   │   ├── hooks/               # 🪝 Custom hooks
│   │   │   └── useAuth.js
│   │
│   │   ├── contexts/            # 🌍 React context (Auth, Theme,...)
│   │   │   └── AuthContext.js
│   │
│   │   ├── utils/               # 🧠 Hàm tiện ích (format, validate,...)
│   │   │   └── validators.js
│   │
│   │   ├── App.js               # 📦 App chính
│   │   ├── index.js             # 🚪 Điểm khởi đầu
│   │   └── index.css            # 🎨 Style chung
│   │
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # 🚀 NestJS backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/           # 🔐 Xác thực người dùng
│   │   │   ├── orders/         # 📝 Quản lý đơn hàng
│   │   │   ├── tables/         # 🍽️ Quản lý bàn
│   │   │   ├── menu/           # 📋 Thực đơn món ăn
│   │   │   └── revenue/        # 📊 Thống kê doanh thu
│   │   └── main.ts             # 🚪 Điểm khởi động ứng dụng
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── package.json              # 📦 Monorepo (nếu dùng workspace)

---

## 🧪 Cài đặt và chạy thử

### 1. Clone dự án

```bash
git clone https://github.com/your-username/restaurant-pos.git
cd restaurant-pos

### 2. Cài đặt dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

### 3. Khởi chạy

**Frontend (React):**

```bash
npm run dev
```

**Backend (NestJS):**

```bash
npm run start:dev
```

---

## ✅ Tính năng chính

- 🧑‍🍳 Quản lý món ăn, thực đơn
- 📋 Tạo đơn hàng tại bàn, in hóa đơn
- 💳 Thanh toán tại quầy
- 📊 Xem doanh thu theo ngày/tháng/năm
- 👥 Quản lý nhân viên, phân quyền
- 🔐 Đăng nhập, bảo mật JWT

---

## 📚 Ghi chú

- Có thể dùng `Docker` để deploy production
- Database đề xuất: PostgreSQL

---

## 💡 Đóng góp

Hãy thoải mái tạo pull request hoặc mở issue nếu bạn có ý tưởng mới hoặc phát hiện lỗi 💬

---

## 📝 License

This project is licensed under the MIT License.

---

## 📋 Thành viên dự án

- **Lê Hoàng Sơn** 
- **Nguyễn Dương**
- **Nguyễn Ngọc Thiên Ân** 
- **Lê Hữu Thành Vinh**
- **Lê Quang Hoàng** 
- **Nguyễn Hùng Mạnh** 

---

## 📐 Figma thiết kế

[Link Figma thiết kế giao diện](https://www.figma.com/design/EfNYOadn5pLvgAbuYcpkir/Untitled?node-id=0-1&p=f&t=q8WdLEiVJLjfKfV2-0)

---

## 📂 Github

[Link Github dự án](https://github.com/JacketHeee/HT_QLNhaHang)
