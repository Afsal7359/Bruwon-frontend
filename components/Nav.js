'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();
  const prevCount = useRef(count);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (count !== prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 450);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <Link href="/" className="logo" aria-label="Bruwon home">
        Bruwon<sup>™</sup>
      </Link>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks" onClick={() => setMenuOpen(false)}>
        <li><Link href="/#story">Story</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/#process">Process</Link></li>
      </ul>

      <div className="nav-right">
        <button className="cart-btn" onClick={() => setOpen(true)} aria-label="Open bag">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="lbl">Bag</span>
          <span className={`cart-count${count > 0 ? ' show' : ''}${bump ? ' bump' : ''}`}>{count}</span>
        </button>
        <button
          className={`burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
