import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import './OrderTracking.css';

interface OrderStatus {
    orderId: string;
    status: 'processing' | 'shipped' | 'delivered';
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    shippingAddress: string;
    estimatedDelivery: string;
}

export const OrderTracking: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Mock order lookup
        if (orderId.toLowerCase() === 'atino12345' && email.toLowerCase().includes('@')) {
            setOrderStatus({
                orderId: 'ATINO12345',
                status: 'shipped',
                items: [
                    { name: 'Áo Sơ Mi Trắng Premium', quantity: 2, price: 450000 },
                    { name: 'Quần Tây Đen Slimfit', quantity: 1, price: 550000 }
                ],
                total: 1450000,
                shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
                estimatedDelivery: '05/12/2024'
            });
        } else {
            setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng và email.');
            setOrderStatus(null);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const getStatusStep = (status: string) => {
        const steps = ['processing', 'shipped', 'delivered'];
        return steps.indexOf(status);
    };

    return (
        <div className="order-tracking-page container">
            <h1 className="page-title">THEO DÕI ĐƠN HÀNG</h1>

            <div className="tracking-form-section">
                <form onSubmit={handleSubmit} className="tracking-form">
                    <div className="form-group">
                        <label>Mã đơn hàng</label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Ví dụ: ATINO12345"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email đặt hàng</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">TRA CỨU</button>
                </form>

                {error && <div className="error-message">{error}</div>}
            </div>

            {orderStatus && (
                <div className="order-status-section">
                    <div className="order-header">
                        <h2>Đơn hàng #{orderStatus.orderId}</h2>
                        <span className={`status-badge status-${orderStatus.status}`}>
                            {orderStatus.status === 'processing' && 'Đang xử lý'}
                            {orderStatus.status === 'shipped' && 'Đang giao'}
                            {orderStatus.status === 'delivered' && 'Đã giao'}
                        </span>
                    </div>

                    <div className="status-timeline">
                        <div className={`timeline-step ${getStatusStep(orderStatus.status) >= 0 ? 'completed' : ''}`}>
                            <div className="step-icon"><Package size={24} /></div>
                            <div className="step-label">Đang xử lý</div>
                        </div>
                        <div className="timeline-line"></div>
                        <div className={`timeline-step ${getStatusStep(orderStatus.status) >= 1 ? 'completed' : ''}`}>
                            <div className="step-icon"><Truck size={24} /></div>
                            <div className="step-label">Đang giao hàng</div>
                        </div>
                        <div className="timeline-line"></div>
                        <div className={`timeline-step ${getStatusStep(orderStatus.status) >= 2 ? 'completed' : ''}`}>
                            <div className="step-icon"><CheckCircle size={24} /></div>
                            <div className="step-label">Đã giao</div>
                        </div>
                    </div>

                    <div className="order-details">
                        <div className="detail-section">
                            <h3>Sản phẩm</h3>
                            {orderStatus.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div className="order-total">
                                <strong>Tổng cộng:</strong>
                                <strong>{formatPrice(orderStatus.total)}</strong>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Địa chỉ giao hàng</h3>
                            <p>{orderStatus.shippingAddress}</p>
                        </div>

                        <div className="detail-section">
                            <h3>Dự kiến giao hàng</h3>
                            <p className="delivery-date">
                                <Clock size={18} style={{ marginRight: '8px' }} />
                                {orderStatus.estimatedDelivery}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="tracking-help">
                <p><strong>Gợi ý:</strong> Sử dụng mã đơn hàng "ATINO12345" với bất kỳ email nào để xem demo.</p>
            </div>
        </div>
    );
};
