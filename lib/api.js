export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function request(path, { method = 'GET', body, token, cache } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache: cache || 'no-store',
  });

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

/* ---------------- Public ---------------- */
export const api = {
  getProducts: () => request('/products'),
  getProduct: (slug) => request(`/products/${slug}`),
  getContent: () => request('/content'),
  subscribe: (email) => request('/subscribers', { method: 'POST', body: { email } }),
  paymentStatus: () => request('/payment/status'),
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload }),
  verifyOrder: (payload) => request('/orders/verify', { method: 'POST', body: payload }),
  trackOrder: (orderNumber) => request(`/orders/track/${orderNumber}`),

  /* ---------------- Auth ---------------- */
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me: (token) => request('/auth/me', { token }),

  /* ---------------- Admin ---------------- */
  adminStats: (token) => request('/admin/stats', { token }),
  adminProducts: (token) => request('/admin/products', { token }),
  adminProduct: (token, id) => request(`/admin/products/${id}`, { token }),
  createProduct: (token, body) => request('/admin/products', { method: 'POST', body, token }),
  updateProduct: (token, id, body) => request(`/admin/products/${id}`, { method: 'PUT', body, token }),
  deleteProduct: (token, id) => request(`/admin/products/${id}`, { method: 'DELETE', token }),
  adminOrders: (token, status) => request(`/admin/orders${status ? `?status=${status}` : ''}`, { token }),
  adminOrder: (token, id) => request(`/admin/orders/${id}`, { token }),
  updateOrder: (token, id, body) => request(`/admin/orders/${id}`, { method: 'PUT', body, token }),
  adminContentFull: (token) => request('/admin/content?full=1', { token }),
  updateContent: (token, updates) => request('/admin/content', { method: 'PUT', body: { updates }, token }),
  adminSubscribers: (token) => request('/admin/subscribers', { token }),
  uploadStatus: (token) => request('/admin/upload/status', { token }),

  // multipart upload — returns { url }
  uploadImage: async (token, file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${API_URL}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `Upload failed (${res.status})`);
    return data;
  },
};

export default api;
