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
