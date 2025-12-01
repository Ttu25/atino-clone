import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  selectedSize: {
    type: String,
    required: true,
    trim: true
  },
  selectedColor: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});

// Virtual for cart total
cartSchema.virtual('cartTotal').get(function() {
  return this.items.reduce((total, item) => {
    // Note: This would need to be populated to get actual price
    return total + (item.quantity * 100000); // Placeholder calculation
  }, 0);
});

// Virtual for cart count
cartSchema.virtual('cartCount').get(function() {
  return this.items.reduce((count, item) => count + item.quantity, 0);
});

// Ensure virtual fields are serialized
cartSchema.set('toJSON', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
