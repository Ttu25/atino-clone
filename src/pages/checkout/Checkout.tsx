import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

export const Checkout: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        note: ''
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock order submission
        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại ATINO.');
        clearCart();
        navigate('/');
    };

    if (items.length === 0) {
        return (
            <div className="container checkout-empty">
                <h2>Giỏ hàng trống</h2>
                <Link to="/" className="btn btn-primary">TIẾP TỤC MUA SẮM</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <h1 className="checkout-title">THANH TOÁN</h1>

            <div className="checkout-grid">
                <div className="checkout-form-section">
                    <h2>Thông tin giao hàng</h2>
                    <form onSubmit={handleSubmit} id="checkout-form">
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Nguyễn Văn A"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="0987654321"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Số nhà, tên đường"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tỉnh / Thành phố</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Hà Nội"
                            />
                        </div>

                        <div className="form-group">
                            <label>Ghi chú đơn hàng (Tùy chọn)</label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                    </form>
                </div>

                <div className="checkout-summary-section">
                    <h2>Đơn hàng của bạn</h2>
                    <div className="order-summary">
                        <div className="summary-items">
                            {items.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="summary-item">
                                    <div className="summary-item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-variant">{item.selectedColor} / {item.selectedSize} x {item.quantity}</span>
                                    </div>
                                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row">
                            <span>Tạm tính</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển</span>
                            <span>Miễn phí</span>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-total">
                            <span>Tổng cộng</span>
                            <span className="total-price">{formatPrice(cartTotal)}</span>
                        </div>

                        <div className="payment-method">
                            <h3>Phương thức thanh toán</h3>
                            <div className="payment-option">
                                <input type="radio" id="cod" name="payment" defaultChecked />
                                <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                            </div>
                            <div className="payment-option">
                                <input type="radio" id="banking" name="payment" disabled />
                                <label htmlFor="banking">Chuyển khoản ngân hàng (Đang bảo trì)</label>
                            </div>
                        </div>

                        <button type="submit" form="checkout-form" className="btn btn-primary place-order-btn">
                            ĐẶT HÀNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
