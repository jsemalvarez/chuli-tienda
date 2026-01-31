export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number | null;
    image: string;
    categories: string[];
    featured?: boolean;
    stock: boolean;
    details: string[];
}
