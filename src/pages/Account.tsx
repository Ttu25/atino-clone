import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Edit2, Save } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './Account.css';

export const Account: React.FC = () => {
    const { user, logout, updateProfile, isAuthenticated } = useAuth();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/account' } } });
        }
    }, [isAuthenticated, navigate]);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Mock order data
    const orders = [
        {
            id: 'ATINO12345',
            date: '25/11/2024',
            total: 1450000,
            status: 'Đang giao',
            items: 3
        },
        {
            id: 'ATINO12344',
            date: '20/11/2024',
            total: 890000,
            status: 'Đã giao',
            items: 2
        }
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="account-page container">
            <h1 className="page-title">TÀI KHOẢN CỦA TÔI</h1>

            <div className="account-grid">
                <div className="account-sidebar">
                    <div className="user-card">
                        <div className="user-avatar">
                            <User size={48} />
                        </div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>

                    <nav className="account-nav">
                        <a href="#profile" className="nav-item active">
                            <User size={20} />
                            Thông tin cá nhân
                        </a>
                        <a href="#orders" className="nav-item">
                            <Package size={20} />
                            Đơn hàng của tôi
                        </a>
                        <a href="#wishlist" className="nav-item">
                            <Heart size={20} />
                            Danh sách yêu thích ({wishlistCount})
                        </a>
                        <button onClick={handleLogout} className="nav-item logout-btn">
                            <LogOut size={20} />
                            Đăng xuất
                        </button>
                    </nav>
                </div>

                <div className="account-content">
                    <section id="profile" className="content-section">
                        <div className="section-header">
                            <h2>Thông tin cá nhân</h2>
                            {!isEditing ? (
                                <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                                    <Edit2 size={18} />
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleSave}>
                                    <Save size={18} />
                                    Lưu
                                </button>
                            )}
                        </div>

                        <div className="profile-form">
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Chưa cập nhật"
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Chưa cập nhật"
                                />
                            </div>
                        </div>
                    </section>

                    <section id="orders" className="content-section">
                        <h2>Đơn hàng gần đây</h2>
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <strong>#{order.id}</strong>
                                            <span className="order-date">{order.date}</span>
                                        </div>
                                        <span className={`order-status status-${order.status === 'Đã giao' ? 'delivered' : 'shipping'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <span>{order.items} sản phẩm</span>
                                        <strong>{formatPrice(order.total)}</strong>
                                    </div>
                                    <button className="btn btn-outline view-order-btn">XEM CHI TIẾT</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
