'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
                <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out">
                    <div className="flex h-full flex-col bg-white shadow-2xl dark:bg-slate-900">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-6 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-black tracking-tight">Tu Carrito ({totalItems})</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {cart.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center">
                                    <div className="mb-4 rounded-full bg-slate-50 p-6 dark:bg-slate-800">
                                        <ShoppingBag className="h-12 w-12 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold">Tu carrito está vacío</h3>
                                    <p className="mt-2 text-sm text-slate-500">¡Parece que aún no has sumado nada tierno!</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-8 rounded-full bg-primary px-8 py-3 font-bold text-white shadow-lg"
                                    >
                                        Empezar a comprar
                                    </button>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {cart.map((item) => (
                                        <li key={item.id} className="flex gap-4">
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <div className="flex justify-between">
                                                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
                                                    <p className="font-black text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <div className="flex items-center rounded-xl border border-slate-200 p-1 dark:border-slate-800">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 hover:text-primary"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:text-primary"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-400 hover:text-accent"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t px-6 py-8 dark:border-slate-800">
                                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
                                    <span>Subtotal</span>
                                    <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">Envío e impuestos calculados al terminar.</p>
                                <button className="mt-8 w-full rounded-2xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-primary dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white">
                                    Finalizar Pedido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
