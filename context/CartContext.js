'use client';
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'bruwon_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price, image, slug, qty }]
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((product, qty = 1) => {
    const id = product._id || product.id;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: product.price,
          image: product.image,
          slug: product.slug,
          currency: product.currency || 'INR',
          shipping: Number(product.shipping || 0),
          qty,
        },
      ];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  // per-order shipping = highest box shipping fee in the cart (0 = free)
  const shipping = useMemo(() => items.reduce((m, i) => Math.max(m, Number(i.shipping || 0)), 0), [items]);
  const total = subtotal + shipping;
  const currency = items[0]?.currency || 'INR';

  const value = {
    items,
    count,
    subtotal,
    shipping,
    total,
    currency,
    open,
    ready,
    setOpen,
    add,
    setQty,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
