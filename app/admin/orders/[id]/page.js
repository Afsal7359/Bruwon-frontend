'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { money, fmtDate } from '@/lib/format';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';

const STATUSES = ['created', 'paid', 'failed', 'fulfilled', 'cancelled'];

export default function AdminOrderDetailPage({ params }) {
  const handleError = useAuthErrorHandler();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('created');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  async function load() {
    const token = getToken();
    if (!token) return;
    try {
      const o = await api.adminOrder(token, params.id);
      setOrder(o);
      setStatus(o.status || 'created');
      setNotes(o.notes || '');
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to load order.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSave() {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    setError('');
    setOk('');
    try {
      const updated = await api.updateOrder(token, params.id, { status, notes });
      if (updated && updated._id) setOrder(updated);
      setOk('Order updated.');
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to update order.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="center-note">Loading…</div>;
  if (!order) {
    return (
      <>
        <div className="admin-topbar">
          <h1>Order</h1>
          <Link className="btn-sm ghost" href="/admin/orders">
            Back
          </Link>
        </div>
        {error ? <div className="alert err">{error}</div> : <div className="center-note">Not found.</div>}
      </>
    );
  }

  const c = order.customer || {};
  const addr = c.address || {};
  const pay = order.payment || {};
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <>
      <div className="admin-topbar">
        <h1>Order {order.orderNumber || order._id}</h1>
        <Link className="btn-sm ghost" href="/admin/orders">
          Back
        </Link>
      </div>

      {error ? <div className="alert err">{error}</div> : null}
      {ok ? <div className="alert ok">{ok}</div> : null}

      <div className="cards">
        <div className="card">
          <div className="k">Status</div>
          <div className="v">
            <span className={`pill ${order.status || ''}`}>{order.status}</span>
          </div>
        </div>
        <div className="card">
          <div className="k">Total</div>
          <div className="v">{money(order.total, order.currency)}</div>
        </div>
        <div className="card">
          <div className="k">Placed</div>
          <div className="v" style={{ fontSize: '1rem' }}>{fmtDate(order.createdAt)}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Customer</h2>
        </div>
        <div className="form-grid" style={{ padding: '4px 0' }}>
          <div className="field">
            <label>Name</label>
            <div>{c.name || '—'}</div>
          </div>
          <div className="field">
            <label>Email</label>
            <div>{c.email || '—'}</div>
          </div>
          <div className="field">
            <label>Phone</label>
            <div>{c.phone || '—'}</div>
          </div>
          <div className="field full">
            <label>Shipping address</label>
            <div className="muted">
              {[addr.line1, addr.line2, addr.city, addr.state, addr.zip, addr.country]
                .filter(Boolean)
                .join(', ') || '—'}
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Items</h2>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th className="tar">Line total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td>
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : null}
                </td>
                <td>{it.name}</td>
                <td>{it.qty}</td>
                <td>{money(it.price, order.currency)}</td>
                <td className="tar">{money((it.price || 0) * (it.qty || 0), order.currency)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="tar muted">Subtotal</td>
              <td className="tar">{money(order.subtotal, order.currency)}</td>
            </tr>
            <tr>
              <td colSpan={4} className="tar muted">Shipping</td>
              <td className="tar">{money(order.shipping, order.currency)}</td>
            </tr>
            <tr>
              <td colSpan={4} className="tar"><strong>Total</strong></td>
              <td className="tar"><strong>{money(order.total, order.currency)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Payment</h2>
        </div>
        <div className="form-grid" style={{ padding: '4px 0' }}>
          <div className="field">
            <label>Payment status</label>
            <div>
              <span className={`pill ${order.status || ''}`}>{order.status}</span>
            </div>
          </div>
          <div className="field">
            <label>Method</label>
            <div>{pay.method || '—'}</div>
          </div>
          <div className="field">
            <label>Razorpay order ID</label>
            <div className="muted">{pay.razorpayOrderId || '—'}</div>
          </div>
          <div className="field">
            <label>Razorpay payment ID</label>
            <div className="muted">{pay.razorpayPaymentId || '—'}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Manage</h2>
        </div>
        <div className="form-grid">
          <div className="field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label>Notes</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <div className="tar" style={{ marginTop: 12 }}>
          <button className="btn btn--solid" type="button" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </>
  );
}
