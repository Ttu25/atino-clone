# ATINO - E-commerce Website Clone

Clone website thời trang nam ATINO.vn được xây dựng bằng React, TypeScript và Vite.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## 📋 Tổng quan

Website e-commerce đầy đủ chức năng với 18 trang, hệ thống giỏ hàng, wishlist, so sánh sản phẩm, và authentication.

### ✨ Tính năng chính

- 🛍️ **E-commerce đầy đủ**: Trang chủ, danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng, thanh toán
- 🔐 **Authentication**: Đăng nhập, đăng ký, quản lý tài khoản (mock authentication)
- ❤️ **Wishlist**: Danh sách sản phẩm yêu thích
- 🔄 **Product Comparison**: So sánh tối đa 4 sản phẩm
- 🔍 **Search**: Tìm kiếm sản phẩm
- 📦 **Order Tracking**: Tra cứu đơn hàng
- 📝 **Blog**: Tin tức và bài viết
- 📱 **Responsive Design**: Tương thích mọi thiết bị
- 💾 **LocalStorage**: Lưu trữ giỏ hàng, wishlist, comparison, và user data

## 🗂️ Cấu trúc dự án

```
atino-vn/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Header với navigation và search
│   │   │   ├── Footer.tsx          # Footer với links
│   │   │   └── Layout.tsx          # Layout wrapper
│   │   ├── product/
│   │   │   └── ProductCard.tsx     # Card hiển thị sản phẩm
│   │   └── cart/
│   │       └── CartDrawer.tsx      # Slide-out cart drawer
│   ├── context/
│   │   ├── AuthContext.tsx         # Authentication state
│   │   ├── CartContext.tsx         # Cart state management
│   │   ├── WishlistContext.tsx     # Wishlist state
│   │   └── ComparisonContext.tsx   # Product comparison state
│   ├── pages/
│   │   ├── Home.tsx                # Trang chủ
│   │   ├── Products.tsx            # Danh sách sản phẩm
│   │   ├── ProductDetail.tsx       # Chi tiết sản phẩm
│   │   ├── Checkout.tsx            # Thanh toán
│   │   ├── Login.tsx               # Đăng nhập/Đăng ký
│   │   ├── Account.tsx             # Tài khoản người dùng
│   │   ├── Wishlist.tsx            # Danh sách yêu thích
│   │   ├── ProductComparison.tsx   # So sánh sản phẩm
│   │   ├── OrderTracking.tsx       # Tra cứu đơn hàng
│   │   ├── Contact.tsx             # Liên hệ
│   │   ├── Blog.tsx                # Blog/Tin tức
│   │   ├── About.tsx               # Giới thiệu
│   │   ├── PrivacyPolicy.tsx       # Chính sách bảo mật
│   │   ├── TermsOfService.tsx      # Điều khoản dịch vụ
│   │   └── ShippingPolicy.tsx      # Chính sách vận chuyển
│   ├── data/
│   │   ├── products.ts             # Mock product data
│   │   └── blog.ts                 # Mock blog data
│   ├── App.tsx                     # Main app với routing
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Cài đặt và chạy

### Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd atino-vn

# Cài đặt dependencies
npm install
```

### Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### Build production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📱 Danh sách trang (18 pages)

### Core E-commerce
1. **Homepage** (`/`) - Hero banner, sản phẩm mới, sale
2. **Products** (`/products`) - Danh sách sản phẩm với filter/sort
3. **Product Detail** (`/product/:id`) - Chi tiết sản phẩm
4. **Checkout** (`/checkout`) - Thanh toán đơn hàng

### User & Authentication
5. **Login/Register** (`/login`) - Đăng nhập và đăng ký
6. **Account** (`/account`) - Quản lý tài khoản

### Additional Features
7. **Wishlist** (`/wishlist`) - Danh sách yêu thích
8. **Product Comparison** (`/comparison`) - So sánh sản phẩm
9. **Order Tracking** (`/order-tracking`) - Tra cứu đơn hàng
10. **Contact** (`/contact`) - Liên hệ
11. **Blog** (`/blog`) - Tin tức và bài viết

### Policy Pages
12. **Privacy Policy** (`/privacy-policy`)
13. **Terms of Service** (`/terms-of-service`)
14. **Shipping Policy** (`/shipping-policy`)

### Static Pages
15. **About** (`/about`) - Giới thiệu
16. **New Arrivals** (`/new-arrivals`)
17. **Sale** (`/sale`)
18. **Collections** (`/collections`)

## 🔐 Authentication

### Demo Account
```
Email: demo@atino.vn
Password: demo123
```

### Tính năng
- Đăng ký tài khoản mới (lưu vào localStorage)
- Đăng nhập với email/password
- Quản lý thông tin cá nhân
- Xem lịch sử đơn hàng (mock data)
- Protected routes (redirect to login)

## 🛒 State Management

Dự án sử dụng React Context API với 4 contexts:

### AuthContext
- Mock authentication
- User profile management
- Login/Register/Logout
- Persist to localStorage

### CartContext
- Add/Remove/Update items
- Calculate total
- Persist to localStorage

### WishlistContext
- Add/Remove products
- Check if product is in wishlist
- Persist to localStorage

### ComparisonContext
- Compare up to 4 products
- Add/Remove products
- Persist to localStorage

## 🎨 Design & UI

- **Design System**: Minimalist black & white theme
- **Typography**: System fonts với fallback
- **Icons**: Lucide React
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions và hover effects

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Client-side routing
- `typescript` - Type safety

### UI & Icons
- `lucide-react` - Icon library

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `@types/react` - React TypeScript types
- `@types/react-dom` - React DOM TypeScript types

## 🌟 Highlights

### Performance
- ⚡ Bundle size: **90.19 kB** (gzipped)
- 🚀 Build time: ~2.2s
- 📦 Code splitting với React Router
- 💾 LocalStorage caching

### Code Quality
- ✅ TypeScript strict mode
- 📝 Type-safe Context API
- 🎯 Component-based architecture
- 🔄 Reusable components

### User Experience
- 🎨 Modern, clean design
- 📱 Fully responsive
- ⚡ Fast page transitions
- 💫 Smooth animations

## 🔧 Customization

### Thay đổi màu sắc

Chỉnh sửa CSS variables trong `src/index.css`:

```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-50: #fafafa;
  /* ... */
}
```

### Thêm sản phẩm

Chỉnh sửa `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 'new-product',
    name: 'Tên sản phẩm',
    price: 500000,
    // ...
  }
];
```

## 📝 License

MIT License - Copyright (c) 2025 ATINO

## 👨‍💻 Author

Developed with ❤️ using React + TypeScript + Vite

---

**Note**: Đây là project demo với mock data. Để sử dụng trong production, cần tích hợp backend API thực tế cho authentication, products, và orders.
