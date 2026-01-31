'use client';

import { useState, useMemo } from 'react';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Search, X, MapPin, CreditCard, MessageCircle, Home as HomeIcon } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';

export default function Home() {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const products = productsData as Product[];

  const categories = useMemo(() => {
    const allCategories = products.flatMap(p => p.categories);
    return ['Todos', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 md:pb-0 dark:bg-slate-950">
      <CartDrawer />

      {/* Mobile Top Header (Only Brand) */}
      <div className="sticky top-0 z-40 flex items-center justify-center gap-2 border-b bg-white px-6 py-3 md:hidden dark:bg-slate-900 dark:border-slate-800">
        <Image
          src="/logo.jpg"
          alt="Chuli Tienda Logo"
          width={32}
          height={32}
          className="rounded-full border border-primary"
        />
        <div className="text-xl font-black tracking-tighter text-primary">
          CHULI<span className="text-slate-800 dark:text-accent">TIENDA</span>
        </div>
      </div>

      {/* Navigation - Top (Desktop) / Bottom (Mobile) */}
      <nav className="fixed right-0 bottom-0 left-0 z-[100] border-t bg-white px-6 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b md:py-4 dark:bg-slate-900 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo - Hidden on mobile bottom nav, visible on desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <Image
              src="/logo.jpg"
              alt="Chuli Tienda Logo"
              width={40}
              height={40}
              className="rounded-full border-2 border-primary"
            />
            <div className="text-2xl font-black tracking-tighter text-primary">
              CHULI<span className="text-slate-800 dark:text-accent">TIENDA</span>
            </div>
          </div>

          {/* Mobile Bottom Nav Items */}
          <div className="flex w-full items-center justify-around md:w-auto md:justify-end md:gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-primary md:hidden"
            >
              <HomeIcon className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase tracking-tight">Inicio</span>
            </button>

            <a
              href="#productos"
              className="flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-primary md:hidden"
            >
              <Search className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase tracking-tight">Buscar</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex flex-col items-center gap-1 md:flex-row md:gap-2 md:rounded-2xl md:bg-slate-900 md:px-5 md:py-2.5 md:text-white dark:md:bg-white dark:md:text-slate-900"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6 md:h-4 md:w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] text-white ring-2 ring-white md:hidden">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight md:text-sm md:normal-case md:tracking-normal">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 hidden h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] text-white ring-4 ring-white md:flex dark:ring-slate-950">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-slate-100 px-6 py-20 dark:bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dwhdla1b4/image/upload/v1749601876/pcp-images/pcp_famila_mnh0rq.webp"
            alt="Hero Background"
            fill
            className="object-cover opacity-20 blur-xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex animate-fade-in items-center rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-primary shadow-sm backdrop-blur-md dark:bg-slate-800/80">
            ✨ ¡Ofertas todas las semanas! ✨
          </div>
          <h1 className="animate-fade-in text-5xl font-black tracking-tight text-slate-900 sm:text-7xl dark:text-white">
            Tu tienda favorita para <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              detalles inolvidables
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-in text-lg font-medium text-slate-600 [animation-delay:200ms] dark:text-slate-400">
            En Chuli Tienda seleccionamos los productos más tiernos y originales para alegrar tu día a día. Calidad, diseño y mucha dulzura.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12" id="productos">
        <div className="mb-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Nuestros productos</h2>
              <p className="mt-2 text-slate-500">Explora nuestra colección curada de ternura.</p>
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-2xl px-6 py-2.5 text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-purple-500/20 scale-105' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Buscador - Debajo de categorías, arriba de productos */}
          <div className="mt-8 relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl bg-white px-12 py-4 text-sm font-medium outline-none ring-1 ring-slate-200 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:ring-slate-800 dark:focus:ring-primary shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </main>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { title: 'Punto de entrega', icon: <MapPin className="h-8 w-8 text-primary" />, desc: 'Feria Infinita, Mar del Plata.' },
            { title: 'Aceptamos transferencias', icon: <CreditCard className="h-8 w-8 text-primary" />, desc: 'Cuenta DNI o MP' },
            { title: 'Atención Personalizada', icon: <MessageCircle className="h-8 w-8 text-primary" />, desc: 'Escribinos por WhatsApp.' },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-slate-900 transition-all hover:shadow-md group">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-primary/10 dark:bg-slate-800">
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      {/* <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-20 text-center text-white">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://res.cloudinary.com/dwhdla1b4/image/upload/v1749601876/pcp-images/pcp_famila_mnh0rq.webp"
              alt="Newsletter BG"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-4xl font-black">Sumate al Club Chuli</h2>
            <p className="mt-4 text-slate-400">Recibí descuentos exclusivos y enterate antes que nadie de los sorteos.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Ingresá tu email"
                className="flex-1 rounded-2xl bg-white/10 px-6 py-4 outline-none ring-1 ring-white/20 focus:ring-primary"
              />
              <button className="rounded-2xl bg-white px-8 py-4 font-black text-slate-900 transition-all hover:bg-primary hover:text-white">
                Quiero unirme
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="px-6 py-20 border-t dark:border-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="text-xl font-black tracking-tighter text-primary">
                  CHULI<span className="text-slate-800 dark:text-white">TIENDA</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Llevando alegría y ternura a cada hogar. Tu lugar seguro para regalar y regalarte.
              </p>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
            <div>
              <h4 className="mb-6 font-black text-slate-900 dark:text-white">Explorar</h4>
              <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Nuevos Ingresos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Lo más vendido</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ofertas Imperdibles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-black text-slate-900 dark:text-white">Ayuda</h4>
              <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {/* <li><a href="#" className="hover:text-primary transition-colors">Seguimiento de envío</a></li> */}
                <li><a href="#" className="hover:text-primary transition-colors">Políticas de cambio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-black text-slate-900 dark:text-white">Contacto</h4>
              <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                <li>📍 Mar del Plata, Buenos Aires</li>
                <li>📧 chuli.tienda.mdp@gmail.com</li>
                <li>📱 +54 9 223 3443659</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 border-t border-slate-100 pt-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800">
            © 2026 Chuli Tienda. Hecho con ❤️ para vos.
          </div>
        </div>
      </footer>
    </div>
  );
}
