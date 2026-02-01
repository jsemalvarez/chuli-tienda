'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { ShoppingCart, ArrowLeft, Share2, Check, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import CartDrawer from '@/components/CartDrawer';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const products = productsData as Product[];
    const product = products.find((p) => p.id === parseInt(resolvedParams.id));
    const { addToCart, setIsCartOpen, totalItems } = useCart();

    if (!product) {
        notFound();
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const handleShare = async () => {
        if (!product) return;

        const shareData = {
            title: product.name,
            text: `¡Mirá lo que encontré en CHULI! ${product.name}`,
            url: window.location.href,
        };

        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fallback for desktop or browsers that don't support Web Share API
            const shareText = `${shareData.text} ${shareData.url}`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24 md:pb-0 dark:bg-slate-950">
            <CartDrawer />

            {/* Mobile Top Header (Only Brand) */}
            <div className="sticky top-0 z-40 flex items-center justify-center gap-2 border-b bg-white px-6 py-3 md:hidden dark:bg-slate-900 dark:border-slate-800">
                <Image
                    src="/logo.jpg"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="rounded-full border border-primary"
                />
                <span className="text-lg font-black tracking-tighter text-primary">CHULI</span>
            </div>
            {/* Navigation - Top (Desktop) / Bottom (Mobile) */}
            <nav className="fixed right-0 bottom-0 left-0 z-[100] border-t bg-white px-6 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b md:py-4 dark:bg-slate-900 dark:border-slate-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    {/* Back Button - Always visible but styled differently on desktop */}
                    <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-primary md:flex-row md:gap-2">
                        <ArrowLeft className="h-6 w-6 md:h-5 md:w-5" />
                        <span className="text-[10px] font-bold uppercase tracking-tight md:text-sm md:normal-case md:tracking-normal">Volver</span>
                    </Link>

                    {/* Logo - Hidden on mobile bottom nav, visible on desktop */}
                    <div className="hidden items-center gap-2 md:flex">
                        <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-full" />
                        <span className="text-lg font-black tracking-tighter text-primary">CHULI</span>
                    </div>

                    {/* Mobile Items */}
                    <div className="flex items-center gap-8 md:gap-4">
                        {/* <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-primary md:hidden">
                            <HomeIcon className="h-6 w-6" />
                            <span className="text-[10px] font-bold uppercase tracking-tight">Inicio</span>
                        </Link> */}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="group relative flex flex-col items-center gap-1 md:flex-row md:gap-2 md:rounded-full md:bg-slate-100 md:p-2.5 md:transition-colors md:hover:bg-primary md:hover:text-white dark:md:bg-slate-800"
                        >
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] text-white ring-2 ring-white md:hidden">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tight md:hidden">Carrito</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 hidden h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] text-white ring-4 ring-white md:flex dark:ring-slate-950">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
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
                        <div className="flex flex-wrap items-center gap-2 text-sm font-black tracking-widest text-secondary uppercase">
                            {product.categories.map((cat, idx) => (
                                <span key={cat}>
                                    {cat}
                                    {idx < product.categories.length - 1 && (
                                        <span className="font-slate-300" > -</span>
                                    )}
                                </span>
                            ))}
                        </div>

                        <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl dark:text-white">
                            {product.name}
                        </h1>

                        <div className="mt-6 flex items-baseline gap-4">
                            <span className="text-4xl font-black text-primary">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-slate-400 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <p className="mt-8 text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                            {product.description}
                        </p>

                        <div className="mt-10 space-y-4 rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
                            {product.stock ? (
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Stock disponible</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 text-sm font-bold text-amber-600">
                                    <Clock className="h-5 w-5" />
                                    <span>Sin Stock (Lo podemos pedir)</span>
                                </div>
                            )}
                            {/* <div className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>Retiro gratis en nuestro pick-up point</span>
                            </div> */}
                        </div>

                        <div className="mt-10 flex flex-row gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-lg font-black text-white shadow-2xl shadow-purple-500/30 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                Agregar al carrito
                            </button>
                            {/* <button className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                                <Heart className="h-6 w-6" />
                            </button> */}
                            <button
                                onClick={handleShare}
                                className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-slate-200 transition-all hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 active:scale-90"
                                title="Compartir producto"
                            >
                                <Share2 className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
                            <h3 className="font-black">Detalles del producto</h3>
                            <ul className="mt-4 space-y-2 text-sm text-slate-500">
                                {product.details.map((detail, idx) => (
                                    <li key={idx}>• {detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
