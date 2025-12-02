import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Comment must belong to a product']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must belong to a user']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    required: [true, 'Rating is required']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
commentSchema.index({ product: 1, createdAt: -1 });
commentSchema.index({ user: 1 });

// Virtual populate for user info
commentSchema.virtual('userInfo', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user',
  justOne: true
});

export default mongoose.model('Comment', commentSchema);
