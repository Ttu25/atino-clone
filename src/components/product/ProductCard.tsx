import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.isNew && <span className="badge badge-new">New</span>}
                {product.isSale && <span className="badge badge-sale">Sale</span>}
                <div className="product-overlay">
                    <button className="btn btn-primary quick-view-btn">XEM NHANH</button>
                </div>
            </Link>
            <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-name">
                    {product.name}
                </Link>
                <div className="product-price">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                        <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
