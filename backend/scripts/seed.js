import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Blog from '../models/Blog.js';

dotenv.config();

// Sample data based on your frontend
const sampleProducts = [
  {
    name: 'Áo Len Cổ Khoá XL.3.5070',
    price: 350000,
    originalPrice: 450000,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Len',
    isNew: true,
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Xanh navy', 'Xám'],
    inStock: true,
    stockQuantity: 50,
    description: 'Áo len cổ khoá cao cấp với chất liệu len mềm mại, giữ nhiệt tốt trong mùa đông.'
  },
  {
    name: 'Áo Khoác Dạ Măng Tô',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Khoác',
    isNew: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Xanh navy', 'Be'],
    inStock: true,
    stockQuantity: 30,
    description: 'Áo khoác dạ măng tô phong cách cổ điển, phù hợp cho mọi dịp.'
  },
  {
    name: 'Quần Âu Slimfit Q.1.202',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Âu',
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Đen', 'Xanh navy', 'Xám'],
    inStock: true,
    stockQuantity: 40,
    description: 'Quần âu slimfit với form dáng ôm sát, chất liệu co giãn thoải mái.'
  },
  {
    name: 'Áo Sơ Mi Trắng Basic',
    price: 320000,
    originalPrice: 380000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    category: 'Sơ Mi',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Xanh nhạt', 'Hồng'],
    inStock: true,
    stockQuantity: 60,
    description: 'Áo sơ mi basic chất lượng cao, dễ phối đồ cho mọi phong cách.'
  },
  {
    name: 'Áo Polo Basic P.2.105',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Polo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xanh navy', 'Đỏ'],
    inStock: true,
    stockQuantity: 45,
    description: 'Áo polo basic với chất liệu cotton cao cấp, thoáng mát.'
  },
  {
    name: 'Quần Jean Slimfit J.3.404',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Jean',
    isNew: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Xanh đậm', 'Xanh nhạt', 'Đen'],
    inStock: true,
    stockQuantity: 35,
    description: 'Quần jean slimfit với chất liệu denim cao cấp, form dáng trẻ trung.'
  },
  {
    name: 'Áo Thun Basic T.1.001',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Thun',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xám', 'Xanh navy'],
    inStock: true,
    stockQuantity: 80,
    description: 'Áo thun basic cotton 100%, thoáng mát và dễ chịu.'
  },
  {
    name: 'Áo Khoác Bomber K.2.303',
    price: 650000,
    originalPrice: 750000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Khoác',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Đen', 'Xanh navy', 'Xám', 'Be'],
    inStock: true,
    stockQuantity: 25,
    description: 'Áo khoác bomber phong cách trẻ trung, phù hợp cho mùa thu đông.'
  },
  {
    name: 'Áo Hoodie Nỉ Basic H.1.001',
    price: 380000,
    originalPrice: 420000,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Hoodie',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Trắng', 'Xám', 'Navy'],
    inStock: true,
    stockQuantity: 35,
    description: 'Áo hoodie nỉ chất liệu dày dặn, giữ nhiệt tốt trong mùa lạnh.'
  },
  {
    name: 'Áo Sweater Len Mỏng S.4.205',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Len',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Trắng', 'Đen', 'Xanh', 'Hồng'],
    inStock: true,
    stockQuantity: 40,
    description: 'Áo sweater len mỏng nhẹ nhàng, dễ chịu khi mặc.'
  },
  {
    name: 'Quần Jogger J.5.309',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Jogger',
    isNew: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Đen', 'Xám', 'Navy', 'Trắng'],
    inStock: true,
    stockQuantity: 45,
    description: 'Quần jogger thể thao, thoải mái cho mọi hoạt động.'
  },
  {
    name: 'Áo Thun Graphic T.2.456',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Thun',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xanh navy'],
    inStock: true,
    stockQuantity: 55,
    description: 'Áo thun với thiết kế graphic độc đáo, phong cách trẻ trung.'
  },
  {
    name: 'Áo Vest Công Sở V.3.112',
    price: 580000,
    originalPrice: 650000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Vest',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Xanh navy', 'Xám'],
    inStock: true,
    stockQuantity: 20,
    description: 'Áo vest công sở lịch lãm, phù hợp cho môi trường văn phòng.'
  },
  {
    name: 'Quần Short Kaki K.7.203',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Short',
    isNew: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Be', 'Xanh quân đội', 'Đen', 'Nâu'],
    inStock: true,
    stockQuantity: 50,
    description: 'Quần short kaki chất liệu bền bỉ, phù hợp cho mùa hè.'
  },
  {
    name: 'Áo Cardigan Len C.2.508',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Len',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Trắng', 'Xám', 'Nude', 'Đỏ'],
    inStock: true,
    stockQuantity: 30,
    description: 'Áo cardigan len nữ tính, dễ phối với nhiều trang phục.'
  },
  {
    name: 'Quần Tây Slim Q.6.777',
    price: 520000,
    originalPrice: 580000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Âu',
    isSale: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Đen', 'Xanh navy', 'Xám tối'],
    inStock: true,
    stockQuantity: 25,
    description: 'Quần tây slim fit với chất liệu wool pha, lịch lãm.'
  },
  {
    name: 'Áo Blazer 2 Nút B.4.601',
    price: 720000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Blazer',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Xanh navy', 'Xám'],
    inStock: true,
    stockQuantity: 15,
    description: 'Áo blazer 2 nút cổ điển, nâng tầm phong cách.'
  },
  {
    name: 'Áo Khoác Trench Coat T.8.909',
    price: 950000,
    originalPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Khoác',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Be', 'Đen', 'Xanh navy'],
    inStock: true,
    stockQuantity: 12,
    description: 'Áo trench coat phong cách Anh quốc, thời trang vượt thời gian.'
  },
  {
    name: 'Áo Thun Oversize O.1.234',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Thun',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xám', 'Navy'],
    inStock: true,
    stockQuantity: 40,
    description: 'Áo thun oversize phong cách Hàn Quốc, thoải mái năng động.'
  },
  {
    name: 'Quần Cargo C.9.876',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Cargo',
    isNew: true,
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Xanh quân đội', 'Đen', 'Be'],
    inStock: true,
    stockQuantity: 35,
    description: 'Quần cargo nhiều túi, phong cách streetwear mạnh mẽ.'
  },
  {
    name: 'Áo Sweater Crewneck S.7.543',
    price: 390000,
    originalPrice: 450000,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Len',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xanh navy', 'Đỏ gạch'],
    inStock: true,
    stockQuantity: 28,
    description: 'Áo sweater cổ tròn basic, dễ phối với nhiều loại trang phục.'
  },
  {
    name: 'Áo Polo Lacoste Style P.3.210',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Polo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xanh navy', 'Đỏ', 'Vàng'],
    inStock: true,
    stockQuantity: 42,
    description: 'Áo polo phong cách Lacoste, cổ điển và tinh tế.'
  },
  {
    name: 'Quần Chinos C.5.678',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Chinos',
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    colors: ['Be', 'Xanh navy', 'Đen', 'Xám'],
    inStock: true,
    stockQuantity: 38,
    description: 'Quần chinos chất liệu cotton, lịch lãm cho công sở.'
  },
  {
    name: 'Áo Jacket Denim J.6.345',
    price: 550000,
    originalPrice: 620000,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Jacket',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Xanh đậm', 'Xanh nhạt', 'Đen'],
    inStock: true,
    stockQuantity: 22,
    description: 'Áo jacket denim vintage, phong cách cổ điển mãi không lỗi thời.'
  },
  {
    name: 'Áo Hoodie Zip H.2.987',
    price: 410000,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Hoodie',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Xanh navy', 'Xám', 'Trắng'],
    inStock: true,
    stockQuantity: 33,
    description: 'Áo hoodie có khóa zip, tiện lợi và thời trang.'
  },
  {
    name: 'Quần Ống Rộng W.4.111',
    price: 340000,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop',
    category: 'Quần Âu',
    sizes: ['26', '27', '28', '29', '30', '31', '32'],
    colors: ['Đen', 'Xanh navy', 'Be', 'Xám'],
    inStock: true,
    stockQuantity: 27,
    description: 'Quần âu ống rộng hiện đại, thoải mái và phong cách.'
  },
  {
    name: 'Áo Tanktop Basic T.5.222',
    price: 150000,
    originalPrice: 180000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
    category: 'Áo Tanktop',
    isSale: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Đen', 'Xanh navy', 'Đỏ'],
    inStock: true,
    stockQuantity: 60,
    description: 'Áo tanktop basic cotton, thoáng mát cho mùa hè.'
  }
];

const sampleBlogPosts = [
  {
    title: 'Xu hướng thời trang nam 2024',
    excerpt: 'Khám phá những xu hướng thời trang nam nổi bật nhất năm 2024, từ phong cách tối giản đến những họa tiết táo bạo.',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800',
    category: 'Xu hướng',
    authorName: 'Minh Anh',
    published: true,
    featured: true,
    content: 'Nội dung chi tiết về xu hướng thời trang nam 2024...'
  },
  {
    title: 'Cách phối đồ công sở lịch lãm',
    excerpt: 'Hướng dẫn chi tiết cách phối đồ công sở nam giúp bạn tự tin và chuyên nghiệp trong mọi tình huống.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    category: 'Hướng dẫn',
    authorName: 'Tuấn Anh',
    published: true,
    featured: false,
    content: 'Hướng dẫn chi tiết cách phối đồ công sở...'
  },
  {
    title: 'Bí quyết chọn áo sơ mi phù hợp',
    excerpt: 'Làm thế nào để chọn được chiếc áo sơ mi hoàn hảo cho dáng người của bạn? Cùng tìm hiểu ngay.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
    category: 'Mẹo hay',
    authorName: 'Hoàng Long',
    published: true,
    featured: true,
    content: 'Bí quyết chọn áo sơ mi phù hợp...'
  },
  {
    title: 'Phong cách streetwear cho nam giới',
    excerpt: 'Streetwear không chỉ là xu hướng mà còn là cách thể hiện cá tính. Khám phá cách mix đồ streetwear ấn tượng.',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800',
    category: 'Xu hướng',
    authorName: 'Minh Anh',
    published: true,
    featured: false,
    content: 'Phong cách streetwear cho nam giới...'
  },
  {
    title: 'Cách bảo quản quần áo đúng cách',
    excerpt: 'Những mẹo đơn giản giúp quần áo của bạn luôn như mới và bền đẹp theo thời gian.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
    category: 'Mẹo hay',
    authorName: 'Tuấn Anh',
    published: true,
    featured: false,
    content: 'Cách bảo quản quần áo đúng cách...'
  },
  {
    title: 'Thời trang bền vững - Xu hướng tương lai',
    excerpt: 'Tìm hiểu về thời trang bền vững và cách ATINO đang đóng góp vào việc bảo vệ môi trường.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
    category: 'Tin tức',
    authorName: 'Hoàng Long',
    published: true,
    featured: true,
    content: 'Thời trang bền vững - Xu hướng tương lai...'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/atino-db');

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Blog.deleteMany();

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin Atino',
      email: 'admin@atino.vn',
      password: 'admin123',
      role: 'admin',
      phone: '0987654321',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
    });

    // Create demo user
    const demoUser = await User.create({
      name: 'Nguyễn Văn A',
      email: 'demo@atino.vn',
      password: 'demo123',
      phone: '0987654321',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
    });

    console.log('Created users');

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log('Created products');

    // Create blog posts
    const blogPosts = await Blog.insertMany(
      sampleBlogPosts.map(post => ({
        ...post,
        author: adminUser._id
      }))
    );
    console.log('Created blog posts');

    console.log('Database seeded successfully!');
    console.log(`✅ Created ${products.length} products with various categories:`);
    console.log('   - Áo Len: 3 sản phẩm');
    console.log('   - Áo Khoác: 3 sản phẩm');
    console.log('   - Quần Âu: 3 sản phẩm');
    console.log('   - Áo Thun: 3 sản phẩm');
    console.log('   - Áo Polo: 2 sản phẩm');
    console.log('   - Quần Jean: 1 sản phẩm');
    console.log('   - Áo Hoodie: 2 sản phẩm');
    console.log('   - Và nhiều loại khác...');
    console.log(`✅ Created ${blogPosts.length} blog posts`);
    console.log('');
    console.log('🔐 Admin credentials: admin@atino.vn / admin123');
    console.log('👤 Demo user credentials: demo@atino.vn / demo123');
    console.log('');
    console.log('🚀 Your e-commerce store is ready! Visit http://localhost:5173');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run seeder
seedDatabase();
