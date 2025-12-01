import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Virtual for wishlist count
wishlistSchema.virtual('wishlistCount').get(function() {
  return this.products.length;
});

// Ensure virtual fields are serialized
wishlistSchema.set('toJSON', { virtuals: true });

// Index for faster queries
wishlistSchema.index({ user: 1 });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
