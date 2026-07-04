'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { money, fmtDate } from '@/lib/format';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';

export default function AdminDashboardPage() {
  const handleError = useAuthErrorHandler();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const data = await api.adminStats(token);
        if (alive) setStats(data);
      } catch (err) {
        if (!handleError(err) && alive) setError(err.message || 'Failed to load dashboard.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="center-note">Loading…</div>;

  const currency = (stats && stats.currency) || 'INR';
  const recent = (stats && stats.recent) || [];

  return (
    <>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
      </div>

      {error ? <div className="alert err">{error}</div> : null}

      <div className="cards">
        <div className="card">
          <div className="k">Revenue</div>
          <div className="v">{money(stats?.revenue, currency)}</div>
        </div>
        <div className="card">
          <div className="k">Orders</div>
          <div className="v">{stats?.orderCount ?? 0}</div>
        </div>
        <div className="card">
          <div className="k">Paid orders</div>
          <div className="v">{stats?.paidCount ?? 0}</div>
        </div>
        <div className="card">
          <div className="k">Products</div>
          <div className="v">{stats?.productCount ?? 0}</div>
        </div>
        <div className="card">
          <div className="k">Subscribers</div>
          <div className="v">{stats?.subscriberCount ?? 0}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Recent orders</h2>
        </div>
        {recent.length === 0 ? (
          <div className="center-note">No orders yet.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o._id}>
                  <td>
                    <Link href={`/admin/orders/${o._id}`}>{o.orderNumber || o._id}</Link>
                  </td>
                  <td>{o.customer?.name || '—'}</td>
                  <td>{money(o.total, o.currency || currency)}</td>
                  <td>
                    <span className={`pill ${o.status || ''}`}>{o.status}</span>
                  </td>
                  <td>{fmtDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
