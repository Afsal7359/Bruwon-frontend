'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';

export default function CartPage() {
  const { items, subtotal, shipping, total, currency, setQty, remove, ready } = useCart();
  const router = useRouter();

  if (!ready) return null;

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Your bag</span>
          <h1>Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p style={{ fontSize: 20, color: 'var(--cream)' }}>Your bag is empty</p>
            <span>Add a bar and let the cracking begin.</span>
            <div style={{ marginTop: 24 }}>
              <Link href="/shop" className="btn btn--solid">Shop the bars <span className="arrow">→</span></Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-lines">
              {items.map((i) => (
                <div className="cart-line" key={i.id}>
                  <Link href={`/product/${i.slug}`} className="thumb">
                    {i.image ? <img src={i.image} alt={i.name} /> : null}
                  </Link>
                  <div>
                    <h4><Link href={`/product/${i.slug}`}>{i.name}</Link></h4>
                    <div className="lp">{money(i.price, currency)}</div>
                    <div className="qty" style={{ marginTop: 10, transform: 'scale(.92)', transformOrigin: 'left' }}>
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div className="tar">
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{money(i.price * i.qty, currency)}</div>
                    <button className="rm" onClick={() => remove(i.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary">
              <h3>Order summary</h3>
              <div className="row"><span>Subtotal</span><span>{money(subtotal, currency)}</span></div>
              <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping, currency)}</span></div>
              <div className="row total"><span>Total</span><span>{money(total, currency)}</span></div>
              <button className="btn btn--solid" onClick={() => router.push('/checkout')}>
                Checkout <span className="arrow">→</span>
              </button>
              <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 16, color: 'var(--cream-lt)', fontSize: 14 }}>
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
