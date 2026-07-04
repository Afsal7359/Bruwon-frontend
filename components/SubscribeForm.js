'use client';
import { useState } from 'react';
import api from '@/lib/api';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg({ type: 'err', text: 'Please enter a valid email.' });
      return;
    }
    setBusy(true);
    try {
      await api.subscribe(email);
      setMsg({ type: 'ok', text: "You're in. Watch your inbox for the next drop." });
      setEmail('');
    } catch (err) {
      setMsg({ type: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <form className="signup" onSubmit={submit} noValidate>
        <input
          type="email"
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn--solid" disabled={busy}>
          {busy ? 'Sending…' : 'Notify me'} <span className="arrow">→</span>
        </button>
      </form>
      {msg && (
        <div className="cta-msg show" role="status" style={{ color: msg.type === 'ok' ? 'var(--pist)' : '#f0b8ac', marginTop: 12, opacity: 1 }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}
