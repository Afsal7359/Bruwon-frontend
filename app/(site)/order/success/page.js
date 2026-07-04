'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { money, fmtDate } from '@/lib/format';

function SuccessInner() {
  const params = useSearchParams();
  const orderNumber = params.get('order');
  const pending = params.get('pending') === '1';
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderNumber) return;
    api.trackOrder(orderNumber).then(setOrder).catch(() => {});
  }, [orderNumber]);

  return (
    <section className="page">
      <div className="wrap">
        <div className="success-card">
          <div className="ico">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l6 6L20 6" />
            </svg>
          </div>
          <h1 style={{ fontSize: 34, marginBottom: 12 }}>
            {pending ? 'Order placed' : 'Thank you!'}
          </h1>
          <p className="muted" style={{ marginBottom: 8 }}>
            {pending
              ? 'Your order was saved. Payment is pending — our team will reach out to complete it.'
              : 'Your payment was successful and your order is confirmed.'}
          </p>
          {orderNumber && (
            <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--cream)' }}>
              Order {orderNumber}
            </p>
          )}

          {order && (
            <div style={{ margin: '26px auto 0', maxWidth: 380, textAlign: 'left' }}>
              {order.items?.map((i, idx) => (
                <div className="mini-line" key={idx}>
                  <span>{i.name} × {i.qty}</span>
                  <span>{money(i.price * i.qty, order.currency)}</span>
                </div>
              ))}
              <div className="row total" style={{ borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span>Total</span><span>{money(order.total, order.currency)}</span>
              </div>
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>Placed {fmtDate(order.createdAt)}</p>
            </div>
          )}

          <div style={{ marginTop: 30 }}>
            <Link href="/shop" className="btn btn--solid">Keep shopping <span className="arrow">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<section className="page"><div className="wrap center-note">Loading…</div></section>}>
      <SuccessInner />
    </Suspense>
  );
}
