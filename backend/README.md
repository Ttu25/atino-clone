# Atino Backend API

Backend API cho ứng dụng thương mại điện tử Atino được xây dựng bằng Node.js, Express.js và MongoDB.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

3. Cập nhật các biến môi trường trong `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/atino-db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

4. Khởi động MongoDB (nếu chưa có)

5. Chạy script seed để tạo dữ liệu mẫu:
```bash
npm run seed
```

6. Khởi động server:
```bash
npm start
# hoặc để development:
npm run dev
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Đăng ký tài khoản mới
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Đăng nhập
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Lấy thông tin user hiện tại (yêu cầu authentication)

#### PUT /api/auth/profile
Cập nhật thông tin profile

#### PUT /api/auth/change-password
Đổi mật khẩu

### Products

#### GET /api/products
Lấy danh sách sản phẩm với filter và pagination
Query parameters: `page`, `limit`, `category`, `search`, `minPrice`, `maxPrice`, `sort`, `isNew`, `isSale`

#### GET /api/products/:id
Lấy chi tiết sản phẩm

#### GET /api/products/categories/list
Lấy danh sách categories

#### GET /api/products/featured
Lấy sản phẩm nổi bật

#### GET /api/products/sale
Lấy sản phẩm giảm giá

#### POST /api/products (Admin only)
Tạo sản phẩm mới

#### PUT /api/products/:id (Admin only)
Cập nhật sản phẩm

#### DELETE /api/products/:id (Admin only)
Xóa sản phẩm

### Cart

#### GET /api/cart
Lấy giỏ hàng của user

#### POST /api/cart
Thêm sản phẩm vào giỏ hàng
```json
{
  "productId": "product_id",
  "quantity": 1,
  "selectedSize": "M",
  "selectedColor": "Đen"
}
```

#### PUT /api/cart/:productId
Cập nhật số lượng sản phẩm trong giỏ hàng

#### DELETE /api/cart/:productId
Xóa sản phẩm khỏi giỏ hàng

#### DELETE /api/cart
Xóa toàn bộ giỏ hàng

#### GET /api/cart/count
Lấy số lượng items trong giỏ hàng

### Orders

#### POST /api/orders
Tạo đơn hàng mới
```json
{
  "shippingAddress": {
    "fullName": "Nguyễn Văn A",
    "phone": "0987654321",
    "email": "user@example.com",
    "address": "123 Đường ABC",
    "city": "Hà Nội"
  },
  "paymentMethod": "cod",
  "note": "Ghi chú đơn hàng"
}
```

#### GET /api/orders
Lấy danh sách đơn hàng của user

#### GET /api/orders/:id
Lấy chi tiết đơn hàng

#### PUT /api/orders/:id/cancel
Hủy đơn hàng

#### PUT /api/orders/:id/status (Admin only)
Cập nhật trạng thái đơn hàng

#### GET /api/orders/admin/all (Admin only)
Lấy tất cả đơn hàng (Admin)

#### GET /api/orders/admin/stats (Admin only)
Lấy thống kê đơn hàng (Admin)

### Wishlist

#### GET /api/wishlist
Lấy wishlist của user

#### POST /api/wishlist/:productId
Thêm sản phẩm vào wishlist

#### DELETE /api/wishlist/:productId
Xóa sản phẩm khỏi wishlist

#### GET /api/wishlist/check/:productId
Kiểm tra sản phẩm có trong wishlist không

#### DELETE /api/wishlist
Xóa toàn bộ wishlist

#### GET /api/wishlist/count
Lấy số lượng items trong wishlist

### Blog

#### GET /api/blog
Lấy danh sách bài viết blog với filter và pagination

#### GET /api/blog/:id
Lấy chi tiết bài viết blog

#### GET /api/blog/categories/list
Lấy danh sách categories blog

#### GET /api/blog/featured
Lấy bài viết nổi bật

#### POST /api/blog (Admin only)
Tạo bài viết mới

#### PUT /api/blog/:id (Admin only)
Cập nhật bài viết

#### DELETE /api/blog/:id (Admin only)
Xóa bài viết

#### POST /api/blog/:id/like
Like/Unlike bài viết

## Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String, // hashed
  phone: String,
  address: String,
  role: 'user' | 'admin'
}
```

### Product
```javascript
{
  name: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: String,
  description: String,
  sizes: [String],
  colors: [String],
  isNew: Boolean,
  isSale: Boolean,
  inStock: Boolean,
  stockQuantity: Number,
  tags: [String]
}
```

### Cart
```javascript
{
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number,
    selectedSize: String,
    selectedColor: String
  }]
}
```

### Order
```javascript
{
  user: ObjectId,
  orderItems: [{
    product: ObjectId,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    selectedSize: String,
    selectedColor: String
  }],
  shippingAddress: {
    fullName: String,
    phone: String,
    email: String,
    address: String,
    city: String
  },
  paymentMethod: 'cod' | 'banking',
  itemsPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  isDelivered: Boolean,
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  note: String
}
```

### Wishlist
```javascript
{
  user: ObjectId,
  products: [ObjectId]
}
```

### Blog
```javascript
{
  title: String,
  excerpt: String,
  content: String,
  image: String,
  category: String,
  author: ObjectId,
  authorName: String,
  tags: [String],
  published: Boolean,
  featured: Boolean,
  views: Number,
  likes: [ObjectId]
}
```

## Authentication

API sử dụng JWT (JSON Web Tokens) cho authentication. Token được gửi trong header:

```
Authorization: Bearer <token>
```

## Error Handling

API trả về lỗi với format thống nhất:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (only in development)"
}
```

## Sample Data

Chạy `npm run seed` để tạo dữ liệu mẫu:

- **Admin**: admin@atino.vn / admin123
- **Demo User**: demo@atino.vn / demo123

## Development

- Sử dụng `npm run dev` để chạy với nodemon
- API documentation có thể được tạo bằng Swagger/OpenAPI
- Rate limiting được áp dụng cho tất cả endpoints
- CORS được cấu hình cho frontend URL

## License

MIT
