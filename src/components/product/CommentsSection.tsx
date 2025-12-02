import React, { useState, useEffect } from 'react';
import { MessageCircle, AlertCircle, Loader } from 'lucide-react';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { productsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './CommentsSection.css';

interface CommentData {
  _id: string;
  content: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CommentsSectionProps {
  productId: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ productId }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [canComment, setCanComment] = useState<boolean | null>(null);
  const [checkingPurchase, setCheckingPurchase] = useState(false);
  const [editingComment, setEditingComment] = useState<CommentData | null>(null);
  const { isAuthenticated, user } = useAuth();

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getComments(productId);
        if (response.success) {
          setComments(response.data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  // Check if user can comment (has purchased the product)
  useEffect(() => {
    const checkCommentPermission = async () => {
      if (!isAuthenticated || !user) {
        setCanComment(false);
        return;
      }

      try {
        setCheckingPurchase(true);
        const response = await productsAPI.checkCommentPermission(productId);
        if (response.success) {
          setCanComment(response.data.canComment);
        } else {
          setCanComment(false);
        }
      } catch (error) {
        console.error('Error checking comment permission:', error);
        setCanComment(false);
      } finally {
        setCheckingPurchase(false);
      }
    };

    checkCommentPermission();
  }, [isAuthenticated, user, productId]);

  const handleCreateComment = async (data: { content: string; rating: number }) => {
    try {
      const response = await productsAPI.createComment({
        productId,
        ...data
      });

      if (response.success) {
        setComments(prev => [response.data, ...prev]);
        setCanComment(false); // User can only comment once
      }
    } catch (error: any) {
      if (error.message?.includes('purchased')) {
        alert('Bạn chỉ có thể bình luận sản phẩm đã mua!');
      } else if (error.message?.includes('already commented')) {
        alert('Bạn đã bình luận sản phẩm này rồi!');
      } else {
        alert('Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại!');
      }
      throw error;
    }
  };

  const handleUpdateComment = async (data: { content: string; rating: number }) => {
    if (!editingComment) return;

    try {
      const response = await productsAPI.updateComment(editingComment._id, data);

      if (response.success) {
        setComments(prev =>
          prev.map(comment =>
            comment._id === editingComment._id ? response.data : comment
          )
        );
        setEditingComment(null);
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật bình luận. Vui lòng thử lại!');
      throw error;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Bạn có chắc muốn xóa bình luận này?')) return;

    try {
      const response = await productsAPI.deleteComment(commentId);

      if (response.success) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
        setCanComment(true); // Allow commenting again after deletion
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa bình luận. Vui lòng thử lại!');
    }
  };

  const handleEditComment = (commentId: string) => {
    const comment = comments.find(c => c._id === commentId);
    if (comment) {
      setEditingComment(comment);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  const averageRating = comments.length > 0
    ? Math.round((comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length) * 10) / 10
    : 0;

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2 className="comments-title">
          <MessageCircle size={24} />
          Bình luận ({comments.length})
          {comments.length > 0 && (
            <span className="average-rating">
              - Trung bình: {averageRating} ⭐
            </span>
          )}
        </h2>
      </div>

      {/* Comment Form */}
      {isAuthenticated && (
        <div className="comment-form-container">
          {checkingPurchase ? (
            <div className="purchase-check-loading">
              <Loader className="loading-spinner" size={20} />
              <span>Đang kiểm tra lịch sử mua hàng...</span>
            </div>
          ) : canComment === true ? (
            editingComment ? (
              <CommentForm
                productId={productId}
                onSubmit={handleUpdateComment}
                onCancel={handleCancelEdit}
                isEditing={true}
                initialData={{
                  content: editingComment.content,
                  rating: editingComment.rating
                }}
              />
            ) : (
              <CommentForm
                productId={productId}
                onSubmit={handleCreateComment}
              />
            )
          ) : canComment === false ? (
            <div className="cannot-comment-notice">
              <AlertCircle size={20} />
              <div>
                <strong>Bạn chưa thể bình luận sản phẩm này</strong>
                <p>Bạn cần mua và nhận sản phẩm thành công mới có thể bình luận. Hoặc bạn đã bình luận sản phẩm này rồi.</p>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {!isAuthenticated && (
        <div className="login-notice">
          <AlertCircle size={20} />
          <div>
            <strong>Đăng nhập để bình luận</strong>
            <p>Vui lòng đăng nhập để có thể bình luận về sản phẩm này.</p>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {loading ? (
          <div className="loading-container">
            <Loader className="loading-spinner" size={40} />
            <p>Đang tải bình luận...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              currentUserId={user?._id}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))
        ) : (
          <div className="no-comments">
            <MessageCircle size={48} />
            <h3>Chưa có bình luận nào</h3>
            <p>Hãy là người đầu tiên bình luận về sản phẩm này!</p>
          </div>
        )}
      </div>
    </div>
  );
};
