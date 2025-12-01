import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>GIỎ HÀNG</h2>
                    <button onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <p>Giỏ hàng của bạn đang trống</p>
                            <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                                TIẾP TỤC MUA SẮM
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.product._id || item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.product.image} alt={item.product.name} />
                                </div>
                                <div className="cart-item-info">
                                    <h3 className="cart-item-title">{item.product.name}</h3>
                                    <div className="cart-item-variant">
                                        {item.selectedColor} / {item.selectedSize}
                                    </div>
                                    <div className="cart-item-price">{formatPrice(item.product.price)}</div>

                                    <div className="cart-item-actions">
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.product._id || item.product.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product._id || item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.product._id || item.product.id, item.selectedSize, item.selectedColor)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>TỔNG TIỀN:</span>
                            <span className="total-amount">{formatPrice(cartTotal)}</span>
                        </div>
                        <button
                            className="btn btn-primary checkout-btn"
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/checkout');
                            }}
                        >
                            THANH TOÁN
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
