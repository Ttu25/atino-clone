import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import './AdminDashboard.css';

interface StatsData {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: any[];
  monthlyRevenue: number[];
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    monthlyRevenue: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Mock data for now - in real app, you'd have admin stats API
      const mockStats: StatsData = {
        totalProducts: 27,
        totalOrders: 156,
        totalUsers: 89,
        totalRevenue: 25000000,
        recentOrders: [
          {
            _id: '1',
            orderNumber: 'ORD-2025-001',
            customer: 'Nguyễn Văn A',
            total: 1250000,
            status: 'pending',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            orderNumber: 'ORD-2025-002',
            customer: 'Trần Thị B',
            total: 850000,
            status: 'processing',
            createdAt: new Date().toISOString()
          },
          {
            _id: '3',
            orderNumber: 'ORD-2025-003',
            customer: 'Lê Văn C',
            total: 2100000,
            status: 'shipped',
            createdAt: new Date().toISOString()
          }
        ],
        monthlyRevenue: [12000000, 15000000, 18000000, 22000000, 25000000, 28000000]
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#10b981';
      case 'delivered':
        return '#059669';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon products">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalProducts.toLocaleString()}</h3>
              <p>Tổng sản phẩm</p>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+12%</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalOrders.toLocaleString()}</h3>
              <p>Tổng đơn hàng</p>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+8%</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalUsers.toLocaleString()}</h3>
              <p>Tổng người dùng</p>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+15%</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>{formatCurrency(stats.totalRevenue)}</h3>
              <p>Doanh thu</p>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+22%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Recent Orders */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Đơn hàng gần đây</h2>
              <a href="/admin/orders" className="view-all-link">Xem tất cả</a>
            </div>
            <div className="orders-table">
              <div className="table-header">
                <div>Mã đơn</div>
                <div>Khách hàng</div>
                <div>Tổng tiền</div>
                <div>Trạng thái</div>
                <div>Ngày tạo</div>
              </div>
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="table-row">
                  <div className="order-number">{order.orderNumber}</div>
                  <div className="customer-name">{order.customer}</div>
                  <div className="order-total">{formatCurrency(order.total)}</div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="order-date">{formatDate(order.createdAt)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Thao tác nhanh</h2>
            </div>
            <div className="quick-actions">
              <a href="/admin/products" className="action-card">
                <Package size={32} />
                <h3>Thêm sản phẩm</h3>
                <p>Thêm sản phẩm mới vào cửa hàng</p>
              </a>
              <a href="/admin/orders" className="action-card">
                <ShoppingCart size={32} />
                <h3>Xử lý đơn hàng</h3>
                <p>Quản lý và xử lý đơn hàng</p>
              </a>
              <a href="/admin/users" className="action-card">
                <Users size={32} />
                <h3>Quản lý user</h3>
                <p>Xem và quản lý người dùng</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
