const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
export async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getProfile: () => apiRequest('/auth/me'),

  updateProfile: (data: any) =>
    apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// Products API
export const productsAPI = {
  getProducts: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/products?${queryString}`);
  },

  getProduct: (id: string) => apiRequest(`/products/${id}`),

  getCategories: () => apiRequest('/products/categories/list'),

  getFeatured: () => apiRequest('/products/featured'),

  getSale: () => apiRequest('/products/sale'),

  createProduct: (product: any) =>
    apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (id: string, product: any) =>
    apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),

  // Comments API
  getComments: (productId: string) => apiRequest(`/comments/${productId}`),

  createComment: (data: { productId: string; content: string; rating: number }) =>
    apiRequest('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateComment: (id: string, data: { content?: string; rating?: number }) =>
    apiRequest(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteComment: (id: string) =>
    apiRequest(`/comments/${id}`, {
      method: 'DELETE',
    }),

  checkCommentPermission: (productId: string) =>
    apiRequest(`/comments/can-comment/${productId}`),
};

// Cart API
export const cartAPI = {
  getCart: () => apiRequest('/cart'),

  addToCart: (item: any) =>
    apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  updateCartItem: (productId: string, data: any) =>
    apiRequest(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  removeFromCart: (productId: string, data: any) =>
    apiRequest(`/cart/${productId}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
    }),

  clearCart: () =>
    apiRequest('/cart', {
      method: 'DELETE',
    }),

  getCartCount: () => apiRequest('/cart/count'),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData: any) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getOrders: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/orders?${queryString}`);
  },

  getOrder: (id: string) => apiRequest(`/orders/${id}`),

  cancelOrder: (id: string) =>
    apiRequest(`/orders/${id}/cancel`, {
      method: 'PUT',
    }),

  updateOrderStatus: (id: string, status: string) =>
    apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ orderStatus: status }),
    }),

  getAdminOrders: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/orders/admin/all?${queryString}`);
  },

  getAdminStats: () => apiRequest('/orders/admin/stats'),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => apiRequest('/wishlist'),

  addToWishlist: (productId: string) =>
    apiRequest(`/wishlist/${productId}`, {
      method: 'POST',
    }),

  removeFromWishlist: (productId: string) =>
    apiRequest(`/wishlist/${productId}`, {
      method: 'DELETE',
    }),

  checkInWishlist: (productId: string) =>
    apiRequest(`/wishlist/check/${productId}`),

  clearWishlist: () =>
    apiRequest('/wishlist', {
      method: 'DELETE',
    }),

  getWishlistCount: () => apiRequest('/wishlist/count'),
};

// Blog API
export const blogAPI = {
  getPosts: (params?: any) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/blog?${queryString}`);
  },

  getPost: (id: string) => apiRequest(`/blog/${id}`),

  getCategories: () => apiRequest('/blog/categories/list'),

  getFeatured: () => apiRequest('/blog/featured'),

  createPost: (post: any) =>
    apiRequest('/blog', {
      method: 'POST',
      body: JSON.stringify(post),
    }),

  updatePost: (id: string, post: any) =>
    apiRequest(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    }),

  deletePost: (id: string) =>
    apiRequest(`/blog/${id}`, {
      method: 'DELETE',
    }),

  likePost: (id: string) =>
    apiRequest(`/blog/${id}/like`, {
      method: 'POST',
    }),
};
