import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/home/Home';
import { ProductDetail } from './pages/product-detail/ProductDetail';
import { Products } from './pages/products/Products';
import { NewArrivals } from './pages/new-arrivals/NewArrivals';
import { Sale } from './pages/sale/Sale';
import { Collections } from './pages/collections/Collections';
import { Checkout } from './pages/checkout/Checkout';
import { About } from './pages/about/About';
import { OrderTracking } from './pages/order-tracking/OrderTracking';
import { Contact } from './pages/contact/Contact';
import { PrivacyPolicy } from './pages/privacy-policy/PrivacyPolicy';
import { TermsOfService } from './pages/terms-of-service/TermsOfService';
import { ShippingPolicy } from './pages/shipping-policy/ShippingPolicy';
import { Blog } from './pages/blog/Blog';
import { Wishlist } from './pages/wishlist/Wishlist';
import { ProductComparison } from './pages/product-comparison/ProductComparison';
import { Login } from './pages/login/Login';
import { Account } from './pages/account/Account';
import {
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminUsers
} from './pages/admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="new-arrivals" element={<NewArrivals />} />
        <Route path="sale" element={<Sale />} />
        <Route path="collections" element={<Collections />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="order-tracking" element={<OrderTracking />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="blog" element={<Blog />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="comparison" element={<ProductComparison />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />

        {/* Admin Routes */}


        <Route path="*" element={<div className="container" style={{ padding: '40px' }}>404 Not Found</div>} />
      </Route>
      <Route path="admin">
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
