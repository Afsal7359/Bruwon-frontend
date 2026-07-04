import { SITE } from '@/lib/site';

export const metadata = { title: 'Shipping & Delivery Policy — Bruwon™' };

export default function ShippingPolicyPage() {
  return (
    <section className="page">
      <div className="wrap legal">
        <div className="page-head">
          <span className="eyebrow">Legal</span>
          <h1>Shipping &amp; Delivery Policy</h1>
        </div>
        <p className="updated">Last updated: {SITE.lastUpdated}</p>

        <p className="intro">
          Every {SITE.brand} box is packed fresh and shipped with care so it reaches you in perfect condition. Here is
          how our shipping and delivery works.
        </p>

        <h2>1. Order processing</h2>
        <ul>
          <li>Orders are processed within <strong>1–2 business days</strong> of a successful payment.</li>
          <li>Orders placed on Sundays or public holidays are processed on the next business day.</li>
          <li>Because our chocolates are made fresh in small batches, dispatch may occasionally take a little longer during peak demand — we&rsquo;ll keep you informed.</li>
        </ul>

        <h2>2. Delivery timelines</h2>
        <ul>
          <li>Estimated delivery is <strong>3–7 business days</strong> from dispatch, depending on your location.</li>
          <li>Metro cities are usually faster; remote or non-metro pin codes may take longer.</li>
          <li>Delivery timelines are estimates and may be affected by courier delays, weather or events beyond our control.</li>
        </ul>

        <h2>3. Shipping charges</h2>
        <p>Shipping is charged per order based on the box you choose, and is always shown at checkout before payment:</p>
        <ul>
          <li><strong>6-Piece Box</strong> — ₹60 shipping</li>
          <li><strong>10-Piece Box</strong> — ₹40 shipping</li>
          <li><strong>15-Piece Box</strong> — <strong>Free shipping</strong></li>
        </ul>
        <p>When a cart contains more than one box, the applicable shipping is the highest single box fee in the cart.</p>

        <h2>4. Packaging</h2>
        <p>
          Chocolates are perishable and sensitive to heat. We pack orders in protective, food-safe packaging to preserve
          freshness in transit. During hot weather, minor softening may occur; this does not affect safety or taste.
        </p>

        <h2>5. Delivery address</h2>
        <p>
          Please ensure your shipping address and contact number are complete and accurate. We are not responsible for
          delays or non-delivery caused by an incorrect address or the recipient being unavailable. Re-shipping due to
          an incorrect address may incur additional charges.
        </p>

        <h2>6. Tracking</h2>
        <p>
          Once your order is dispatched, we will share tracking details (where available) via email or phone so you can
          follow your delivery.
        </p>

        <h2>7. Serviceable areas</h2>
        <p>
          We currently ship across {SITE.country}. If your pin code is not serviceable, we will contact you and issue a
          full refund.
        </p>

        <h2>8. Contact</h2>
        <p>
          For any delivery questions, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phone} (
          {SITE.hours}).
        </p>
      </div>
    </section>
  );
}
