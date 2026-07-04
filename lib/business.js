import { getContent } from './server';
import { SITE } from './site';

// Returns business/contact details, preferring CMS (admin-editable) values and
// falling back to the static defaults in lib/site.js.
export async function getBusiness() {
  let c = {};
  try {
    c = (await getContent()) || {};
  } catch {
    c = {};
  }
  const pick = (key, fallback) => {
    const v = c[key];
    return v === undefined || v === null || v === '' ? fallback : v;
  };
  return {
    brand: SITE.brand,
    country: SITE.country,
    legalName: pick('business.legalName', SITE.legalName),
    email: pick('business.email', SITE.email),
    phone: pick('business.phone', SITE.phone),
    address: pick('business.address', SITE.address),
    hours: pick('business.hours', SITE.hours),
    lastUpdated: pick('business.lastUpdated', SITE.lastUpdated),
  };
}
