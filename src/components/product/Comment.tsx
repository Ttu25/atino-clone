import React from 'react';
import { Star, User } from 'lucide-react';
import './Comment.css';

export interface CommentData {
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

export interface CommentProps {
  comment: CommentData;
  currentUserId?: string;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? '#ffc107' : 'none'}
        color={index < rating ? '#ffc107' : '#ddd'}
      />
    ));
  };

  const isOwner = currentUserId && comment.user._id === currentUserId;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-user">
          <div className="comment-avatar">
            {comment.user.avatar ? (
              <img src={comment.user.avatar} alt={comment.user.name} />
            ) : (
              <User size={20} />
            )}
          </div>
          <div className="comment-user-info">
            <span className="comment-username">{comment.user.name}</span>
            <div className="comment-rating">
              {renderStars(comment.rating)}
            </div>
          </div>
        </div>
        <div className="comment-actions">
          {isOwner && (
            <>
              {onEdit && (
                <button
                  className="comment-action-btn edit"
                  onClick={() => onEdit(comment._id)}
                >
                  Sửa
                </button>
              )}
              {onDelete && (
                <button
                  className="comment-action-btn delete"
                  onClick={() => onDelete(comment._id)}
                >
                  Xóa
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

      <div className="comment-footer">
        <span className="comment-date">
          {formatDate(comment.createdAt)}
          {comment.updatedAt !== comment.createdAt && (
            <span className="comment-edited">(đã chỉnh sửa)</span>
          )}
        </span>
      </div>
    </div>
  );
};
