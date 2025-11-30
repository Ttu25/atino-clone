import React from 'react';
import './PolicyPage.css';

export const TermsOfService: React.FC = () => {
    return (
        <div className="policy-page container">
            <h1 className="page-title">ĐIỀU KHOẢN DỊCH VỤ</h1>

            <div className="policy-content">
                <section>
                    <h2>1. Chấp nhận điều khoản</h2>
                    <p>
                        Bằng việc truy cập và sử dụng website ATINO, bạn đồng ý tuân thủ các điều khoản
                        và điều kiện sau đây. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này,
                        vui lòng không sử dụng dịch vụ của chúng tôi.
                    </p>
                </section>

                <section>
                    <h2>2. Tài khoản người dùng</h2>
                    <ul>
                        <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi đăng ký</li>
                        <li>Bạn chịu trách nhiệm bảo mật thông tin tài khoản</li>
                        <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép</li>
                        <li>Một người chỉ được tạo một tài khoản</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Đặt hàng và thanh toán</h2>
                    <ul>
                        <li>Tất cả đơn hàng phải được xác nhận qua email</li>
                        <li>Giá cả có thể thay đổi mà không cần báo trước</li>
                        <li>Chúng tôi có quyền từ chối hoặc hủy đơn hàng trong một số trường hợp</li>
                        <li>Thanh toán phải được thực hiện đầy đủ trước khi giao hàng</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Giao hàng</h2>
                    <ul>
                        <li>Thời gian giao hàng chỉ mang tính chất ước tính</li>
                        <li>Chúng tôi không chịu trách nhiệm cho việc giao hàng chậm trễ do bất khả kháng</li>
                        <li>Khách hàng có trách nhiệm kiểm tra hàng hóa khi nhận</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Đổi trả và hoàn tiền</h2>
                    <ul>
                        <li>Sản phẩm có thể được đổi trả trong vòng 7 ngày</li>
                        <li>Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng</li>
                        <li>Chi phí vận chuyển đổi trả do khách hàng chịu (trừ lỗi từ nhà sản xuất)</li>
                        <li>Hoàn tiền sẽ được xử lý trong vòng 7-14 ngày làm việc</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Sở hữu trí tuệ</h2>
                    <p>
                        Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo, và thiết kế
                        đều thuộc quyền sở hữu của ATINO. Nghiêm cấm sao chép, phân phối hoặc
                        sử dụng cho mục đích thương mại mà không có sự cho phép.
                    </p>
                </section>

                <section>
                    <h2>7. Giới hạn trách nhiệm</h2>
                    <p>
                        ATINO không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp,
                        ngẫu nhiên hoặc hệ quả phát sinh từ việc sử dụng hoặc không thể sử dụng
                        website và dịch vụ của chúng tôi.
                    </p>
                </section>

                <section>
                    <h2>8. Thay đổi điều khoản</h2>
                    <p>
                        Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Các thay đổi
                        sẽ có hiệu lực ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng
                        dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
                    </p>
                </section>

                <section>
                    <h2>9. Luật áp dụng</h2>
                    <p>
                        Các điều khoản này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp
                        phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại TP. Hồ Chí Minh.
                    </p>
                </section>

                <p className="last-updated">
                    <em>Cập nhật lần cuối: 01/12/2024</em>
                </p>
            </div>
        </div>
    );
};
