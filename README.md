# 🛍️ Atino VN - E-commerce Platform

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-green.svg)](https://mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://typescriptlang.org/)

Một nền tảng thương mại điện tử hiện đại được xây dựng với React, Node.js và MongoDB, cung cấp trải nghiệm mua sắm thời trang chất lượng cao.

## ✨ Tính năng chính

### 👤 Người dùng
- **Đăng ký/Đăng nhập** với xác thực JWT
- **Quản lý tài khoản** cá nhân
- **Duyệt sản phẩm** với bộ lọc và tìm kiếm
- **Thêm vào giỏ hàng** và yêu thích
- **Thanh toán** đơn hàng
- **Theo dõi đơn hàng** và lịch sử mua hàng

### 🛒 Giỏ hàng & Thanh toán
- **Giỏ hàng thông minh** với cập nhật real-time
- **Kiểm tra hàng tồn kho** trước khi thanh toán
- **Tính toán thuế và phí vận chuyển**
- **Thanh toán an toàn** với nhiều phương thức

### 👨‍💼 Admin Panel
- **Dashboard** với thống kê chi tiết
- **Quản lý sản phẩm** (CRUD operations)
- **Quản lý đơn hàng** (xem, cập nhật trạng thái)
- **Quản lý người dùng** (kích hoạt/vô hiệu hóa, phân quyền)
- **Báo cáo và thống kê** real-time

### 📝 Blog & Nội dung
- **Hệ thống blog** với bài viết thời trang
- **SEO-friendly** URLs
- **Rich text editor** cho admin

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React với hooks và concurrent features
- **TypeScript** - Type safety và better DX
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool và dev server
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **MongoDB** + **Mongoose** - NoSQL database
- **JWT** - Authentication & authorization
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Rate limiting** - API protection

### DevOps & Tools
- **ESLint** + **TypeScript ESLint** - Code linting
- **Nodemon** - Auto-restart development server
- **Concurrently** - Run multiple scripts
- **Compression** - Response compression

## 📋 Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0
- **npm** hoặc **yarn**

## 🚀 Cài đặt và chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd atino-clone
```

### 2. Cài đặt dependencies

#### Frontend & Backend
```bash
npm install
```

#### Chỉ Backend
```bash
cd backend
npm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env` trong thư mục `backend/`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/atino_db

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

FRONTEND_URL=http://localhost:5173

# Email service (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Khởi tạo Database

Chạy seed script để tạo dữ liệu mẫu:
```bash
cd backend
npm run seed
```

### 5. Chạy ứng dụng

#### Chạy cả Frontend và Backend cùng lúc:
```bash
npm run dev
```

#### Hoặc chạy riêng biệt:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Truy cập ứng dụng

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Documentation:** http://localhost:5000/api/health

## 👤 Tài khoản test

Sau khi chạy `npm run seed`, bạn có thể đăng nhập với các tài khoản sau:

### Admin Account
- **Email:** admin@atino.vn
- **Password:** admin123
- **Quyền:** Quản trị viên (full access)

### Demo User Account
- **Email:** demo@atino.vn
- **Password:** demo123
- **Quyền:** Người dùng thông thường

## 📚 API Documentation

### Authentication
```http
POST /api/auth/register  # Đăng ký
POST /api/auth/login     # Đăng nhập
GET  /api/auth/me        # Thông tin user hiện tại
POST /api/auth/logout    # Đăng xuất
```

### Products
```http
GET    /api/products           # Lấy danh sách sản phẩm
GET    /api/products/:id       # Chi tiết sản phẩm
POST   /api/products           # Tạo sản phẩm (Admin)
PUT    /api/products/:id       # Cập nhật sản phẩm (Admin)
DELETE /api/products/:id       # Xóa sản phẩm (Admin)
GET    /api/products/featured  # Sản phẩm nổi bật
GET    /api/products/sale      # Sản phẩm giảm giá
```

### Cart & Wishlist
```http
GET    /api/cart              # Lấy giỏ hàng
POST   /api/cart              # Thêm vào giỏ hàng
PUT    /api/cart/:id          # Cập nhật số lượng
DELETE /api/cart/:id          # Xóa khỏi giỏ hàng
GET    /api/wishlist          # Danh sách yêu thích
POST   /api/wishlist          # Thêm vào yêu thích
DELETE /api/wishlist/:id      # Xóa khỏi yêu thích
```

### Orders
```http
GET    /api/orders            # Lịch sử đơn hàng
POST   /api/orders            # Tạo đơn hàng
GET    /api/orders/:id        # Chi tiết đơn hàng
PUT    /api/orders/:id/status # Cập nhật trạng thái (Admin)
```

### Admin APIs
```http
GET    /api/admin/users              # Danh sách users
GET    /api/admin/users/stats        # Thống kê users
PUT    /api/admin/users/:id/status   # Cập nhật trạng thái user
PUT    /api/admin/users/:id/role     # Thay đổi quyền user

GET    /api/admin/orders             # Danh sách đơn hàng
GET    /api/admin/orders/stats       # Thống kê đơn hàng
PUT    /api/admin/orders/:id/status  # Cập nhật trạng thái đơn hàng

GET    /api/admin/products           # Quản lý sản phẩm
POST   /api/admin/products           # Tạo sản phẩm
PUT    /api/admin/products/:id       # Cập nhật sản phẩm
DELETE /api/admin/products/:id       # Xóa sản phẩm
```

## 📁 Cấu trúc dự án

```
atino-clone/
├── backend/                    # Backend Node.js
│   ├── controllers/           # Business logic
│   ├── middleware/            # Express middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── scripts/              # Database scripts
│   ├── utils/                # Helper functions
│   ├── server.js             # Main server file
│   └── package.json
├── src/                       # Frontend React
│   ├── components/           # Reusable components
│   ├── contexts/             # React contexts
│   ├── pages/                # Page components
│   ├── services/             # API services
│   ├── styles/               # Global styles
│   ├── utils/                # Helper functions
│   └── App.tsx
├── public/                   # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 📜 Scripts

### Root level
```bash
npm run dev              # Chạy cả FE & BE
npm run dev:frontend     # Chỉ chạy frontend
npm run dev:backend      # Chỉ chạy backend
npm run build            # Build production
npm run lint             # Lint code
npm run preview          # Preview production build
```

### Backend
```bash
cd backend
npm start                # Chạy production server
npm run dev              # Chạy dev server với nodemon
npm run seed             # Khởi tạo dữ liệu mẫu
```

### Backend
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://longddm4200:longddm4200@longddm4200.l2gxluo.mongodb.net/atino
JWT_SECRET=0ifPZj1ktYSLVzAUe+VBsZwTTT5iZOlFiCWCVAHyxzw=
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```


## 🔧 Development Guidelines

### Code Style
- Sử dụng **ESLint** và **TypeScript** strict mode
- Follow **React best practices** và hooks patterns
- Viết **JSDoc comments** cho functions phức tạp
- Sử dụng **semantic commit messages**

### Database
- Sử dụng **Mongoose** cho data validation
- Implement **proper indexing** cho performance
- **Backup database** regularly
- Sử dụng **transactions** cho operations quan trọng

### Security
- **Validate all inputs** server-side
- **Sanitize data** trước khi lưu database
- **Rate limiting** cho API endpoints
- **Helmet** cho security headers
- **CORS** configuration properly

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📝 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Support

Nếu bạn có câu hỏi hoặc cần hỗ trợ:

- Tạo **Issue** trên GitHub
- Liên hệ: support@atino.vn
- Documentation: [Link đến docs]

---

**Made with ❤️ by Atino Team**

*Khám phá phong cách sống hiện đại với Atino VN - Nơi thời trang gặp gỡ công nghệ!* 🛍️✨
