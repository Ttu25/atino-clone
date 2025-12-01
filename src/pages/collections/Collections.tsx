import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Loader, Filter, ChevronDown, Grid3X3, List } from 'lucide-react';
import './Collections.css';

interface CategoryStats {
    name: string;
    count: number;
    image: string;
}

export const Collections: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<CategoryStats[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsResponse, categoriesResponse] = await Promise.all([
                    productsAPI.getProducts({ sort: sortBy }),
                    productsAPI.getCategories()
                ]);

                if (productsResponse.success) {
                    setProducts(productsResponse.data);

                    // Calculate category stats
                    const categoryStats = ['All', ...categoriesResponse.data].map(catName => {
                        if (catName === 'All') {
                            return {
                                name: 'All',
                                count: productsResponse.data.length,
                                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop'
                            };
                        }
                        const count = productsResponse.data.filter((p: Product) => p.category === catName).length;
                        return {
                            name: catName,
                            count,
                            image: getCategoryImage(catName)
                        };
                    });

                    setCategories(categoryStats);
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortBy]);

    const getCategoryImage = (category: string): string => {
        const categoryImages: { [key: string]: string } = {
            'Áo Len': 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=400&auto=format&fit=crop',
            'Áo Khoác': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop',
            'Quần Âu': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop',
            'Sơ Mi': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop',
            'Áo Polo': 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=400&auto=format&fit=crop',
            'Quần Jean': 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=400&auto=format&fit=crop',
            'Áo Thun': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop'
        };
        return categoryImages[category] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop';
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="collections-page container">
            <div className="page-header">
                <h1 className="page-title">BỘ SƯU TẬP</h1>
                <p className="page-subtitle">Khám phá các bộ sưu tập thời trang nam từ ATINO</p>
            </div>

            {/* Category Navigation */}
            <div className="category-nav">
                {categories.map(category => (
                    <div
                        key={category.name}
                        className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <div className="category-image">
                            <img src={category.image} alt={category.name} />
                        </div>
                        <div className="category-info">
                            <h3>{category.name}</h3>
                            <span>{category.count} sản phẩm</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="products-controls">
                <div className="results-info">
                    <p>Hiển thị {filteredProducts.length} sản phẩm</p>
                </div>

                <div className="controls-right">
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

                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid3X3 size={20} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className={`product-${viewMode}`}>
                {loading ? (
                    <div className="loading-container">
                        <Loader className="loading-spinner" size={40} />
                        <p>Đang tải bộ sưu tập...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                    ))
                ) : (
                    <div className="no-products">
                        <p>Không có sản phẩm nào trong danh mục này.</p>
                        <button onClick={() => setSelectedCategory('All')} className="btn btn-primary">
                            Xem tất cả sản phẩm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
