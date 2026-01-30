import ProductCard from './ProductCard';
import productsData from '@/data/products.json';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
}

export default function ProductGrid() {
    const products: Product[] = productsData;

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}
