import { SITE } from '@/lib/site';

export const metadata = { title: 'Cancellation & Refund Policy — Bruwon™' };

export default function RefundPolicyPage() {
  return (
    <section className="page">
      <div className="wrap legal">
        <div className="page-head">
          <span className="eyebrow">Legal</span>
          <h1>Cancellation &amp; Refund Policy</h1>
        </div>
        <p className="updated">Last updated: {SITE.lastUpdated}</p>

        <p className="intro">
          We want you to love every {SITE.brand} order. Because our chocolates are freshly made, perishable food items,
          this policy explains when orders can be cancelled and how refunds are handled.
        </p>

        <h2>1. Order cancellation</h2>
        <ul>
          <li>You may cancel your order <strong>within 2 hours of placing it</strong>, provided it has not yet been packed or dispatched.</li>
          <li>To cancel, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your order number as soon as possible.</li>
          <li>Once an order has been packed or handed to the courier, it can no longer be cancelled.</li>
          <li>If we cancel your order (e.g. item unavailable or delivery not serviceable), you will receive a <strong>full refund</strong>.</li>
        </ul>

        <h2>2. Returns</h2>
        <p>
          As our products are <strong>perishable food items</strong>, we are unable to accept returns or exchanges for
          reasons of change of mind, taste preference, or incorrect ordering. This is in line with standard food-safety
          practice.
        </p>

        <h2>3. Damaged, defective or wrong items</h2>
        <p>We stand behind the quality of every box. We will replace or refund your order if:</p>
        <ul>
          <li>The product arrived damaged, spoiled or melted beyond acceptable condition.</li>
          <li>You received the wrong item.</li>
          <li>The order was incomplete.</li>
        </ul>
        <p>
          To claim, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> <strong>within 24 hours of delivery</strong>{' '}
          with your order number and clear photos of the product and packaging. Once verified, we will arrange a
          replacement or a refund.
        </p>

        <h2>4. Refund method &amp; timeline</h2>
        <ul>
          <li>Approved refunds are processed to your <strong>original payment method via Razorpay</strong>.</li>
          <li>Refunds are typically initiated within <strong>2–3 business days</strong> of approval.</li>
          <li>After initiation, it may take <strong>5–7 business days</strong> for the amount to reflect in your account, depending on your bank or card issuer.</li>
          <li>Shipping charges are non-refundable unless the cancellation or error was on our side.</li>
        </ul>

        <h2>5. Failed or duplicate payments</h2>
        <p>
          If your payment was debited but the order was not confirmed, or you were charged more than once, the amount is
          usually auto-reversed by Razorpay within 5–7 business days. If it isn&rsquo;t, contact us with your payment
          reference and we will resolve it.
        </p>

        <h2>6. Contact</h2>
        <p>
          For any cancellation or refund request, reach <strong>{SITE.legalName}</strong> at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone} ({SITE.hours}).
        </p>
      </div>
    </section>
  );
}
