export default function manifest() {
  return {
    name: 'Bruwon™ — Pistachio Kunafa Chocolate',
    short_name: 'Bruwon',
    description:
      'Handcrafted pistachio-kunafa chocolate. Small batches, packed fresh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1C0F07',
    theme_color: '#5A3A22',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
