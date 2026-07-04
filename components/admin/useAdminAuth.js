'use client';

import { useRouter } from 'next/navigation';

const TOKEN_KEY = 'bruwon_admin_token';
const ADMIN_KEY = 'bruwon_admin';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function isAuthError(err) {
  const msg = String((err && err.message) || err || '').toLowerCase();
  return msg.includes('authoriz') || msg.includes('401') || msg.includes('token');
}

/**
 * Hook returning a helper to handle errors: on auth errors clear storage and
 * redirect to login. Returns true if it was an auth error (handled).
 */
export function useAuthErrorHandler() {
  const router = useRouter();
  return function handleError(err) {
    if (isAuthError(err)) {
      clearAuth();
      router.replace('/admin/login');
      return true;
    }
    return false;
  };
}
