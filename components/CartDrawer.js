'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';

export default function CartDrawer() {
  const { items, subtotal, currency, open, setOpen, setQty, remove } = useCart();
  const router = useRouter();

  const goCheckout = () => {
    setOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      <div className={`overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer${open ? ' open' : ''}`} aria-label="Shopping bag" aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Your bag</h3>
          <button className="x" onClick={() => setOpen(false)} aria-label="Close bag">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your bag is empty</p>
              <span className="ce-sub">Add a bar and let the cracking begin.</span>
            </div>
          ) : (
            <div className="cart-lines">
              {items.map((i) => (
                <div className="cart-line" key={i.id}>
                  <div className="thumb">{i.image ? <img src={i.image} alt={i.name} /> : null}</div>
                  <div>
                    <h4>{i.name}</h4>
                    <div className="lp">{money(i.price, currency)}</div>
                    <div className="qty" style={{ marginTop: 8, transform: 'scale(.9)', transformOrigin: 'left' }}>
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div className="tar">
                    <div style={{ fontWeight: 700 }}>{money(i.price * i.qty, currency)}</div>
                    <button className="rm" onClick={() => remove(i.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot" style={{ display: 'block' }}>
            <div className="subtotal">
              <span className="sl">Subtotal</span>
              <span className="sv">{money(subtotal, currency)}</span>
            </div>
            <p className="ship-note">Shipping &amp; taxes calculated at checkout.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/cart" className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setOpen(false)}>
                View bag
              </Link>
              <button className="btn btn--solid" style={{ flex: 1 }} onClick={goCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
