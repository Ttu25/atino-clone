import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import type { Product } from '../../data/products';
import { Star, Minus, Plus, ShoppingBag, Heart, Loader, Ruler, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import './ProductDetail.css';
import toast from 'react-hot-toast';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addingToWishlist, setAddingToWishlist] = useState(false);

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();

    // Mock additional images for the product
    const getProductImages = (product: Product) => {
        return [
            product.image,
            product.image, // Mock additional images
            product.image,
            product.image
        ];
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);
                const response = await productsAPI.getProduct(id);
                if (response.success) {
                    setProduct(response.data);
                    // Set default size and color
                    if (response.data.sizes && response.data.sizes.length > 0) {
                        setSelectedSize(response.data.sizes[0]);
                    }
                    if (response.data.colors && response.data.colors.length > 0) {
                        setSelectedColor(response.data.colors[0]);
                    }
                } else {
                    setError('Không thể tải thông tin sản phẩm');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container loading">
                <Loader className="loading-spinner" size={40} />
                <p>Đang tải sản phẩm...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container error">
                <div className="error-message">
                    <h2>Không thể tải sản phẩm</h2>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="container">Không tìm thấy sản phẩm</div>;
    }

    const productImages = getProductImages(product);
    const isWishlisted = isInWishlist(product.id || product._id || '');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, quantity + delta);
        setQuantity(newQuantity);
    };

    const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        // Check authentication first
        if (!isAuthenticated) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        // Validation
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert('Vui lòng chọn kích thước');
            return;
        }
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            alert('Vui lòng chọn màu sắc');
            return;
        }

        // Check if product is in stock
        if (product.stockQuantity !== undefined && product.stockQuantity <= 0) {
            alert('Sản phẩm đã hết hàng');
            return;
        }

        // Check if product has valid ID
        if (!product._id && !product.id) {
            alert('Không thể thêm sản phẩm này vào giỏ hàng. Vui lòng thử lại sau.');
            return;
        }

        try {
            setAddingToCart(true);
            const success = await addToCart(product, quantity, selectedSize, selectedColor);
            if (success) {
                toast.success('Đã thêm vào giỏ hàng!')
            } else {
                alert('Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại!');
        } finally {
            setAddingToCart(false);
        }
    };

    const handleWishlistToggle = async () => {
        // Check authentication first
        if (!isAuthenticated) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích');
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        try {
            setAddingToWishlist(true);
            const productId = product.id || product._id;
            if (!productId) return;

            if (isWishlisted) {
                await removeFromWishlist(productId);
            } else {
                await addToWishlist(product);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        } finally {
            setAddingToWishlist(false);
        }
    };

    const SizeGuideModal = () => (
        <div className="size-guide-modal" onClick={() => setShowSizeGuide(false)}>
            <div className="size-guide-content" onClick={(e) => e.stopPropagation()}>
                <div className="size-guide-header">
                    <h3>Hướng dẫn chọn size</h3>
                    <button 
                        className="close-btn"
                        onClick={() => setShowSizeGuide(false)}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="size-guide-body">
                    <table className="size-table">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Chiều cao (cm)</th>
                                <th>Cân nặng (kg)</th>
                                <th>Ngực (cm)</th>
                                <th>Eo (cm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>S</td>
                                <td>155-165</td>
                                <td>45-55</td>
                                <td>80-88</td>
                                <td>68-76</td>
                            </tr>
                            <tr>
                                <td>M</td>
                                <td>165-175</td>
                                <td>55-65</td>
                                <td>88-96</td>
                                <td>76-84</td>
                            </tr>
                            <tr>
                                <td>L</td>
                                <td>175-185</td>
                                <td>65-75</td>
                                <td>96-104</td>
                                <td>84-92</td>
                            </tr>
                            <tr>
                                <td>XL</td>
                                <td>185-195</td>
                                <td>75-85</td>
                                <td>104-112</td>
                                <td>92-100</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="size-guide-tips">
                        <h4>Lưu ý:</h4>
                        <ul>
                            <li>Size chart chỉ mang tính chất tham khảo</li>
                            <li>Vui lòng đo số đo của bạn và so sánh với bảng size</li>
                            <li>Nếu bạn đang ở giữa 2 size, hãy chọn size lớn hơn</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="product-detail-page container">
            {showSizeGuide && <SizeGuideModal />}
            
            <div className="product-detail-grid">
                {/* Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img 
                            src={productImages[selectedImageIndex]} 
                            alt={product.name} 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>
                    <div className="thumbnail-list">
                        {productImages.map((image, index) => (
                            <div 
                                key={index}
                                className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <img 
                                    src={image} 
                                    alt={`${product.name} ${index + 1}`}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/placeholder-image.jpg';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info-detail">
                    <h1 className="detail-title">{product.name}</h1>

                    <div className="detail-price-row">
                        <span className="detail-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                        {product.isSale && <span className="detail-badge-sale">SALE</span>}
                    </div>

                    <div className="detail-rating">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                            ))}
                        </div>
                        <span className="review-count">(12 đánh giá)</span>
                    </div>

                    <div className="detail-divider" />

                    {/* Options */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="detail-option">
                            <span className="option-label">Màu sắc: <strong>{selectedColor}</strong></span>
                            <div className="color-options">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="detail-option">
                            <span className="option-label">Kích thước: <strong>{selectedSize}</strong></span>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <button 
                                className="size-guide-btn"
                                onClick={() => setShowSizeGuide(true)}
                            >
                                <Ruler size={14} style={{ marginRight: 4 }} />
                                Hướng dẫn chọn size
                            </button>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="detail-actions">
                        <div className="quantity-selector">
                            <button onClick={() => handleQuantityChange(-1)}>
                                <Minus size={16} />
                            </button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={handleQuantityInputChange}
                                min="1"
                            />
                            <button onClick={() => handleQuantityChange(1)}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <button
                            className={`btn btn-primary add-to-cart-btn ${addingToCart ? 'loading' : ''}`}
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                        >
                            {addingToCart ? (
                                <Loader size={20} className="loading-spinner" />
                            ) : (
                                <>
                                    <ShoppingBag size={20} style={{ marginRight: 8 }} />
                                    THÊM VÀO GIỎ
                                </>
                            )}
                        </button>
                        <button 
                            className={`btn btn-outline wishlist-btn ${isWishlisted ? 'active' : ''} ${addingToWishlist ? 'loading' : ''}`}
                            onClick={handleWishlistToggle}
                            disabled={addingToWishlist}
                            title={isWishlisted ? 'Xóa khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
                        >
                            {addingToWishlist ? (
                                <Loader size={20} className="loading-spinner" />
                            ) : (
                                <Heart 
                                    size={20} 
                                    fill={isWishlisted ? 'currentColor' : 'none'}
                                />
                            )}
                        </button>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-description">
                        <h3>Mô tả sản phẩm</h3>
                        {product.description ? (
                            <p>{product.description}</p>
                        ) : (
                            <p>
                                Chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt.
                                Thiết kế form dáng hiện đại, trẻ trung, dễ phối đồ.
                                Phù hợp đi làm, đi chơi, dạo phố.
                            </p>
                        )}
                        <ul>
                            <li>Chất liệu: Cotton 100%</li>
                            <li>Form dáng: Slimfit</li>
                            <li>Xuất xứ: Việt Nam</li>
                            <li>Tình trạng: {product.inStock ? 'Còn hàng' : 'Hết hàng'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};