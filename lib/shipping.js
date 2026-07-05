// Order-value based shipping — must mirror server/src/utils/shipping.js
//   subtotal >= 480  -> free
//   subtotal >= 300  -> ₹40
//   subtotal  > 0    -> ₹60
// Only the tier the order value reaches applies — never summed. So adding a
// free-shipping box (which already puts the order at/above ₹480) keeps it free.
export function calcShipping(subtotal) {
  const s = Number(subtotal) || 0;
  if (s <= 0) return 0;
  if (s >= 480) return 0;
  if (s >= 300) return 40;
  return 60;
}
