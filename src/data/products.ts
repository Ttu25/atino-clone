export interface Product {
    _id?: string;
    id?: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
    description?: string;
    sizes?: string[];
    colors?: string[];
    inStock?: boolean;
    stockQuantity?: number;
}
