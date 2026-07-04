'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken, useAuthErrorHandler } from '@/components/admin/useAdminAuth';
import { ImagePicker, GalleryPicker } from '@/components/admin/ImagePicker';

const EMPTY = {
  name: '',
  slug: '',
  tagline: '',
  price: '',
  compareAtPrice: '',
  shipping: '',
  pieces: '',
  tag: '',
  weight: '',
  cocoa: '',
  stock: '',
  sortOrder: '',
  image: '',
  gallery: [],
  description: '',
  notes: '', // textarea, one note per line
  active: true,
  featured: false,
};

export default function AdminProductEditPage({ params }) {
  const router = useRouter();
  const handleError = useAuthErrorHandler();
  const isNew = params.id === 'new';

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  useEffect(() => {
    if (isNew) return;
    let alive = true;
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const p = await api.adminProduct(token, params.id);
        if (!alive) return;
        setForm({
          name: p.name || '',
          slug: p.slug || '',
          tagline: p.tagline || '',
          price: p.price ?? '',
          compareAtPrice: p.compareAtPrice ?? '',
          shipping: p.shipping ?? '',
          pieces: p.pieces ?? '',
          tag: p.tag || '',
          weight: p.weight || '',
          cocoa: p.cocoa || '',
          stock: p.stock ?? '',
          sortOrder: p.sortOrder ?? '',
          image: p.image || '',
          gallery: Array.isArray(p.gallery) ? p.gallery : [],
          description: p.description || '',
          notes: Array.isArray(p.notes) ? p.notes.join('\n') : '',
          active: p.active !== false,
          featured: !!p.featured,
        });
      } catch (err) {
        if (!handleError(err) && alive) setError(err.message || 'Failed to load product.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [isNew, params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toNum(v) {
    if (v === '' || v === null || v === undefined) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setOk('');
    const token = getToken();
    if (!token) return;

    const body = {
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      tag: form.tag.trim(),
      weight: form.weight.trim(),
      cocoa: form.cocoa.trim(),
      image: (form.image || '').trim(),
      gallery: Array.isArray(form.gallery) ? form.gallery : [],
      description: form.description,
      notes: form.notes
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      active: form.active,
      featured: form.featured,
    };
    if (form.slug.trim()) body.slug = form.slug.trim();
    const price = toNum(form.price);
    if (price !== undefined) body.price = price;
    const cmp = toNum(form.compareAtPrice);
    if (cmp !== undefined) body.compareAtPrice = cmp;
    const shipping = toNum(form.shipping);
    body.shipping = shipping === undefined ? 0 : shipping;
    const pieces = toNum(form.pieces);
    if (pieces !== undefined) body.pieces = pieces;
    const stock = toNum(form.stock);
    if (stock !== undefined) body.stock = stock;
    const sortOrder = toNum(form.sortOrder);
    if (sortOrder !== undefined) body.sortOrder = sortOrder;

    setSaving(true);
    try {
      if (isNew) {
        await api.createProduct(token, body);
      } else {
        await api.updateProduct(token, params.id, body);
      }
      router.push('/admin/products');
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Failed to save product.');
      setSaving(false);
    }
  }

  if (loading) return <div className="center-note">Loading…</div>;

  return (
    <>
      <div className="admin-topbar">
        <h1>{isNew ? 'New product' : 'Edit product'}</h1>
        <Link className="btn-sm ghost" href="/admin/products">
          Back
        </Link>
      </div>

      {error ? <div className="alert err">{error}</div> : null}
      {ok ? <div className="alert ok">{ok}</div> : null}

      <div className="panel">
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Name</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </div>
            <div className="field">
              <label>Slug (optional)</label>
              <input
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="auto from name"
              />
            </div>

            <div className="field">
              <label>Price (₹)</label>
              <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} />
            </div>
            <div className="field">
              <label>Shipping fee (₹, 0 = free)</label>
              <input type="number" value={form.shipping} onChange={(e) => set('shipping', e.target.value)} />
            </div>

            <div className="field">
              <label>Pieces per box</label>
              <input type="number" value={form.pieces} onChange={(e) => set('pieces', e.target.value)} />
            </div>
            <div className="field">
              <label>Compare at price (optional)</label>
              <input
                type="number"
                value={form.compareAtPrice}
                onChange={(e) => set('compareAtPrice', e.target.value)}
              />
            </div>

            <div className="field">
              <label>Tagline</label>
              <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="Pistachio Kunafa Chocolate" />
            </div>
            <div className="field">
              <label>Tag (badge)</label>
              <input value={form.tag} onChange={(e) => set('tag', e.target.value)} placeholder="Best Value / Popular" />
            </div>

            <div className="field">
              <label>Stock</label>
              <input type="number" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
            </div>
            <div className="field">
              <label>Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => set('sortOrder', e.target.value)}
              />
            </div>

            <div className="field full">
              <ImagePicker label="Main image" value={form.image} onChange={(v) => set('image', v)} />
            </div>

            <div className="field full">
              <GalleryPicker label="Gallery images" value={form.gallery} onChange={(v) => set('gallery', v)} />
            </div>

            <div className="field full">
              <label>Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
            </div>

            <div className="field full">
              <label>Notes (one per line — e.g. "Milk · 38%")</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
              />
            </div>

            <div className="field">
              <label>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => set('active', e.target.checked)}
                />{' '}
                Active
              </label>
            </div>
            <div className="field">
              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                />{' '}
                Featured
              </label>
            </div>
          </div>

          <div className="tar" style={{ marginTop: 16 }}>
            <button className="btn btn--solid" type="submit" disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create product' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
