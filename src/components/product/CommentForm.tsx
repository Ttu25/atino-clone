import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import './CommentForm.css';

interface CommentFormProps {
  productId: string;
  onSubmit: (data: { content: string; rating: number }) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
  initialData?: {
    content: string;
    rating: number;
  };
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  onCancel,
  isEditing = false,
  initialData
}) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Vui lòng nhập nội dung bình luận');
      return;
    }

    if (content.length < 10) {
      alert('Nội dung bình luận phải ít nhất 10 ký tự');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ content: content.trim(), rating });
      if (!isEditing) {
        setContent('');
        setRating(5);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starRating = index + 1;
      const isActive = starRating <= (hoverRating || rating);

      return (
        <button
          key={index}
          type="button"
          className={`star-btn ${isActive ? 'active' : ''}`}
          onClick={() => setRating(starRating)}
          onMouseEnter={() => setHoverRating(starRating)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            size={24}
            fill={isActive ? '#ffc107' : 'none'}
            color={isActive ? '#ffc107' : '#ddd'}
          />
        </button>
      );
    });
  };

  return (
    <div className="comment-form">
      <h3 className="comment-form-title">
        {isEditing ? 'Chỉnh sửa bình luận' : 'Viết bình luận'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="rating-section">
          <label className="rating-label">Đánh giá:</label>
          <div className="stars-container">
            {renderStars()}
            <span className="rating-text">{rating}/5 sao</span>
          </div>
        </div>

        <div className="content-section">
          <label className="content-label">Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm này..."
            rows={4}
            maxLength={500}
            required
          />
          <div className="char-count">
            {content.length}/500 ký tự
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? (
              'Đang gửi...'
            ) : (
              <>
                <Send size={16} />
                {isEditing ? 'Cập nhật' : 'Gửi bình luận'}
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
