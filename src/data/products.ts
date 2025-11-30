export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Áo Len Cổ Khoá XL.3.5070',
        price: 350000,
        originalPrice: 450000,
        image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop',
        category: 'Áo Len',
        isNew: true,
        isSale: true,
    },
    {
        id: '2',
        name: 'Áo Khoác Dạ Măng Tô',
        price: 850000,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        category: 'Áo Khoác',
        isNew: true,
    },
    {
        id: '3',
        name: 'Quần Âu Slimfit Q.1.202',
        price: 420000,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
        category: 'Quần Âu',
    },
    {
        id: '4',
        name: 'Áo Sơ Mi Trắng Basic',
        price: 320000,
        originalPrice: 380000,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        category: 'Sơ Mi',
        isSale: true,
    },
    {
        id: '5',
        name: 'Áo Polo Basic P.2.105',
        price: 280000,
        image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1000&auto=format&fit=crop',
        category: 'Áo Polo',
    },
    {
        id: '6',
        name: 'Quần Jean Slimfit J.3.404',
        price: 480000,
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop',
        category: 'Quần Jean',
        isNew: true,
    },
    {
        id: '7',
        name: 'Áo Thun Basic T.1.001',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
        category: 'Áo Thun',
    },
    {
        id: '8',
        name: 'Áo Khoác Bomber K.2.303',
        price: 650000,
        originalPrice: 750000,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        category: 'Áo Khoác',
        isSale: true,
    },
];
