import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { Star, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Black');
    const { addToCart } = useCart();

    useEffect(() => {
        const found = products.find(p => p.id === id);
        if (found) {
            setProduct(found);
        }
    }, [id]);

    if (!product) {
        return <div className="container loading">Loading...</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="product-detail-page container">
            <div className="product-detail-grid">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="thumbnail-list">
                        <div className="thumbnail active">
                            <img src={product.image} alt={product.name} />
                        </div>
                        {/* Mock thumbnails */}
                        <div className="thumbnail">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="thumbnail">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info-detail">
                    <h1 className="detail-title">{product.name}</h1>

                    <div className="detail-price-row">
                        <span className="detail-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                        {product.isSale && <span className="detail-badge-sale">SALE</span>}
                    </div>

                    <div className="detail-rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                            ))}
                        </div>
                        <span className="review-count">(12 đánh giá)</span>
                    </div>

                    <div className="detail-divider" />

                    {/* Options */}
                    <div className="detail-option">
                        <span className="option-label">Màu sắc: <strong>{selectedColor}</strong></span>
                        <div className="color-options">
                            {['Black', 'Navy', 'Grey'].map(color => (
                                <button
                                    key={color}
                                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="detail-option">
                        <span className="option-label">Kích thước: <strong>{selectedSize}</strong></span>
                        <div className="size-options">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button className="size-guide-btn">Hướng dẫn chọn size</button>
                    </div>

                    {/* Actions */}
                    <div className="detail-actions">
                        <div className="quantity-selector">
                            <button onClick={() => handleQuantityChange(-1)}><Minus size={16} /></button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={() => handleQuantityChange(1)}><Plus size={16} /></button>
                        </div>
                        <button
                            className="btn btn-primary add-to-cart-btn"
                            onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                        >
                            <ShoppingBag size={20} style={{ marginRight: 8 }} />
                            THÊM VÀO GIỎ
                        </button>
                        <button className="btn btn-outline wishlist-btn">
                            <Heart size={20} />
                        </button>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-description">
                        <h3>Mô tả sản phẩm</h3>
                        <p>
                            Chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt.
                            Thiết kế form dáng hiện đại, trẻ trung, dễ phối đồ.
                            Phù hợp đi làm, đi chơi, dạo phố.
                        </p>
                        <ul>
                            <li>Chất liệu: Cotton 100%</li>
                            <li>Form dáng: Slimfit</li>
                            <li>Xuất xứ: Việt Nam</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
