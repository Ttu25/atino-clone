import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Filter, ChevronDown, Loader } from 'lucide-react';
import './Products.css';

export const Products: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productsAPI.getCategories();
                if (response.success) {
                    setCategories(['All', ...response.data]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params: any = { sort: sortBy };

                if (selectedCategory !== 'All') {
                    params.category = selectedCategory;
                }

                const response = await productsAPI.getProducts(params);
                if (response.success) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, sortBy]);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    return (
        <div className="products-page container">
            <div className="products-header">
                <h1 className="page-title">
                    {selectedCategory === 'All' ? 'TẤT CẢ SẢN PHẨM' : selectedCategory.toUpperCase()}
                </h1>
                <div className="products-controls">
                    <div className="filter-group">
                        <Filter size={20} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

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
            </div>

            <div className="product-grid">
                {loading ? (
                    <div className="loading-container">
                        <Loader className="loading-spinner" size={40} />
                        <p>Đang tải sản phẩm...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">Không tìm thấy sản phẩm nào.</div>
                )}
            </div>
        </div>
    );
};
