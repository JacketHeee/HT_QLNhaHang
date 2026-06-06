# Hệ Thống POS Nhà Hàng

Hệ thống POS (Point of Sale) dựa trên web được thiết kế cho các nhà hàng, quán cà phê, và cơ sở kinh doanh ăn uống. Dự án bao gồm frontend sử dụng React và backend sử dụng NestJS, hỗ trợ đặt món, thanh toán, và quản lý giao dịch thông qua nền tảng trực tuyến với mã QR, không yêu cầu cài đặt ứng dụng.

## Mục Lục
- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Yêu cầu cài đặt](#yêu-cầu-cài-đặt)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
  - [Cài đặt Frontend](#cài-đặt-frontend)
  - [Cài đặt Backend](#cài-đặt-backend)
- [Biến môi trường](#biến-môi-trường)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)

## Giới thiệu
Hệ thống POS này cho phép khách hàng đặt món, thanh toán, và đặt bàn thông qua nền tảng web (truy cập bằng điện thoại, máy tính bảng hoặc laptop) mà không cần tiếp xúc trực tiếp với nhân viên. Hệ thống sử dụng mã QR để truy cập menu và hỗ trợ triển khai trên nhiều nhà hàng với khả năng mở rộng. Hiện tại, hệ thống xử lý khoảng 50 đơn hàng mỗi ngày.

Dự án hiện triển khai MVP (Minimum Viable Product) cho màn hình menu (Hình 2) và chi tiết mặt hàng (Hình 3) theo tài liệu yêu cầu.

## Công nghệ sử dụng
- **Frontend**: React, Css module
- **Backend**: NestJS, TypeScript
- **Cơ sở dữ liệu**: [Tạm thời mã hóa cứng, sẽ tích hợp PostgreSQL/MongoDB trong tương lai]
- **Khác**: Node.js, npm, Git, mã QR

## Cấu trúc thư mục
```
project-root/
├── frontEnd/           # Mã nguồn frontend (React)
│   ├── src/            # Components, pages, và logic giao diện
│   ├── public/         # Tài nguyên tĩnh (hình ảnh, biểu tượng)
│   └── package.json    # Phụ thuộc của frontend
├── backend/            # Mã nguồn backend (NestJS)
│   ├── src/            # Controllers, services, và modules
│   ├── dist/           # Mã biên dịch
│   └── package.json    # Phụ thuộc của backend
├── docs/               # Tài liệu dự án (yêu cầu, sơ đồ, v.v.)
└── README.md           # Tài liệu hướng dẫn
```

## Yêu cầu cài đặt
Cần cài đặt các công cụ sau:
- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- [npm](https://www.npmjs.com/) (đi kèm Node.js)
- [Git](https://git-scm.com/)

## Hướng dẫn cài đặt

### Cài đặt Frontend
1. Di chuyển đến thư mục `frontEnd`:
   ```bash
   cd frontEnd
   ```
2. Cài đặt phụ thuộc:
   ```bash
   npm install
   ```

### Cài đặt Backend
1. Di chuyển đến thư mục `backend`:
   ```bash
   cd backend
   ```
2. Cài đặt phụ thuộc:
   ```bash
   npm install
   ```

## Biến môi trường
Tạo file `.env` trong thư mục `backend` với các biến sau:
```
PORT=3000
API_URL=http://localhost:3000
```

Tạo file `.env` trong thư mục `frontEnd` (nếu cần):
```
REACT_APP_API_URL=http://localhost:3000
```

## Chạy ứng dụng
1. **Khởi động backend**:
   ```bash
   cd backend
   npm run start:dev
   ```
   Backend sẽ chạy tại `http://localhost:3000` (hoặc cổng được chỉ định trong `.env`).

2. **Khởi động frontend**:
   ```bash
   cd frontEnd
   npm start
   ```
   Frontend sẽ chạy tại `http://localhost:3000` và tự động mở trong trình duyệt.

## Đóng góp
Để đóng góp vào dự án:
1. Fork repository.
2. Tạo nhánh mới (`git checkout -b feature/tính-năng-của-bạn`).
3. Commit thay đổi (`git commit -m 'Thêm tính năng XYZ'`).
4. Push nhánh (`git push origin feature/tính-năng-của-bạn`).
5. Tạo Pull Request.

## Giấy phép
Dự án được cấp phép theo [MIT License](LICENSE).