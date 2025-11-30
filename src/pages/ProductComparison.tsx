import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductComparison.css';

export const ProductComparison: React.FC = () => {
    const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
    const { addToCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (comparisonItems.length === 0) {
        return (
            <div className="comparison-page container">
                <h1 className="page-title">SO SÁNH SẢN PHẨM</h1>
                <div className="empty-comparison">
                    <p>Chưa có sản phẩm nào để so sánh</p>
                    <Link to="/products" className="btn btn-primary">KHÁM PHÁ SẢN PHẨM</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="comparison-page container">
            <div className="comparison-header">
                <h1 className="page-title">SO SÁNH SẢN PHẨM ({comparisonItems.length}/4)</h1>
                <button className="btn btn-outline" onClick={clearComparison}>XÓA TẤT CẢ</button>
            </div>

            <div className="comparison-table-wrapper">
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th className="feature-column">Đặc điểm</th>
                            {comparisonItems.map(item => (
                                <th key={item.id} className="product-column">
                                    <div className="product-header">
                                        <button
                                            className="remove-product-btn"
                                            onClick={() => removeFromComparison(item.id)}
                                        >
                                            <X size={20} />
                                        </button>
                                        <Link to={`/product/${item.id}`}>
                                            <img src={item.image} alt={item.name} />
                                        </Link>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="feature-label">Tên sản phẩm</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>
                                    <Link to={`/product/${item.id}`} className="product-name">{item.name}</Link>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Giá</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>
                                    <div className="price-cell">
                                        <span className="current-price">{formatPrice(item.price)}</span>
                                        {item.originalPrice && (
                                            <span className="original-price">{formatPrice(item.originalPrice)}</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Danh mục</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>{item.category}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Trạng thái</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>
                                    {item.isNew && <span className="badge badge-new">Mới</span>}
                                    {item.isSale && <span className="badge badge-sale">Sale</span>}
                                    {!item.isNew && !item.isSale && <span>-</span>}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Chất liệu</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>Cotton 100%</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Form dáng</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>Slimfit</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="feature-label">Thao tác</td>
                            {comparisonItems.map(item => (
                                <td key={item.id}>
                                    <button
                                        className="btn btn-primary add-to-cart-btn"
                                        onClick={() => addToCart(item, 1, 'M', 'Black')}
                                    >
                                        <ShoppingCart size={18} />
                                        THÊM VÀO GIỎ
                                    </button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
