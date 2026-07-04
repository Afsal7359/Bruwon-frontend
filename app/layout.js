import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Bruwon™ — Pistachio Kunafa Chocolate',
  description:
    'Bruwon — a bar built to be broken. Toasted kunafa, single-origin chocolate and a molten pistachio core. Handcrafted in small batches.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
