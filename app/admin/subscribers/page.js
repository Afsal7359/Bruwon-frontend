'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { fmtDate } from '@/lib/format';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';

export default function AdminSubscribersPage() {
  const handleError = useAuthErrorHandler();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const data = await api.adminSubscribers(token);
        if (alive) setSubscribers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!handleError(err) && alive) setError(err.message || 'Failed to load subscribers.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="center-note">Loading…</div>;

  return (
    <>
      <div className="admin-topbar">
        <h1>Subscribers</h1>
      </div>

      {error ? <div className="alert err">{error}</div> : null}

      <div className="panel">
        <div className="panel-head">
          <h2>{subscribers.length} subscribers</h2>
        </div>

        {subscribers.length === 0 ? (
          <div className="center-note">No subscribers yet.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Email</th>
                <th className="tar">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={s.email || i}>
                  <td>{s.email}</td>
                  <td className="tar">{fmtDate(s.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
