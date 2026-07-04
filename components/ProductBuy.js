'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductBuy({ product }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  const buyNow = () => {
    add(product, qty);
    router.push('/checkout');
  };

  return (
    <div className="pdp-actions">
      <div className="qty">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
      </div>
      <button className="btn btn--solid" onClick={() => add(product, qty)}>
        Add to bag <span className="arrow">→</span>
      </button>
      <button className="btn btn--ghost" onClick={buyNow}>Buy now</button>
    </div>
  );
}
