'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Adds `loaded` to <body> (hero intro) and reveals `.reveal` elements on scroll.
export default function SiteFx() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('loaded');

    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
