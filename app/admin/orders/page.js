'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { money, fmtDate } from '@/lib/format';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';

// 'created' orders are unpaid/abandoned checkouts — hidden from the orders list.
const FILTERS = ['all', 'paid', 'fulfilled', 'failed', 'cancelled'];

export default function AdminOrdersPage() {
  const handleError = useAuthErrorHandler();
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const data = await api.adminOrders(token, status === 'all' ? undefined : status);
        if (alive) setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!handleError(err) && alive) setError(err.message || 'Failed to load orders.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="admin-topbar">
        <h1>Orders</h1>
        <div>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`btn-sm ${status === f ? '' : 'ghost'}`}
              onClick={() => setStatus(f)}
              style={{ marginLeft: 6 }}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {error ? <div className="alert err">{error}</div> : null}

      <div className="panel">
        <div className="panel-head">
          <h2>{loading ? 'Loading…' : `${orders.length} orders`}</h2>
        </div>

        {loading ? (
          <div className="center-note">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="center-note">No orders found.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className="tar"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>
                    <Link href={`/admin/orders/${o._id}`}>{o.orderNumber || o._id}</Link>
                  </td>
                  <td>{o.customer?.name || '—'}</td>
                  <td>{Array.isArray(o.items) ? o.items.reduce((n, it) => n + (it.qty || 0), 0) : 0}</td>
                  <td>{money(o.total, o.currency)}</td>
                  <td>
                    <span className={`pill ${o.status || ''}`}>{o.status}</span>
                  </td>
                  <td>{fmtDate(o.createdAt)}</td>
                  <td className="tar">
                    <Link className="btn-sm ghost" href={`/admin/orders/${o._id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
