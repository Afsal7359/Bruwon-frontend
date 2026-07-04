import api from './api';

// Server-side fetch helpers with graceful fallback (so pages render even if the
// API is temporarily unreachable during dev / build).
export async function getProducts() {
  try {
    return await api.getProducts();
  } catch {
    return [];
  }
}

export async function getContent() {
  try {
    return await api.getContent();
  } catch {
    return {};
  }
}

export async function getProduct(slug) {
  try {
    return await api.getProduct(slug);
  } catch {
    return null;
  }
}

// content helper with default fallback
export function c(content, key, fallback = '') {
  const v = content?.[key];
  return v === undefined || v === null || v === '' ? fallback : v;
}
