'use client';

import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Search } from 'lucide-react';

export default function Home() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950">
      <CartDrawer />

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
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

          {/* <div className="hidden gap-8 text-sm font-bold sm:flex">
            <a href="#" className="transition-colors hover:text-primary">Novedades</a>
            <a href="#" className="transition-colors hover:text-primary">Categorías</a>
            <a href="#" className="transition-colors hover:text-primary">Nosotros</a>
          </div> */}

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 md:block">
              <Search className="h-5 w-5" />
            </button>
            {/* <button className="hidden rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 md:block">
              <Heart className="h-5 w-5" />
            </button> */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary dark:bg-white dark:text-slate-900"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] text-white ring-4 ring-white dark:ring-slate-950">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-100 px-6 py-20 dark:bg-slate-900">
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
            ✨ ¡Nuevos ingresos de temporada! ✨
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
          <div className="mt-12 flex animate-fade-in items-center justify-center gap-4 [animation-delay:400ms]">
            {/* <button className="rounded-2xl bg-primary px-10 py-5 text-base font-black text-white shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-1 hover:bg-primary-hover hover:shadow-2xl">
              Ver Catálogo
            </button> */}
            {/* <button className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-base font-black text-slate-900 transition-all hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
              Sorteos 🎉
            </button> */}
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { title: 'Envíos a todo el país', icon: '🚚', desc: 'Llegamos a cada rincón con amor.' },
            { title: 'Pago Seguro', icon: '💳', desc: 'Tus datos están protegidos.' },
            { title: 'Atención Personalizada', icon: '💬', desc: 'Escribinos por WhatsApp.' },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 flex flex-col items-end justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Nuestros productos</h2>
            <p className="mt-2 text-slate-500">Tenemos ofertas de la semana por nuestra comunidad.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-0">
            {['Todos', 'Juguetes', 'Librería', 'Accesorios', 'Hogar'].map((cat) => (
              <button
                key={cat}
                className={`rounded-2xl px-6 py-2.5 text-sm font-bold transition-all ${cat === 'Todos' ? 'bg-primary text-white shadow-lg shadow-purple-500/20' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid />
      </main>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-6 py-20">
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
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t dark:border-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-full" />
                <div className="text-xl font-black tracking-tighter text-primary">
                  CHULI<span className="text-slate-800 dark:text-white">TIENDA</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Llevando alegría y ternura a cada hogar desde 2026. Tu lugar seguro para regalar y regalarte.
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
                <li><a href="#" className="hover:text-primary transition-colors">Seguimiento de envío</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Políticas de cambio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-black text-slate-900 dark:text-white">Contacto</h4>
              <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                <li>📍 Buenos Aires, Argentina</li>
                <li>📧 hola@chulitienda.com</li>
                <li>📱 +54 9 11 1234 5678</li>
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
