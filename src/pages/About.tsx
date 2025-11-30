import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>VỀ CHÚNG TÔI</h1>

            <div className="about-content" style={{ lineHeight: '1.8', color: 'var(--color-gray-700)' }}>
                <p style={{ marginBottom: '16px' }}>
                    <strong>ATINO</strong> là thương hiệu thời trang nam được thành lập với sứ mệnh mang đến cho phái mạnh những trang phục hiện đại, lịch lãm và thoải mái nhất. Chúng tôi tin rằng thời trang không chỉ là vẻ bề ngoài, mà còn là cách bạn thể hiện cá tính và sự tự tin của mình.
                </p>

                <p style={{ marginBottom: '16px' }}>
                    Tại ATINO, chúng tôi chú trọng vào từng chi tiết nhỏ nhất, từ khâu chọn lựa chất liệu vải cao cấp, thiết kế form dáng phù hợp với hình thể người Việt, đến quy trình sản xuất tỉ mỉ. Mỗi sản phẩm của ATINO đều là kết tinh của sự tâm huyết và mong muốn mang lại trải nghiệm tốt nhất cho khách hàng.
                </p>

                <h3 style={{ fontSize: '20px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: 'var(--color-black)' }}>Tầm nhìn & Sứ mệnh</h3>
                <p style={{ marginBottom: '16px' }}>
                    Trở thành thương hiệu thời trang nam hàng đầu tại Việt Nam, là người bạn đồng hành tin cậy của nam giới trong mọi hoạt động hàng ngày, từ công sở, dạo phố đến những sự kiện quan trọng.
                </p>

                <h3 style={{ fontSize: '20px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: 'var(--color-black)' }}>Cam kết của chúng tôi</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
                    <li>Chất lượng sản phẩm luôn là ưu tiên hàng đầu.</li>
                    <li>Dịch vụ chăm sóc khách hàng tận tâm, chuyên nghiệp.</li>
                    <li>Chính sách đổi trả linh hoạt, bảo vệ quyền lợi người tiêu dùng.</li>
                    <li>Không ngừng đổi mới và sáng tạo để bắt kịp xu hướng thời trang thế giới.</li>
                </ul>
            </div>
        </div>
    );
};
