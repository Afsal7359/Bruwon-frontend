import { SITE } from '@/lib/site';

export const metadata = { title: 'Privacy Policy — Bruwon™' };

export default function PrivacyPolicyPage() {
  return (
    <section className="page">
      <div className="wrap legal">
        <div className="page-head">
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
        </div>
        <p className="updated">Last updated: {SITE.lastUpdated}</p>

        <p className="intro">
          {SITE.brand} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
          committed to protecting the personal information you share with us. This Privacy Policy explains what we
          collect, how we use it, and the choices you have when you visit {SITE.brand} or place an order.
        </p>

        <h2>1. Information we collect</h2>
        <p>When you use our website or place an order, we may collect:</p>
        <ul>
          <li><strong>Contact &amp; delivery details</strong> — name, email address, phone number and shipping address.</li>
          <li><strong>Order information</strong> — the products you buy, order value and order history.</li>
          <li><strong>Payment information</strong> — payments are processed securely by our payment partner, Razorpay. We do <strong>not</strong> store your card, UPI or bank details on our servers.</li>
          <li><strong>Technical data</strong> — basic device, browser and usage information collected automatically to keep the site working and secure.</li>
        </ul>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To process and deliver your orders and send order updates.</li>
          <li>To respond to your enquiries and provide customer support.</li>
          <li>To send you offers, restock alerts and news — only if you have opted in. You can unsubscribe any time.</li>
          <li>To detect, prevent and address fraud, security and technical issues.</li>
          <li>To comply with applicable laws and tax obligations.</li>
        </ul>

        <h2>3. Payment processing</h2>
        <p>
          All payments on {SITE.brand} are handled by <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway.
          Your payment details are transmitted directly to Razorpay over an encrypted connection and are governed by
          Razorpay&rsquo;s own privacy policy. We only receive confirmation of whether a payment succeeded or failed.
        </p>

        <h2>4. Sharing your information</h2>
        <p>We do not sell your personal information. We share it only with:</p>
        <ul>
          <li>Payment providers (Razorpay) to process transactions.</li>
          <li>Logistics / courier partners to deliver your order.</li>
          <li>Service providers who help us run the website (e.g. hosting), under confidentiality obligations.</li>
          <li>Authorities where required by law.</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>
          We use essential cookies and local storage to remember your shopping bag and keep the site functioning. You
          can control cookies through your browser settings, though some features may not work without them.
        </p>

        <h2>6. Data retention &amp; security</h2>
        <p>
          We retain order and contact information for as long as needed to fulfil orders and meet legal, accounting and
          reporting requirements. We use reasonable technical and organisational measures to protect your data, though
          no method of transmission over the internet is 100% secure.
        </p>

        <h2>7. Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information, and you may opt out of
          marketing communications at any time. To make a request, contact us at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>8. Children</h2>
        <p>Our website is not directed at children under 13, and we do not knowingly collect their data.</p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest version will always be posted on this page
          with a revised &ldquo;Last updated&rdquo; date.
        </p>

        <h2>10. Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy, contact <strong>{SITE.legalName}</strong> at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone}. Address: {SITE.address}.
        </p>
      </div>
    </section>
  );
}
