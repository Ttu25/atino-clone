import  { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Loader } from 'lucide-react';
import './Home.css';

export const Home = () => {
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [saleProducts, setSaleProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔄 Home component mounted, starting API calls...');
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const [featuredResponse, saleResponse] = await Promise.all([
                    productsAPI.getFeatured(),
                    productsAPI.getSale()
                ]);


                if (featuredResponse.success) {
                    setNewArrivals(featuredResponse.data);
                    console.log('✅ Featured products loaded:', featuredResponse.data.length, 'products');
                } else {
                    console.log('❌ Featured products failed:', featuredResponse);
                }

                if (saleResponse.success) {
                    setSaleProducts(saleResponse.data);
                    console.log('✅ Sale products loaded:', saleResponse.data.length, 'products');
                } else {
                    console.log('❌ Sale products failed:', saleResponse);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">NEW COLLECTION 2025</h1>
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
                    {loading ? (
                        <div className="loading-container">
                            <Loader className="loading-spinner" size={40} />
                            <p>Đang tải sản phẩm...</p>
                            <p>Backend URL: http://localhost:5000</p>
                        </div>
                    ) : newArrivals.length > 0 ? (
                        <>
                            {newArrivals.map(product => (
                                <ProductCard key={product.id || product._id} product={product} />
                            ))}
                        </>
                    ) : (
                        <div className="no-products">
                            <p>❌ Không có sản phẩm mới nào.</p>
                            <p>Kiểm tra console để xem lỗi API call.</p>
                        </div>
                    )}
                </div>
                <div className="section-footer">
                    <button className="btn btn-outline">XEM TẤT CẢ</button>
                </div>
            </section>

            {/* Sale Products */}
            <section className="section container">
                <div className="section-header">
                    <h2 className="section-title">SẢN PHẨM KHUYẾN MÃI</h2>
                    <p className="section-subtitle">Săn deal hot giá tốt mỗi ngày</p>
                </div>
                <div className="product-grid">
                    {loading ? (
                        <div className="loading-container">
                            <Loader className="loading-spinner" size={40} />
                            <p>Đang tải sản phẩm...</p>
                        </div>
                    ) : saleProducts.length > 0 ? (
                        <>
                            {saleProducts.map(product => (
                                <ProductCard key={product.id || product._id} product={product} />
                            ))}
                        </>
                    ) : (
                        <div className="no-products">
                            <p>❌ Không có sản phẩm khuyến mãi nào.</p>
                            <p>Kiểm tra console để xem lỗi API call.</p>
                        </div>
                    )}
                </div>
                <div className="section-footer">
                    <button className="btn btn-outline">XEM TẤT CẢ</button>
                </div>
            </section>
        </div>
    );
};
