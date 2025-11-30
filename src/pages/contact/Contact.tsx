import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="contact-page container">
            <h1 className="page-title">LIÊN HỆ</h1>

            <div className="contact-grid">
                <div className="contact-info">
                    <h2>Thông tin liên hệ</h2>
                    <div className="info-item">
                        <MapPin size={20} />
                        <div>
                            <strong>Địa chỉ</strong>
                            <p>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Phone size={20} />
                        <div>
                            <strong>Điện thoại</strong>
                            <p>1900 xxxx</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Mail size={20} />
                        <div>
                            <strong>Email</strong>
                            <p>support@atino.vn</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <Clock size={20} />
                        <div>
                            <strong>Giờ làm việc</strong>
                            <p>Thứ 2 - Thứ 7: 9:00 - 21:00</p>
                            <p>Chủ nhật: 10:00 - 18:00</p>
                        </div>
                    </div>

                    <div className="map-placeholder">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967814980494!2d106.69522431533432!3d10.776530192321514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb3ff69197b10ec4f!2zTmd1eeG7hW4gSHXhu4csIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="ATINO Location"
                        ></iframe>
                    </div>
                </div>

                <div className="contact-form-section">
                    <h2>Gửi tin nhắn</h2>
                    {submitted && (
                        <div className="success-message">
                            Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label>Họ và tên *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tiêu đề *</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nội dung *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">GỬI TIN NHẮN</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
