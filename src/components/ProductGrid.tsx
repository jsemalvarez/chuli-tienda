import ProductCard from './ProductCard';
import { Product } from '@/types/product';

export default function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl font-bold text-slate-400">No se encontraron productos.</p>
            </div>
        );
    }

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
