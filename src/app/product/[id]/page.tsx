'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { ShoppingCart, ArrowLeft, Heart, Share2, Check } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const product = productsData.find((p) => p.id === parseInt(resolvedParams.id));
    const { addToCart, setIsCartOpen } = useCart();

    if (!product) {
        notFound();
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <nav className="glass sticky top-0 z-50 px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-bold">Volver</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-full" />
                        <span className="text-lg font-black tracking-tighter text-primary">CHULI</span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-primary hover:text-white dark:bg-slate-800"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-inner">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {discount && (
                                <div className="absolute top-6 left-6 rounded-full bg-accent px-4 py-2 text-sm font-black text-white shadow-xl">
                                    -{discount}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-sm font-black tracking-widest text-secondary uppercase">
                            <span>{product.category}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-slate-400">SKU: CH-00{product.id}</span>
                        </div>

                        <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl dark:text-white">
                            {product.name}
                        </h1>

                        <div className="mt-6 flex items-baseline gap-4">
                            <span className="text-4xl font-black text-primary">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-slate-400 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="mt-8 text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                            {product.description}
                        </p>

                        <div className="mt-10 space-y-4 rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>Stock disponible y listo para enviar</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>Retiro gratis en nuestro pick-up point</span>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-lg font-black text-white shadow-2xl shadow-purple-500/30 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                Agregar al carrito
                            </button>
                            <button className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                                <Heart className="h-6 w-6" />
                            </button>
                            <button className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                                <Share2 className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
                            <h3 className="font-black">Detalles del producto</h3>
                            <ul className="mt-4 space-y-2 text-sm text-slate-500">
                                <li>• Material: Tela hipoalergénica premium</li>
                                <li>• Tamaño: 20cm x 15cm aprox.</li>
                                <li>• Lavable a máquina (programa suave)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
