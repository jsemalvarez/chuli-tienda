import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuli Tienda | Ternura y Diseño en cada detalle",
  description: "Descubre los productos más tiernos y originales en Chuli Tienda. Juguetes, decoración y accesorios con mucho color.",
  keywords: ["chuli tienda", "juguetes", "regalos", "decoración infantil", "ecommerce"],
  authors: [{ name: "Chuli Tienda" }],
  openGraph: {
    title: "Chuli Tienda | Ternura y Diseño en cada detalle",
    description: "La mejor selección de productos tiernos.",
    type: "website",
  }
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
