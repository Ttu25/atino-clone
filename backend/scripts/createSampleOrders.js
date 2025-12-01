import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const createSampleOrders = async () => {
  try {
    console.log('🔄 Creating sample orders...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/atino-db');

    // Get sample users and products
    const users = await User.find({}).limit(2);
    const products = await Product.find({ inStock: true }).limit(5);

    console.log(`📊 Found ${users.length} users and ${products.length} products`);

    if (users.length === 0 || products.length === 0) {
      console.log('❌ Not enough users or products to create orders');
      console.log('Users:', users.map(u => ({ name: u.name, role: u.role })));
      console.log('Products count:', products.length);
      return;
    }

    const sampleOrders = [
      {
        user: users[0]._id,
        orderItems: [
          {
            product: products[0]._id,
            name: products[0].name,
            image: products[0].image,
            price: products[0].price,
            quantity: 2,
            selectedSize: 'M',
            selectedColor: 'Đen'
          },
          {
            product: products[1]._id,
            name: products[1].name,
            image: products[1].image,
            price: products[1].price,
            quantity: 1,
            selectedSize: 'L',
            selectedColor: 'Trắng'
          }
        ],
        shippingAddress: {
          fullName: users[0].name,
          phone: '0987654321',
          email: users[0].email,
          address: '123 Nguyễn Huệ, Quận 1',
          city: 'TP.HCM'
        },
        paymentMethod: 'cod',
        itemsPrice: (products[0].price * 2) + (products[1].price * 1),
        shippingPrice: 0,
        totalPrice: (products[0].price * 2) + (products[1].price * 1),
        orderStatus: 'pending',
        note: 'Giao hàng trong giờ hành chính'
      },
      {
        user: users[1]._id,
        orderItems: [
          {
            product: products[2]._id,
            name: products[2].name,
            image: products[2].image,
            price: products[2].price,
            quantity: 1,
            selectedSize: '32',
            selectedColor: 'Xanh navy'
          }
        ],
        shippingAddress: {
          fullName: users[1].name,
          phone: '0987654322',
          email: users[1].email,
          address: '456 Lê Lợi, Quận 3',
          city: 'TP.HCM'
        },
        paymentMethod: 'cod',
        itemsPrice: products[2].price,
        shippingPrice: 0,
        totalPrice: products[2].price,
        orderStatus: 'processing',
        note: 'Giao hàng nhanh'
      },
      {
        user: users[0]._id,
        orderItems: [
          {
            product: products[3]._id,
            name: products[3].name,
            image: products[3].image,
            price: products[3].price,
            quantity: 3,
            selectedSize: 'XL',
            selectedColor: 'Đỏ'
          }
        ],
        shippingAddress: {
          fullName: users[0].name,
          phone: '0987654321',
          email: users[0].email,
          address: '789 Trần Hưng Đạo, Quận 5',
          city: 'TP.HCM'
        },
        paymentMethod: 'cod',
        itemsPrice: products[3].price * 3,
        shippingPrice: 0,
        totalPrice: products[3].price * 3,
        orderStatus: 'shipped',
        trackingNumber: 'VN123456789',
        note: 'Giao hàng cẩn thận'
      }
    ];

    // Create orders
    for (const orderData of sampleOrders) {
      const order = new Order(orderData);
      await order.save();
      console.log(`✅ Created order ${order.orderNumber}`);
    }

    console.log('🎉 Sample orders created successfully!');
  } catch (error) {
    console.error('❌ Error creating sample orders:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createSampleOrders();
