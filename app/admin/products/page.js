'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { money } from '@/lib/format';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';

export default function AdminProductsPage() {
  const handleError = useAuthErrorHandler();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  async function load() {
    const token = getToken();
    if (!token) return;
    try {
      const data = await api.adminProducts(token);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function onDelete(p) {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const token = getToken();
    if (!token) return;
    setBusyId(p._id);
    setError('');
    try {
      await api.deleteProduct(token, p._id);
      setProducts((list) => list.filter((x) => x._id !== p._id));
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to delete product.');
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <div className="center-note">Loading…</div>;

  return (
    <>
      <div className="admin-topbar">
        <h1>Products</h1>
      </div>

      {error ? <div className="alert err">{error}</div> : null}

      <div className="panel">
        <div className="panel-head">
          <h2>{products.length} products</h2>
          <Link className="btn-sm" href="/admin/products/new">
            New product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="center-note">No products yet.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Active</th>
                <th>Featured</th>
                <th className="tar">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        width={40}
                        height={40}
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }}
                      />
                    ) : (
                      <div
                        style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,.06)' }}
                      />
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{money(p.price, p.currency)}</td>
                  <td>{p.stock ?? 0}</td>
                  <td>
                    <span className={`pill ${p.active ? 'paid' : 'cancelled'}`}>
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{p.featured ? '★' : '—'}</td>
                  <td className="tar">
                    <Link className="btn-sm ghost" href={`/admin/products/${p._id}`}>
                      Edit
                    </Link>{' '}
                    <button
                      type="button"
                      className="btn-sm danger"
                      onClick={() => onDelete(p)}
                      disabled={busyId === p._id}
                    >
                      {busyId === p._id ? '…' : 'Delete'}
                    </button>
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
