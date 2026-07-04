const SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

export function money(amount, currency = 'INR') {
  const sym = SYMBOLS[currency] || '';
  const n = Number(amount || 0);
  return `${sym}${n.toLocaleString('en-IN')}`;
}

export function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
