import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bruwon-web.vercel.app'),
  title: {
    default: 'Bruwon™ — Pistachio Kunafa Chocolate',
    template: '%s · Bruwon™',
  },
  description:
    'Bruwon — a bar built to be broken. Toasted kunafa, single-origin chocolate and a molten pistachio core. Handcrafted in small batches.',
  applicationName: 'Bruwon',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Bruwon™',
    title: 'Bruwon™ — Pistachio Kunafa Chocolate',
    description: 'Handcrafted pistachio-kunafa chocolate. Small batches, packed fresh.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Bruwon' }],
  },
  twitter: {
    card: 'summary',
    title: 'Bruwon™ — Pistachio Kunafa Chocolate',
    description: 'Handcrafted pistachio-kunafa chocolate. Small batches, packed fresh.',
    images: ['/icon-512.png'],
  },
};

export const viewport = {
  themeColor: '#5A3A22',
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
