import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const success = await login(formData.email, formData.password);
                if (success) {
                    navigate(from, { replace: true });
                } else {
                    setError('Email hoặc mật khẩu không đúng');
                }
            } else {
                if (!formData.name.trim()) {
                    setError('Vui lòng nhập họ tên');
                    setLoading(false);
                    return;
                }
                const success = await register(formData.name, formData.email, formData.password);
                if (success) {
                    navigate(from, { replace: true });
                } else {
                    setError('Email đã được sử dụng');
                }
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <Link to="/" className="logo">ATINO</Link>
                    <h1>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</h1>
                    <p>{isLogin ? 'Chào mừng bạn quay trở lại' : 'Tạo tài khoản mới'}</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <div className="input-wrapper">
                                <UserIcon size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nguyễn Văn A"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <Mail size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <div className="input-wrapper">
                            <Lock size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : (isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                        </button>
                    </p>
                </div>

                <div className="demo-info">
                    <p><strong>Demo:</strong> email: demo@atino.vn | password: demo123</p>
                </div>
            </div>
        </div>
    );
};
