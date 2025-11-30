import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';

interface ComparisonContextType {
    comparisonItems: Product[];
    addToComparison: (product: Product) => boolean;
    removeFromComparison: (productId: string) => void;
    clearComparison: () => void;
    isInComparison: (productId: string) => boolean;
    comparisonCount: number;
    maxItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const MAX_COMPARISON_ITEMS = 4;
    const [comparisonItems, setComparisonItems] = useState<Product[]>(() => {
        const saved = localStorage.getItem('atino-comparison');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('atino-comparison', JSON.stringify(comparisonItems));
    }, [comparisonItems]);

    const addToComparison = (product: Product): boolean => {
        if (comparisonItems.length >= MAX_COMPARISON_ITEMS) {
            return false;
        }
        if (comparisonItems.find(item => item.id === product.id)) {
            return false;
        }
        setComparisonItems(prev => [...prev, product]);
        return true;
    };

    const removeFromComparison = (productId: string) => {
        setComparisonItems(prev => prev.filter(item => item.id !== productId));
    };

    const clearComparison = () => {
        setComparisonItems([]);
    };

    const isInComparison = (productId: string) => {
        return comparisonItems.some(item => item.id === productId);
    };

    return (
        <ComparisonContext.Provider
            value={{
                comparisonItems,
                addToComparison,
                removeFromComparison,
                clearComparison,
                isInComparison,
                comparisonCount: comparisonItems.length,
                maxItems: MAX_COMPARISON_ITEMS
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within ComparisonProvider');
    }
    return context;
};
