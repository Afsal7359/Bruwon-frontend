'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { money } from '@/lib/format';
import api from '@/lib/api';

function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, currency, clear, ready } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '+91 ',
    line1: '', city: '', state: '', zip: '', country: 'India',
  });

  useEffect(() => {
    loadRazorpay();
  }, []);

  useEffect(() => {
    if (ready && items.length === 0 && !busy) {
      // nothing to check out
    }
  }, [ready, items.length, busy]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // phone: keep the +91 prefix, allow only digits/space after it
  const setPhone = (e) => {
    let v = e.target.value;
    if (!v.startsWith('+91')) v = '+91 ' + v.replace(/^\+?9?1?\s*/, '');
    setForm((f) => ({ ...f, phone: v }));
  };
  const setZip = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 6);
    setForm((f) => ({ ...f, zip: v }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 12) return 'Please enter a valid 10-digit phone number.'; // 91 + 10 digits
    if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      return 'Please enter a valid email (or leave it blank).';
    if (!form.line1.trim() || !form.city.trim()) return 'Please complete your shipping address.';
    if (form.zip.trim().length !== 6) return 'Please enter a valid 6-digit pincode.';
    return null;
  };

  const pay = async (e) => {
    e.preventDefault();
    setMsg(null);
    const err = validate();
    if (err) return setMsg({ type: 'err', text: err });
    if (items.length === 0) return setMsg({ type: 'err', text: 'Your bag is empty.' });

    setBusy(true);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.id, qty: i.qty })),
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: {
            line1: form.line1, city: form.city,
            state: form.state, zip: form.zip, country: form.country,
          },
        },
      };

      const res = await api.createOrder(payload);

      // Razorpay not configured on the server — save as pending and inform user.
      if (res.configured === false) {
        clear();
        router.push(`/order/success?order=${res.order.orderNumber}&pending=1`);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) {
        setMsg({ type: 'err', text: 'Could not load the payment gateway. Check your connection.' });
        setBusy(false);
        return;
      }

      const options = {
        key: res.keyId,
        amount: res.amount,
        currency: res.currency,
        name: 'Bruwon™',
        description: `Order ${res.orderNumber}`,
        order_id: res.razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { orderNumber: res.orderNumber },
        theme: { color: '#A9BD6E' },
        handler: async (response) => {
          try {
            await api.verifyOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clear();
            router.push(`/order/success?order=${res.orderNumber}`);
          } catch (verr) {
            setMsg({ type: 'err', text: `Payment captured but verification failed: ${verr.message}` });
            setBusy(false);
          }
        },
        modal: { ondismiss: () => { setBusy(false); setMsg({ type: 'warn', text: 'Payment cancelled. Your bag is safe.' }); } },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        setMsg({ type: 'err', text: `Payment failed: ${resp.error?.description || 'try again'}` });
        setBusy(false);
      });
      rzp.open();
    } catch (err) {
      setMsg({ type: 'err', text: err.message });
      setBusy(false);
    }
  };

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <section className="page">
        <div className="wrap">
          <div className="empty-state">
            <p style={{ fontSize: 20, color: 'var(--cream)' }}>Your bag is empty</p>
            <div style={{ marginTop: 20 }}>
              <Link href="/shop" className="btn btn--solid">Shop the bars <span className="arrow">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Almost yours</span>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          <form onSubmit={pay}>
            {msg && <div className={`alert ${msg.type}`}>{msg.text}</div>}

            <h3 style={{ margin: '6px 0 18px' }}>Contact</h3>
            <div className="field-row">
              <div className="field">
                <label>Full name</label>
                <input value={form.name} onChange={set('name')} placeholder="Reema A." required />
              </div>
              <div className="field">
                <label>Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={setPhone}
                  placeholder="+91 90000 00000"
                  inputMode="tel"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>Email <span className="muted" style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
            </div>

            <h3 style={{ margin: '24px 0 18px' }}>Shipping address</h3>
            <div className="field">
              <label>Address</label>
              <input value={form.line1} onChange={set('line1')} placeholder="Flat / House, Street, Area, Landmark" required />
            </div>
            <div className="field-row">
              <div className="field">
                <label>City</label>
                <input value={form.city} onChange={set('city')} required />
              </div>
              <div className="field">
                <label>State</label>
                <input value={form.state} onChange={set('state')} />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Pincode</label>
                <input
                  value={form.zip}
                  onChange={setZip}
                  placeholder="6-digit pincode"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
              </div>
              <div className="field">
                <label>Country</label>
                <input value={form.country} onChange={set('country')} />
              </div>
            </div>

            <button className="btn btn--solid" type="submit" disabled={busy} style={{ width: '100%', marginTop: 12 }}>
              {busy ? 'Processing…' : `Pay ${money(total, currency)}`} <span className="arrow">→</span>
            </button>
            <p className="muted" style={{ fontSize: 13, marginTop: 14, textAlign: 'center' }}>
              Secure payment via Razorpay · UPI, cards, netbanking &amp; wallets
            </p>
          </form>

          <div className="summary">
            <h3>Your order</h3>
            {items.map((i) => (
              <div className="mini-line" key={i.id}>
                <span>{i.name} × {i.qty}</span>
                <span>{money(i.price * i.qty, currency)}</span>
              </div>
            ))}
            <div className="row" style={{ borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 14 }}>
              <span>Subtotal</span><span>{money(subtotal, currency)}</span>
            </div>
            <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping, currency)}</span></div>
            <div className="row total"><span>Total</span><span>{money(total, currency)}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
