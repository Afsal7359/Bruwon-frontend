'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, admin } = await api.login(email.trim(), password);
      localStorage.setItem('bruwon_admin_token', token);
      localStorage.setItem('bruwon_admin', JSON.stringify(admin || {}));
      router.replace('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit}>
        <span className="logo">
          Bruwon<sup>™</sup>
        </span>
        <p className="sub">Admin sign in</p>

        {error ? <div className="alert err">{error}</div> : null}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@bruwon.com"
            autoComplete="username"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin12345"
            autoComplete="current-password"
            required
          />
        </div>

        <button className="btn btn--solid" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="muted center-note" style={{ padding: '12px 0 0' }}>
          Default: admin@bruwon.com / admin12345
        </p>
      </form>
    </div>
  );
}
