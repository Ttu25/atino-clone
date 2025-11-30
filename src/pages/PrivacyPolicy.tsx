import React from 'react';
import './PolicyPage.css';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="policy-page container">
            <h1 className="page-title">CHÍNH SÁCH BẢO MẬT</h1>

            <div className="policy-content">
                <section>
                    <h2>1. Thu thập thông tin cá nhân</h2>
                    <p>
                        Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký tài khoản, đặt hàng,
                        đăng ký nhận bản tin hoặc tham gia các chương trình khuyến mãi. Thông tin có thể bao gồm:
                    </p>
                    <ul>
                        <li>Họ tên, địa chỉ email, số điện thoại</li>
                        <li>Địa chỉ giao hàng và thanh toán</li>
                        <li>Thông tin thanh toán (được mã hóa an toàn)</li>
                        <li>Lịch sử mua hàng và sở thích</li>
                    </ul>
                </section>

                <section>
                    <h2>2. Sử dụng thông tin</h2>
                    <p>Thông tin cá nhân của bạn được sử dụng để:</p>
                    <ul>
                        <li>Xử lý và giao hàng đơn đặt hàng của bạn</li>
                        <li>Cải thiện dịch vụ khách hàng và trải nghiệm mua sắm</li>
                        <li>Gửi thông tin về sản phẩm mới, khuyến mãi (nếu bạn đồng ý)</li>
                        <li>Phân tích và cải thiện website</li>
                        <li>Phát hiện và ngăn chặn gian lận</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Bảo vệ thông tin</h2>
                    <p>
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật
                        tiên tiến, bao gồm:
                    </p>
                    <ul>
                        <li>Mã hóa SSL cho tất cả giao dịch</li>
                        <li>Lưu trữ dữ liệu an toàn trên máy chủ được bảo vệ</li>
                        <li>Giới hạn quyền truy cập thông tin chỉ cho nhân viên được ủy quyền</li>
                        <li>Kiểm tra bảo mật định kỳ</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Chia sẻ thông tin</h2>
                    <p>
                        Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho
                        bên thứ ba, ngoại trừ:
                    </p>
                    <ul>
                        <li>Đối tác vận chuyển để giao hàng</li>
                        <li>Nhà cung cấp dịch vụ thanh toán</li>
                        <li>Khi được yêu cầu bởi pháp luật</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Cookies</h2>
                    <p>
                        Website sử dụng cookies để cải thiện trải nghiệm người dùng. Bạn có thể
                        tắt cookies trong trình duyệt, nhưng điều này có thể ảnh hưởng đến một số
                        chức năng của website.
                    </p>
                </section>

                <section>
                    <h2>6. Quyền của bạn</h2>
                    <p>Bạn có quyền:</p>
                    <ul>
                        <li>Truy cập và cập nhật thông tin cá nhân</li>
                        <li>Yêu cầu xóa thông tin cá nhân</li>
                        <li>Từ chối nhận email marketing</li>
                        <li>Khiếu nại về việc xử lý dữ liệu cá nhân</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Liên hệ</h2>
                    <p>
                        Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ:
                    </p>
                    <p>
                        <strong>Email:</strong> privacy@atino.vn<br />
                        <strong>Điện thoại:</strong> 1900 xxxx
                    </p>
                </section>

                <p className="last-updated">
                    <em>Cập nhật lần cuối: 01/12/2024</em>
                </p>
            </div>
        </div>
    );
};
