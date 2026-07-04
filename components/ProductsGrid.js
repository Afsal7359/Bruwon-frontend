'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';

// Renders product cards from server-provided data, but if the server render
// came back empty (e.g. the backend was cold-starting and the server-side fetch
// timed out), it retries the fetch from the browser so products still appear.
export default function ProductsGrid({ initial = [] }) {
  const [products, setProducts] = useState(initial);
  const [tries, setTries] = useState(0);
  const loading = products.length === 0;

  useEffect(() => {
    if (initial.length > 0) return; // server data was fine — nothing to do
    let alive = true;
    let timer;

    const load = async () => {
      try {
        const p = await api.getProducts();
        if (alive && Array.isArray(p) && p.length > 0) {
          setProducts(p);
          return;
        }
      } catch {
        // ignore — will retry
      }
      // Backend may still be waking up (Render cold start ~20-50s). Retry a few times.
      if (alive && tries < 6) {
        timer = setTimeout(() => setTries((t) => t + 1), 4000);
      }
    };

    load();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [initial.length, tries]);

  if (loading) {
    return (
      <p className="muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '30px 0' }}>
        <span className="bl-ring" style={{ width: 28, height: 28, display: 'inline-block', verticalAlign: 'middle' }} />
        <span style={{ marginLeft: 12, verticalAlign: 'middle' }}>Bringing out the bars…</span>
      </p>
    );
  }

  return (
    <>
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </>
  );
}
