import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

export const Wishlist: React.FC = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleAddToCart = (item: typeof wishlistItems[0]) => {
        addToCart(item, 1, 'M', 'Black');
        removeFromWishlist(item.id);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-page container">
                <h1 className="page-title">DANH SÁCH YÊU THÍCH</h1>
                <div className="empty-wishlist">
                    <p>Danh sách yêu thích của bạn đang trống</p>
                    <Link to="/products" className="btn btn-primary">KHÁM PHÁ SẢN PHẨM</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page container">
            <h1 className="page-title">DANH SÁCH YÊU THÍCH ({wishlistItems.length})</h1>

            <div className="wishlist-grid">
                {wishlistItems.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <Link to={`/product/${item.id}`} className="wishlist-image">
                            <img src={item.image} alt={item.name} />
                        </Link>
                        <div className="wishlist-info">
                            <Link to={`/product/${item.id}`} className="wishlist-name">{item.name}</Link>
                            <div className="wishlist-price">
                                <span className="current-price">{formatPrice(item.price)}</span>
                                {item.originalPrice && (
                                    <span className="original-price">{formatPrice(item.originalPrice)}</span>
                                )}
                            </div>
                            <div className="wishlist-actions">
                                <button
                                    className="btn btn-primary add-to-cart-btn"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <ShoppingCart size={18} />
                                    THÊM VÀO GIỎ
                                </button>
                                <button
                                    className="btn btn-outline remove-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
