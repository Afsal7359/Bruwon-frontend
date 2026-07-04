'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';
import { ImagePicker } from '@/components/admin/ImagePicker';

const GROUP_ORDER = ['hero', 'shop', 'story', 'process', 'quote', 'cta', 'footer'];

export default function AdminContentPage() {
  const handleError = useAuthErrorHandler();
  const [docs, setDocs] = useState([]);
  const [values, setValues] = useState({}); // keyed by doc.key
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const data = await api.adminContentFull(token);
        if (!alive) return;
        const list = Array.isArray(data) ? data : [];
        setDocs(list);
        const initial = {};
        list.forEach((d) => {
          initial[d.key] = d.value ?? '';
        });
        setValues(initial);
      } catch (err) {
        if (!handleError(err) && alive) setError(err.message || 'Failed to load content.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const grouped = useMemo(() => {
    const map = {};
    docs.forEach((d) => {
      const g = d.group || 'other';
      if (!map[g]) map[g] = [];
      map[g].push(d);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    );
    const known = GROUP_ORDER.filter((g) => map[g]);
    const rest = Object.keys(map).filter((g) => !GROUP_ORDER.includes(g)).sort();
    return [...known, ...rest].map((g) => [g, map[g]]);
  }, [docs]);

  function setValue(key, value) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSave() {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    setError('');
    setOk('');
    try {
      const updates = docs.map((d) => ({ key: d.key, value: values[d.key] }));
      await api.updateContent(token, updates);
      // Reflect saved values as the new baseline.
      setDocs((list) => list.map((d) => ({ ...d, value: values[d.key] })));
      setOk('Content saved.');
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to save content.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="center-note">Loading…</div>;

  return (
    <>
      <div className="admin-topbar">
        <h1>Content</h1>
        <button className="btn btn--solid" type="button" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {error ? <div className="alert err">{error}</div> : null}
      {ok ? <div className="alert ok">{ok}</div> : null}

      {docs.length === 0 ? (
        <div className="center-note">No content entries.</div>
      ) : (
        grouped.map(([group, items]) => (
          <div className="panel" key={group}>
            <div className="panel-head">
              <h2 style={{ textTransform: 'capitalize' }}>{group}</h2>
            </div>
            <div className="form-grid">
              {items.map((d) => {
                const val = values[d.key] ?? '';
                const isTextarea = d.type === 'textarea';
                const isImage = d.type === 'image';
                const inputType = d.type === 'number' ? 'number' : 'text';
                if (isImage) {
                  return (
                    <div className="field full" key={d.key}>
                      <ImagePicker label={d.label || d.key} value={val} onChange={(v) => setValue(d.key, v)} />
                    </div>
                  );
                }
                return (
                  <div className={`field ${isTextarea ? 'full' : ''}`} key={d.key}>
                    <label>{d.label || d.key}</label>
                    {isTextarea ? (
                      <textarea
                        rows={4}
                        value={val}
                        onChange={(e) => setValue(d.key, e.target.value)}
                      />
                    ) : (
                      <input
                        type={inputType}
                        value={val}
                        onChange={(e) => setValue(d.key, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </>
  );
}
