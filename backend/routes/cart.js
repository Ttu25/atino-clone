import express from 'express';
import { body } from 'express-validator';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post('/', protect, [
  body('productId').isMongoId().withMessage('Valid product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('selectedSize').trim().isLength({ min: 1 }).withMessage('Size is required'),
  body('selectedColor').trim().isLength({ min: 1 }).withMessage('Color is required')
], async (req, res) => {
  try {
    const { productId, quantity, selectedSize, selectedColor } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item =>
      item.product.toString() === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        selectedSize,
        selectedColor
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
router.put('/:productId', protect, [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('selectedSize').trim().isLength({ min: 1 }).withMessage('Size is required'),
  body('selectedColor').trim().isLength({ min: 1 }).withMessage('Color is required')
], async (req, res) => {
  try {
    const { quantity, selectedSize, selectedColor } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(item =>
      item.product.toString() === productId &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete('/:productId', protect, [
  body('selectedSize').trim().isLength({ min: 1 }).withMessage('Size is required'),
  body('selectedColor').trim().isLength({ min: 1 }).withMessage('Color is required')
], async (req, res) => {
  try {
    const { selectedSize, selectedColor } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Filter out the item
    cart.items = cart.items.filter(item =>
      !(item.product.toString() === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor)
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
router.get('/count', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    const count = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

    res.json({
      success: true,
      data: { count }
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
