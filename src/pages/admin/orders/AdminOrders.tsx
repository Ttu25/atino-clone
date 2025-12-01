import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { ordersAPI } from '../../../services/api';
import {
  Eye,
  Search,
  ShoppingCart,
  Clock,
  CheckCircle,
  Settings
} from 'lucide-react';
import './AdminOrders.css';

interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: Array<{
    product: string; // ObjectId
    name: string;
    image: string;
    price: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
  }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  totalPrice: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('📦 Fetching orders from API...');

      const response = await ordersAPI.getAdminOrders();
      console.log('📦 Orders API response:', response);

      if (response.success) {
        const ordersData = response.data || [];
        console.log('✅ Loaded', ordersData.length, 'orders');

        // Debug: Check user population
        ordersData.forEach((order: Order, index: number) => {
          if (!order.user) {
            console.warn(`⚠️ Order ${order._id} has no user data`);
          } else {
            console.log(`👤 Order ${index + 1}: User ${order.user.name} (${order.user.email})`);
          }
        });

        setOrders(ordersData);
      } else {
        console.error('❌ Failed to load orders:', response);
        setOrders([]);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      // Fallback to empty array on error
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || order.orderStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đã giao';
      case 'delivered':
        return 'Đã nhận';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      console.log('🔄 Updating order', orderId, 'to status:', newStatus);
      const response = await ordersAPI.updateOrderStatus(orderId, newStatus);

      if (response.success) {
        // Update local state
        setOrders(orders.map(order =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus as Order['orderStatus'], updatedAt: new Date().toISOString() }
            : order
        ));
        console.log('✅ Order status updated successfully');
        alert('Cập nhật trạng thái đơn hàng thành công!');
      } else {
        console.error('❌ Failed to update order status:', response);
        alert('Có lỗi xảy ra khi cập nhật trạng thái!');
      }
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'pending').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    shipped: orders.filter(o => o.orderStatus === 'shipped').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length
  };

  return (
    <AdminLayout>
      <div className="admin-orders">
        {/* Stats Cards */}
        <div className="orders-stats">
          <div className="stat-card">
            <ShoppingCart size={24} />
            <div>
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Tổng đơn</span>
            </div>
          </div>
          <div className="stat-card pending">
            <Clock size={24} />
            <div>
              <span className="stat-number">{stats.pending}</span>
              <span className="stat-label">Chờ xử lý</span>
            </div>
          </div>
          <div className="stat-card processing">
            <Settings size={24} />
            <div>
              <span className="stat-number">{stats.processing}</span>
              <span className="stat-label">Đang xử lý</span>
            </div>
          </div>
          <div className="stat-card delivered">
            <CheckCircle size={24} />
            <div>
              <span className="stat-number">{stats.delivered}</span>
              <span className="stat-label">Hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="orders-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipped">Đã giao</option>
            <option value="delivered">Đã nhận</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Đang tải đơn hàng...</p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-number">{order.orderNumber}</td>
                    <td className="customer-info">
                      <div className="customer-name">{order.user?.name || 'N/A'}</div>
                      <div className="customer-email">{order.user?.email || 'N/A'}</div>
                    </td>
                    <td className="order-items">
                      {order.orderItems.length} sản phẩm
                      <div className="items-preview">
                        {order.orderItems.slice(0, 2).map((item, index) => (
                          <span key={index} className="item-preview">
                            {item.name.substring(0, 30)}...
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="order-total">{formatCurrency(order.totalPrice)}</td>
                    <td className="order-status">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`status-select ${order.orderStatus}`}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="shipped">Đã giao</option>
                        <option value="delivered">Đã nhận</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td className="order-date">{formatDate(order.createdAt)}</td>
                    <td className="actions-cell">
                      <button
                        className="action-btn view"
                        title="Xem chi tiết"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredOrders.length === 0 && (
            <div className="empty-state">
              <ShoppingCart size={48} />
              <h3>Không tìm thấy đơn hàng</h3>
              <p>Không có đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="order-detail-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Chi tiết đơn hàng {selectedOrder.orderNumber}</h2>
                <button
                  className="close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="order-info-grid">
                  <div className="info-section">
                    <h3>Thông tin khách hàng</h3>
                    <div className="info-item">
                      <span className="label">Họ tên:</span>
                      <span>{selectedOrder.user?.name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Email:</span>
                      <span>{selectedOrder.user?.email || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">ID:</span>
                      <span>{selectedOrder.user?._id || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Địa chỉ giao hàng</h3>
                    <div className="info-item">
                      <span className="label">Người nhận:</span>
                      <span>{selectedOrder.shippingAddress.fullName}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">SĐT:</span>
                      <span>{selectedOrder.shippingAddress.phone}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Địa chỉ:</span>
                      <span>{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Thông tin đơn hàng</h3>
                    <div className="info-item">
                      <span className="label">Trạng thái:</span>
                      <span className={`status-badge ${selectedOrder.orderStatus}`}>
                        {getStatusText(selectedOrder.orderStatus)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Thanh toán:</span>
                      <span>{selectedOrder.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Ngày tạo:</span>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="order-items-section">
                  <h3>Sản phẩm đã đặt</h3>
                  <div className="order-items-list">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image"
                        />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>Màu: {item.selectedColor} | Size: {item.selectedSize}</p>
                          <p>Số lượng: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-section">
                    <div className="total-row">
                      <span>Tổng cộng:</span>
                      <span className="total-amount">{formatCurrency(selectedOrder.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                {selectedOrder.note && (
                  <div className="order-note">
                    <h3>Ghi chú</h3>
                    <p>{selectedOrder.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
