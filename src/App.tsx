import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Products } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { OrderTracking } from './pages/OrderTracking';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { Blog } from './pages/Blog';
import { Wishlist } from './pages/Wishlist';
import { ProductComparison } from './pages/ProductComparison';
import { Login } from './pages/Login';
import { Account } from './pages/Account';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="new-arrivals" element={<Products />} />
        <Route path="sale" element={<Products />} />
        <Route path="collections" element={<Products />} />
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
        <Route path="*" element={<div className="container" style={{ padding: '40px' }}>404 Not Found</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
