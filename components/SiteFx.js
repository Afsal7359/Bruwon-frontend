'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Adds `loaded` to <body> (hero intro) and reveals `.reveal` elements on scroll.
// Robust to content that mounts AFTER this effect runs (streamed / Suspense
// content, slow API) via a MutationObserver, plus a failsafe so nothing can
// ever stay hidden if the observer never fires.
export default function SiteFx() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('loaded');

    const reveal = (el) => el.classList.add('in');

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              reveal(e.target);
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
      );
    }

    // Observe every not-yet-revealed element; reveal immediately if no IO support.
    const scan = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (io) io.observe(el);
        else reveal(el);
      });
    };
    scan();

    // Content wrapped in a Suspense/loading boundary commits after this effect —
    // watch the DOM so those elements get observed too.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Failsafe: whatever is still hidden shortly after load, just show it.
    const failsafe = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(reveal);
    }, 1400);

    // Stop watching once things have settled to avoid needless work.
    const settle = setTimeout(() => mo.disconnect(), 4000);

    return () => {
      if (io) io.disconnect();
      mo.disconnect();
      clearTimeout(failsafe);
      clearTimeout(settle);
    };
  }, [pathname]);

  return null;
}
