import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import type { Product } from '../data/products';

interface WishlistContextType {
    wishlistItems: Product[];
    loading: boolean;
    addToWishlist: (product: Product) => Promise<boolean>;
    removeFromWishlist: (productId: string) => Promise<boolean>;
    isInWishlist: (productId: string) => boolean;
    wishlistCount: number;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    // Load wishlist on mount
    const refreshWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await wishlistAPI.getWishlist();
                if (response.success) {
                    setWishlistItems(response.data.products || []);
                }
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
        }
    };

    useEffect(() => {
        refreshWishlist();
    }, []);

    const addToWishlist = async (product: Product): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await wishlistAPI.addToWishlist(product.id || product._id);

            if (response.success) {
                await refreshWishlist();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId: string): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await wishlistAPI.removeFromWishlist(productId);

            if (response.success) {
                await refreshWishlist();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => (item.id || item._id) === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                loading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                wishlistCount: wishlistItems.length,
                refreshWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};
