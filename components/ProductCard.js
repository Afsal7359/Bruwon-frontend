'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <article className="product reveal">
      <Link href={`/product/${product.slug}`} className="product-media" aria-label={product.name}>
        {product.tag ? (
          <span className={`tag${/limited|dark/i.test(product.tag) ? ' dark' : ''}`}>{product.tag}</span>
        ) : null}
        <div className="pglow" aria-hidden="true" />
        {product.image ? (
          <img className="pphoto" src={product.image} alt={product.name} loading="lazy" />
        ) : null}
        <div className="pm-scrim" aria-hidden="true" />
      </Link>
      <div className="product-body">
        <div className="row">
          <h3>
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <span className="price">{money(product.price, product.currency)}</span>
        </div>
        <p className="desc">{product.description}</p>
        {product.notes?.length ? (
          <div className="notes">
            {product.notes.map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>
        ) : null}
        <button className="add" onClick={() => add(product, 1)} aria-label={`Add ${product.name} to bag`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Add to bag</span>
        </button>
      </div>
    </article>
  );
}
