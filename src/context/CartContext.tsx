import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { cartAPI } from '../services/api';

export interface CartItem {
    _id?: string;
    product: {
        _id: string;
        id: string;
        name: string;
        price: number;
        image: string;
        category: string;
    };
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartContextType {
    items: CartItem[];
    loading: boolean;
    addToCart: (product: Product, quantity: number, size: string, color: string) => Promise<boolean>;
    removeFromCart: (productId: string, size: string, color: string) => Promise<boolean>;
    updateQuantity: (productId: string, size: string, color: string, quantity: number) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
    refreshCart: () => Promise<void>;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart on mount and when auth changes
    const refreshCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await cartAPI.getCart();
                if (response.success) {
                    setItems(response.data.items || []);
                } else {
                    // Token might be invalid, clear cart
                    setItems([]);
                }
            } else {
                // No token, clear cart
                setItems([]);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            // If error (likely 401), clear cart
            setItems([]);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    // Listen for authentication changes
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token') {
                refreshCart();
            }
        };

        const handleTokenChange = () => {
            refreshCart();
        };

        window.addEventListener('storage', handleStorageChange);
        // Custom event for token changes within the same tab
        window.addEventListener('tokenChanged', handleTokenChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tokenChanged', handleTokenChange);
        };
    }, []);

    const addToCart = async (product: Product, quantity: number, size: string, color: string): Promise<boolean> => {
        try {
            setLoading(true);
            // Use _id if available, otherwise use id, and ensure it's a valid value
            const productId = product._id || product.id;
            if (!productId) {
                console.error('Product ID is missing');
                return false;
            }

            const response = await cartAPI.addToCart({
                productId: productId,
                quantity,
                selectedSize: size,
                selectedColor: color
            });

            if (response.success) {
                setItems(response.data.items || []);
                setIsCartOpen(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId: string, size: string, color: string): Promise<boolean> => {
        try {
            setLoading(true);
            if (!productId) {
                console.error('Product ID is missing');
                return false;
            }

            const response = await cartAPI.removeFromCart(productId, {
                selectedSize: size,
                selectedColor: color
            });

            if (response.success) {
                setItems(response.data.items || []);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing from cart:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: string, size: string, color: string, quantity: number): Promise<boolean> => {
        try {
            setLoading(true);
            if (!productId) {
                console.error('Product ID is missing');
                return false;
            }

            const response = await cartAPI.updateCartItem(productId, {
                quantity,
                selectedSize: size,
                selectedColor: color
            });

            if (response.success) {
                setItems(response.data.items || []);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating cart item:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async (): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await cartAPI.clearCart();

            if (response.success) {
                setItems([]);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const cartTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, loading, addToCart, removeFromCart, updateQuantity, clearCart, refreshCart,
            isCartOpen, setIsCartOpen, cartTotal, cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
