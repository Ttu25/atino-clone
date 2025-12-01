import express from 'express';
import { body } from 'express-validator';
import Blog from '../models/Blog.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { published: true };

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Author filter
    if (req.query.author) {
      filter.author = req.query.author;
    }

    // Search filter
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Featured filter
    if (req.query.featured === 'true') {
      filter.featured = true;
    }

    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first

    const blogPosts = await Blog.find(filter)
      .populate('author', 'name')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      data: blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name');

    if (!blogPost || !blogPost.published) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private/Admin
router.post('/', protect, authorize('admin'), [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt is required and must be less than 500 characters'),
  body('content').optional().trim(),
  body('image').trim().isLength({ min: 1 }).withMessage('Image URL is required'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('authorName').trim().isLength({ min: 1 }).withMessage('Author name is required')
], async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user._id,
      authorName: req.body.authorName || req.user.name
    };

    const blogPost = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blogPost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'name');

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await blogPost.deleteOne();

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get blog categories
// @route   GET /api/blog/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { published: true });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const blogPosts = await Blog.find({ published: true, featured: true })
      .populate('author', 'name')
      .limit(6)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: blogPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Like/Unlike blog post
// @route   POST /api/blog/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const userId = req.user._id;
    const likeIndex = blogPost.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      blogPost.likes.splice(likeIndex, 1);
    } else {
      // Like
      blogPost.likes.push(userId);
    }

    await blogPost.save();

    res.json({
      success: true,
      data: {
        likes: blogPost.likes.length,
        isLiked: likeIndex === -1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;
