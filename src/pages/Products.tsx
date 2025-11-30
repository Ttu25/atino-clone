import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import './Products.css';

export const Products: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            default: // newest
                result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        }

        setFilteredProducts(result);
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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="no-products">Không tìm thấy sản phẩm nào.</div>
                )}
            </div>
        </div>
    );
};
