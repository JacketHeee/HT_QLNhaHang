
---

# Restaurant Management System - Backend (NestJS)

Chào mừng bạn đến với hệ thống Backend của **Hệ thống Quản lý Nhà hàng**. Dự án này được xây dựng trên nền tảng **NestJS**, sử dụng **PostgreSQL** làm cơ sở dữ liệu chính.

Dưới đây là hướng dẫn chi tiết từng bước để thiết lập môi trường và khởi chạy server từ đầu.

---

## 🛠️ Yêu cầu hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy của bạn đã cài đặt các công cụ sau:

* **Node.js** (Khuyến nghị phiên bản LTS mới nhất)
* **npm** hoặc **yarn**
* **PostgreSQL**

---

## ⚙️ Hướng dẫn cài đặt & Cấu hình

### 1. Tạo Database trên PostgreSQL

Trước khi chạy ứng dụng, bạn cần tạo một database trống trên PostgreSQL.

1. Mở terminal hoặc công cụ quản lý trực quan (pgAdmin, DBeaver,...).
2. Kết nối tới PostgreSQL server của bạn và chạy câu lệnh SQL sau để tạo database:
```sql
CREATE DATABASE quanlynhahang;
```
Hoặc có thể tạo trên giao diện trực quan của app (pgAdmin, DBeaver, ...)
Xem các thông số bạn đã tạo cho server postgres: HOST, PORT, USER, PASS để sang bước thiết lập biến môi trường tiếp theo

### 2. Cấu hình Biến môi trường (Environment Variables)
1. Tạo một file tên là `.env` tại thư mục gốc của dự án (ngang hàng với `package.json`).
2. Sao chép và điền đầy đủ thông tin cấu hình database của bạn theo mẫu dưới đây:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=quanlynhahang
DATABASE_USER=postgres
DATABASE_PASSWORD=123456
```

Hoặc bạn cũng có thể copy từ file .env.example vào .env
### 3. Cài đặt các gói phụ thuộc (Dependencies)
Di chuyển vào thư mục dự án và chạy lệnh sau để cài đặt tất cả các thư viện cần thiết:
```bash
npm install
```

---

## 🚀 Các lệnh khởi chạy ứng dụng (Scripts)

Hệ thống cung cấp sẵn các script trong `package.json` để phục vụ cho việc phát triển, seeding dữ liệu và deploy.

### 1. Quản lý Dữ liệu mẫu (Database Seeding)

Để hệ thống có sẵn các dữ liệu ban đầu (như tài khoản admin, danh mục món ăn mặc định, sơ đồ bàn ăn...), hãy sử dụng các lệnh seed sau:

* **Chạy Seed (Thêm dữ liệu mẫu):**
```bash
npm run seed
```

* **Làm mới và Chạy lại Seed (Refresh & Seed):**
Xóa toàn bộ dữ liệu cũ và nạp lại dữ liệu mẫu từ đầu.
```bash
npm run seed:refresh
```

### 2. Lệnh chạy Server

* **Chế độ Phát triển (Development - Có Hot Reload):**
Sử dụng lệnh này khi đang code. Server sẽ tự động restart mỗi khi bạn lưu file.
```bash
npm run start:dev
```

* **Chế độ Thông thường (Standard Start):**
```bash
npm run start
```

### 3. Build & Chạy Production

* **Biên dịch dự án sang Javascript (Build):**
```bash
npm run build
```

* **Chạy server môi trường Production (Sau khi đã build):**
```bash
npm run start:prod
```