import React from 'react';
import './PolicyPage.css';

export const ShippingPolicy: React.FC = () => {
    return (
        <div className="policy-page container">
            <h1 className="page-title">CHÍNH SÁCH VẬN CHUYỂN</h1>

            <div className="policy-content">
                <section>
                    <h2>1. Phạm vi giao hàng</h2>
                    <p>
                        ATINO cung cấp dịch vụ giao hàng toàn quốc. Chúng tôi hợp tác với các đơn vị
                        vận chuyển uy tín để đảm bảo hàng hóa được giao đến tay khách hàng một cách
                        nhanh chóng và an toàn.
                    </p>
                </section>

                <section>
                    <h2>2. Thời gian giao hàng</h2>
                    <div className="shipping-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Khu vực</th>
                                    <th>Thời gian dự kiến</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nội thành TP.HCM</td>
                                    <td>1-2 ngày làm việc</td>
                                </tr>
                                <tr>
                                    <td>Ngoại thành TP.HCM</td>
                                    <td>2-3 ngày làm việc</td>
                                </tr>
                                <tr>
                                    <td>Các tỉnh thành khác</td>
                                    <td>3-5 ngày làm việc</td>
                                </tr>
                                <tr>
                                    <td>Vùng sâu, vùng xa</td>
                                    <td>5-7 ngày làm việc</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="note">
                        <strong>Lưu ý:</strong> Thời gian giao hàng có thể thay đổi tùy thuộc vào
                        tình hình thực tế và các yếu tố bất khả kháng.
                    </p>
                </section>

                <section>
                    <h2>3. Phí vận chuyển</h2>
                    <ul>
                        <li><strong>Miễn phí vận chuyển:</strong> Đơn hàng từ 500.000đ trở lên (nội thành TP.HCM)</li>
                        <li><strong>Nội thành TP.HCM:</strong> 30.000đ</li>
                        <li><strong>Ngoại thành TP.HCM:</strong> 40.000đ</li>
                        <li><strong>Các tỉnh thành khác:</strong> 50.000đ - 80.000đ</li>
                    </ul>
                    <p>
                        Phí vận chuyển sẽ được tính tự động khi bạn nhập địa chỉ giao hàng trong
                        quá trình thanh toán.
                    </p>
                </section>

                <section>
                    <h2>4. Hình thức thanh toán</h2>
                    <ul>
                        <li><strong>COD (Thanh toán khi nhận hàng):</strong> Áp dụng cho tất cả đơn hàng</li>
                        <li><strong>Chuyển khoản ngân hàng:</strong> Giảm 2% phí vận chuyển</li>
                        <li><strong>Ví điện tử:</strong> Momo, ZaloPay, VNPay</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Kiểm tra hàng hóa</h2>
                    <p>Khách hàng có quyền:</p>
                    <ul>
                        <li>Kiểm tra tình trạng bên ngoài của kiện hàng trước khi nhận</li>
                        <li>Từ chối nhận hàng nếu bao bì bị rách, ướt, hoặc có dấu hiệu bất thường</li>
                        <li>Quay video khi mở hàng để làm bằng chứng nếu có vấn đề</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Giao hàng không thành công</h2>
                    <p>Trong trường hợp giao hàng không thành công:</p>
                    <ul>
                        <li>Đơn vị vận chuyển sẽ liên hệ lại khách hàng để sắp xếp giao hàng lần 2</li>
                        <li>Nếu không liên hệ được sau 3 lần, đơn hàng sẽ được hoàn về kho</li>
                        <li>Khách hàng có thể liên hệ hotline để sắp xếp lại giao hàng</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Theo dõi đơn hàng</h2>
                    <p>
                        Sau khi đơn hàng được giao cho đơn vị vận chuyển, bạn sẽ nhận được mã vận đơn
                        qua email hoặc SMS. Bạn có thể theo dõi tình trạng đơn hàng tại trang
                        <a href="/order-tracking"> Theo dõi đơn hàng</a>.
                    </p>
                </section>

                <section>
                    <h2>8. Liên hệ hỗ trợ</h2>
                    <p>
                        Nếu bạn có bất kỳ thắc mắc nào về vận chuyển, vui lòng liên hệ:
                    </p>
                    <p>
                        <strong>Hotline:</strong> 1900 xxxx<br />
                        <strong>Email:</strong> shipping@atino.vn<br />
                        <strong>Giờ làm việc:</strong> 9:00 - 21:00 (Thứ 2 - Thứ 7)
                    </p>
                </section>

                <p className="last-updated">
                    <em>Cập nhật lần cuối: 01/12/2024</em>
                </p>
            </div>
        </div>
    );
};
