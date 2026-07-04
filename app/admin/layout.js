'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getToken, clearAuth } from '@/components/admin/useAdminAuth';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/subscribers', label: 'Subscribers' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    const token = getToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    setReady(true);
  }, [isLogin, pathname, router]);

  function signOut() {
    clearAuth();
    router.replace('/admin/login');
  }

  // Login page: no shell.
  if (isLogin) return children;

  // Guarding: don't flash protected content before token check.
  if (!ready) return null;

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return (
    <div className="admin">
      <aside className="admin-side">
        <span className="logo">
          Bruwon<sup>™</sup>
        </span>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item) ? 'active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="signout" onClick={signOut}>
          Sign out
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
