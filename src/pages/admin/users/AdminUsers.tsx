import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import {
  Users,
  UserCheck,
  UserX,
  Crown,
  Search,
  Edit,
  Eye
} from 'lucide-react';
import { adminUsersAPI } from '../../../services/adminAPI';
import type { AdminUser, UserStats } from '../../../services/adminAPI';
import './AdminUsers.css';

// Using AdminUser from adminAPI

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [currentPage, filterRole, filterStatus, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await adminUsersAPI.getUsers({
        page: currentPage,
        limit: 20,
        role: filterRole || undefined,
        status: filterStatus || undefined,
        search: searchTerm || undefined
      });

      if (response.success) {
        setUsers(response.data);
        console.log(`✅ Loaded ${response.data.length} users (page ${currentPage}/${response.pagination.pages})`);
      } else {
        console.error('❌ Failed to load users:', response);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminUsersAPI.getUserStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.includes(searchTerm);
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus ||
                         (filterStatus === 'active' && user.isActive) ||
                         (filterStatus === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await adminUsersAPI.updateUserStatus(userId, !currentStatus);

      if (response.success) {
        setUsers(users.map(user =>
          user._id === userId
            ? { ...user, isActive: !currentStatus }
            : user
        ));
        // Refresh stats
        fetchStats();
        alert(`Đã ${!currentStatus ? 'kích hoạt' : 'vô hiệu hóa'} tài khoản thành công!`);
      } else {
        alert(response.message || 'Có lỗi xảy ra khi cập nhật trạng thái!');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const changeUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const response = await adminUsersAPI.updateUserRole(userId, newRole);

      if (response.success) {
        setUsers(users.map(user =>
          user._id === userId
            ? { ...user, role: newRole }
            : user
        ));
        // Refresh stats
        fetchStats();
        alert(`Đã cập nhật quyền thành công!`);
      } else {
        alert(response.message || 'Có lỗi xảy ra khi cập nhật quyền!');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Có lỗi xảy ra khi cập nhật quyền!');
    }
  };

  // Use stats from API or fallback to calculated values
  const displayStats = stats || {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length
  };

  return (
    <AdminLayout>
      <div className="admin-users">
        {/* Stats Cards */}
        <div className="users-stats">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <span className="stat-number">{displayStats.total}</span>
              <span className="stat-label">Tổng người dùng</span>
            </div>
          </div>
          <div className="stat-card active">
            <UserCheck size={24} />
            <div>
              <span className="stat-number">{displayStats.active}</span>
              <span className="stat-label">Đang hoạt động</span>
            </div>
          </div>
          <div className="stat-card inactive">
            <UserX size={24} />
            <div>
              <span className="stat-number">{displayStats.inactive}</span>
              <span className="stat-label">Đã vô hiệu hóa</span>
            </div>
          </div>
          <div className="stat-card admin">
            <Crown size={24} />
            <div>
              <span className="stat-number">{displayStats.admins}</span>
              <span className="stat-label">Quản trị viên</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="users-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">Tất cả quyền</option>
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã vô hiệu hóa</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-table-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách người dùng...</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Liên hệ</th>
                  <th>Quyền</th>
                  <th>Trạng thái</th>
                  <th>Đơn hàng</th>
                  <th>Ngày tạo</th>
                  <th>Đăng nhập cuối</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="user-info-cell">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-id">ID: {user._id}</div>
                      </div>
                    </td>
                    <td className="contact-info">
                      <div className="contact-email">{user.email}</div>
                      {user.phone && (
                        <div className="contact-phone">{user.phone}</div>
                      )}
                      {user.address && (
                        <div className="contact-address" title={user.address}>
                          {user.address.length > 30
                            ? `${user.address.substring(0, 30)}...`
                            : user.address
                          }
                        </div>
                      )}
                    </td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => changeUserRole(user._id, e.target.value as 'user' | 'admin')}
                        className={`role-select ${user.role}`}
                        disabled={user.email === 'admin@atino.com'} // Prevent changing main admin
                      >
                        <option value="user">Người dùng</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                    <td>
                      <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                        {user.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                      </span>
                    </td>
                    <td className="order-count">
                      {user.orderCount || 0} đơn
                    </td>
                    <td className="created-date">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="last-login">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Chưa đăng nhập'}
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
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className={`action-btn ${user.isActive ? 'deactivate' : 'activate'}`}
                        title={user.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        onClick={() => toggleUserStatus(user._id, user.isActive)}
                      >
                        {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredUsers.length === 0 && (
            <div className="empty-state">
              <Users size={48} />
              <h3>Không tìm thấy người dùng</h3>
              <p>Không có người dùng nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
