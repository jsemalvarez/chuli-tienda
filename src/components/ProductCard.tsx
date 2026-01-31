'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <div className="group relative flex h-full flex-col rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {discount && (
                    <div className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                        -{discount}%
                    </div>
                )}
                {product.featured && !discount && (
                    <div className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
                        Nuevo
                    </div>
                )}
            </div>

            <div className="mt-5 flex flex-1 flex-col gap-2">
                <span className="text-[10px] font-black tracking-[0.2em] text-secondary uppercase">
                    {product.categories[0]}
                </span>
                <Link
                    href={`/product/${product.id}`}
                    className="text-lg font-bold text-slate-800 transition-colors hover:text-primary dark:text-slate-100"
                >
                    {product.name}
                </Link>
                <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="rounded-2xl bg-slate-900 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-primary active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
