import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { productsAPI } from '../../../services/api';
import type { Product } from '../../../data/products';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Package
} from 'lucide-react';
import './AdminProducts.css';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  // Future features - add/edit product modals
  // const [showAddModal, setShowAddModal] = useState(false);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesStatus = !filterStatus ||
      (filterStatus === 'active' && product.inStock) ||
      (filterStatus === 'inactive' && !product.inStock);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(products.map(p => p.category))];
  const stats = {
    total: products.length,
    active: products.filter(p => p.inStock).length,
    inactive: products.filter(p => !p.inStock).length
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await productsAPI.deleteProduct(productId);
        if (response.success) {
          setProducts(products.filter(p => p._id !== productId));
          alert('Xóa sản phẩm thành công!');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm!');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="admin-products">
        {/* Header */}
        <div className="products-header">
          <div className="header-stats">
            <div className="stat-item">
              <Package size={20} />
              <div>
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Tổng sản phẩm</span>
              </div>
            </div>
            <div className="stat-item active">
              <div>
                <span className="stat-number">{stats.active}</span>
                <span className="stat-label">Đang bán</span>
              </div>
            </div>
            <div className="stat-item inactive">
              <div>
                <span className="stat-number">{stats.inactive}</span>
                <span className="stat-label">Ngừng bán</span>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary add-product-btn"
            onClick={() => alert('Tính năng thêm sản phẩm sẽ được phát triển sau')}
            disabled
          >
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>

        {/* Filters */}
        <div className="products-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id || product.id}>
                    <td className="product-image-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-thumbnail"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </td>
                    <td className="product-name-cell">
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p>ID: {product._id || product.id}</p>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td className="price-cell">
                      {formatPrice(product.price)}
                      {product.originalPrice && (
                        <span className="original-price">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${product.inStock ? 'active' : 'inactive'}`}>
                        {product.inStock ? 'Đang bán' : 'Ngừng bán'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn view"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        title="Chỉnh sửa (sắp có)"
                        onClick={() => alert('Tính năng chỉnh sửa sản phẩm sẽ được phát triển sau')}
                        disabled
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        title="Xóa"
                        onClick={() => handleDelete(product._id || product.id || '')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="empty-state">
              <Package size={48} />
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
