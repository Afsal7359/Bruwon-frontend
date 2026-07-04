'use client';
import { useRef, useState } from 'react';
import api from '@/lib/api';
import { getToken } from '@/components/admin/useAdminAuth';

// Single-image picker: preview + upload (Cloudinary) + paste URL.
export function ImagePicker({ value, onChange, label }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const { url } = await api.uploadImage(getToken(), file);
      onChange(url);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="imgpick">
      {label ? <label>{label}</label> : null}
      <div className="imgpick-row">
        <div className="imgpick-preview">
          {value ? <img src={value} alt="" /> : <span className="muted">No image</span>}
        </div>
        <div className="imgpick-controls">
          <input
            className="imgpick-url"
            type="text"
            placeholder="Paste image URL or upload →"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="imgpick-actions">
            <button type="button" className="btn-sm ghost" disabled={busy} onClick={() => fileRef.current?.click()}>
              {busy ? 'Uploading…' : 'Upload'}
            </button>
            {value ? (
              <button type="button" className="btn-sm danger" onClick={() => onChange('')}>Clear</button>
            ) : null}
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />
          {err ? <div className="alert err" style={{ marginTop: 8 }}>{err}</div> : null}
        </div>
      </div>
    </div>
  );
}

// Multi-image gallery picker: list of images with upload/URL add + remove.
export function GalleryPicker({ value = [], onChange, label }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState(null);
  const list = Array.isArray(value) ? value : [];

  const addUrl = () => {
    if (!url.trim()) return;
    onChange([...list, url.trim()]);
    setUrl('');
  };

  const upload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setErr(null);
    setBusy(true);
    try {
      const urls = [];
      for (const f of files) {
        const { url: u } = await api.uploadImage(getToken(), f);
        urls.push(u);
      }
      onChange([...list, ...urls]);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const remove = (i) => onChange(list.filter((_, idx) => idx !== i));

  return (
    <div className="imgpick">
      {label ? <label>{label}</label> : null}
      <div className="gallery-thumbs">
        {list.map((src, i) => (
          <div className="gallery-thumb" key={i}>
            <img src={src} alt="" />
            <button type="button" className="gt-x" onClick={() => remove(i)} aria-label="Remove">×</button>
          </div>
        ))}
        {list.length === 0 ? <span className="muted" style={{ alignSelf: 'center' }}>No gallery images</span> : null}
      </div>
      <div className="imgpick-actions" style={{ marginTop: 10 }}>
        <input
          className="imgpick-url"
          type="text"
          placeholder="Paste image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }}
        />
        <button type="button" className="btn-sm" onClick={addUrl}>Add URL</button>
        <button type="button" className="btn-sm ghost" disabled={busy} onClick={() => fileRef.current?.click()}>
          {busy ? 'Uploading…' : 'Upload'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={upload} />
      </div>
      {err ? <div className="alert err" style={{ marginTop: 8 }}>{err}</div> : null}
    </div>
  );
}

export default ImagePicker;
