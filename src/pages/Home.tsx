import React from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import './Home.css';

export const Home: React.FC = () => {
    const newArrivals = products.filter(p => p.isNew);
    const saleProducts = products.filter(p => p.isSale);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">NEW COLLECTION 2024</h1>
                    <p className="hero-subtitle">Phong cách tối giản, hiện đại cho phái mạnh</p>
                    <button className="btn btn-primary hero-btn">MUA NGAY</button>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section container">
                <div className="section-header">
                    <h2 className="section-title">HÀNG MỚI VỀ</h2>
                    <p className="section-subtitle">Cập nhật những xu hướng thời trang mới nhất</p>
                </div>
                <div className="product-grid">
                    {newArrivals.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="section-footer">
                    <button className="btn btn-outline">XEM TẤT CẢ</button>
                </div>
            </section>

            {/* Banner Section */}
            <section className="banner-section">
                <div className="banner-content">
                    <h2>PHONG CÁCH LỊCH LÃM</h2>
                    <p>Khám phá bộ sưu tập Vest & Blazer</p>
                    <button className="btn btn-white">KHÁM PHÁ</button>
                </div>
            </section>

            {/* Sale Products */}
            <section className="section container">
                <div className="section-header">
                    <h2 className="section-title">SẢN PHẨM KHUYẾN MÃI</h2>
                    <p className="section-subtitle">Săn deal hot giá tốt mỗi ngày</p>
                </div>
                <div className="product-grid">
                    {saleProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="section-footer">
                    <button className="btn btn-outline">XEM TẤT CẢ</button>
                </div>
            </section>
        </div>
    );
};
