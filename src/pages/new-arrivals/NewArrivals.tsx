import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Loader, ChevronDown } from 'lucide-react';
import './NewArrivals.css';

export const NewArrivals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params: any = {
                    isNew: 'true',
                    sort: sortBy
                };

                const response = await productsAPI.getProducts(params);
                if (response.success) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching new arrivals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sortBy]);

    return (
        <div className="new-arrivals-page container">
            <div className="page-header">
                <h1 className="page-title">HÀNG MỚI VỀ</h1>
                <p className="page-subtitle">Khám phá những sản phẩm mới nhất từ ATINO</p>
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
                        <p>Đang tải sản phẩm mới...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">
                        <p>Không có sản phẩm mới nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
