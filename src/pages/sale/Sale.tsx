import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Loader, ChevronDown, Percent } from 'lucide-react';
import './Sale.css';

export const Sale: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params: any = {
                    isSale: 'true',
                    sort: sortBy
                };

                const response = await productsAPI.getProducts(params);
                if (response.success) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching sale products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sortBy]);

    return (
        <div className="sale-page container">
            <div className="page-header">
                <div className="header-content">
                    <div className="header-icon">
                        <Percent size={48} />
                    </div>
                    <div className="header-text">
                        <h1 className="page-title">SẢN PHẨM KHUYẾN MÃI</h1>
                        <p className="page-subtitle">Săn deal hot với giá tốt nhất từ ATINO</p>
                        <div className="sale-badge">
                            <span>GIẢM GIÁ LÊN ĐẾN 30%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="products-controls">
                <div className="sort-group">
                    <span className="sort-label">Sắp xếp:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                    </select>
                    <ChevronDown size={16} className="select-icon" />
                </div>
            </div>

            <div className="product-grid">
                {loading ? (
                    <div className="loading-container">
                        <Loader className="loading-spinner" size={40} />
                        <p>Đang tải sản phẩm khuyến mãi...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">
                        <p>Không có sản phẩm khuyến mãi nào.</p>
                        <p>Hãy quay lại sau để xem các ưu đãi mới nhất!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
