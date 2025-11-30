import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-column">
                    <h3>VỀ ATINO</h3>
                    <Link to="/about">Giới thiệu</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Liên hệ</Link>
                </div>

                <div className="footer-column">
                    <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                    <Link to="/order-tracking">Tra cứu đơn hàng</Link>
                    <Link to="/shipping-policy">Chính sách vận chuyển</Link>
                    <Link to="/privacy-policy">Chính sách bảo mật</Link>
                    <Link to="/terms-of-service">Điều khoản dịch vụ</Link>
                </div>

                <div className="footer-column">
                    <h3>LIÊN HỆ</h3>
                    <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                    <p>Điện thoại: 1900 xxxx</p>
                    <p>Email: support@atino.vn</p>
                </div>

                <div className="footer-column">
                    <h3>ĐĂNG KÝ NHẬN TIN</h3>
                    <p>Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Email của bạn" />
                        <button type="submit" className="btn btn-primary">ĐĂNG KÝ</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2025 ATINO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
