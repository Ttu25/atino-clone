import express from 'express';
import { body } from 'express-validator';
import Comment from '../models/Comment.js';
import Order from '../models/Order.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Check if user can comment on a product
// @route   GET /api/comments/can-comment/:productId
// @access  Private
router.get('/can-comment/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: userId,
      'items.product': productId,
      status: { $in: ['delivered', 'completed'] }
    });

    // Check if user already commented
    const hasCommented = await Comment.findOne({
      user: userId,
      product: productId
    });

    res.json({
      success: true,
      canComment: !!hasPurchased && !hasCommented,
      hasPurchased: !!hasPurchased,
      hasCommented: !!hasCommented
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking comment permission',
      error: error.message
    });
  }
});

// @desc    Get all comments for a product
// @route   GET /api/comments/:productId
// @access  Public
router.get('/:productId', async (req, res) => {
  try {
    const comments = await Comment.find({ product: req.params.productId })
      .populate({
        path: 'user',
        select: 'name avatar'
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
});

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private (only users who have purchased the product)
router.post('/', protect, [
  body('productId').isMongoId().withMessage('Valid product ID is required'),
  body('content').trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be 10-500 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5')
], async (req, res) => {
  try {
    const { productId, content, rating } = req.body;
    const userId = req.user._id;

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: userId,
      'items.product': productId,
      status: { $in: ['delivered', 'completed'] }
    });

    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        message: 'You can only comment on products you have purchased'
      });
    }

    // Check if user already commented on this product
    const existingComment = await Comment.findOne({
      user: userId,
      product: productId
    });

    if (existingComment) {
      return res.status(400).json({
        success: false,
        message: 'You have already commented on this product'
      });
    }

    const comment = await Comment.create({
      product: productId,
      user: userId,
      content,
      rating
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate({
        path: 'user',
        select: 'name avatar'
      });

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message
    });
  }
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private (comment owner only)
router.put('/:id', protect, [
  body('content').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be 10-500 characters'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5')
], async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user owns this comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own comments'
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate({
      path: 'user',
      select: 'name avatar'
    });

    res.json({
      success: true,
      data: updatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment',
      error: error.message
    });
  }
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (comment owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user owns this comment or is admin
    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
});

export default router;
