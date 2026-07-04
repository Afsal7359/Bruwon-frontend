import { SITE } from '@/lib/site';

export const metadata = { title: 'Terms & Conditions — Bruwon™' };

export default function TermsPage() {
  return (
    <section className="page">
      <div className="wrap legal">
        <div className="page-head">
          <span className="eyebrow">Legal</span>
          <h1>Terms &amp; Conditions</h1>
        </div>
        <p className="updated">Last updated: {SITE.lastUpdated}</p>

        <p className="intro">
          These Terms &amp; Conditions govern your use of the {SITE.brand} website and your purchase of products from
          us. By accessing our website or placing an order, you agree to these terms. Please read them carefully.
        </p>

        <h2>1. About us</h2>
        <p>
          This website is operated by <strong>{SITE.legalName}</strong> (&ldquo;{SITE.brand}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this site you confirm that you are at least 18 years old or are
          accessing it under the supervision of a parent or guardian.
        </p>

        <h2>2. Products</h2>
        <ul>
          <li>Our products are handcrafted food items (chocolates). Colours, textures and appearance may vary slightly between batches.</li>
          <li>Product images are for representation. Actual products may differ marginally.</li>
          <li>All products are subject to availability. We may limit quantities or discontinue any product at any time.</li>
          <li><strong>Allergen notice:</strong> our chocolates contain / may contain milk, nuts (pistachio), gluten (kunafa/wheat) and other allergens. Please check before consuming if you have allergies.</li>
        </ul>

        <h2>3. Pricing &amp; payment</h2>
        <ul>
          <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</li>
          <li>Shipping charges, where applicable, are shown at checkout before payment.</li>
          <li>Payments are processed securely through <strong>Razorpay</strong>. By paying, you agree to Razorpay&rsquo;s terms.</li>
          <li>We reserve the right to correct any pricing errors and to cancel orders affected by such errors (with a full refund).</li>
        </ul>

        <h2>4. Orders</h2>
        <p>
          When you place an order, you will receive an order confirmation. This confirms we have received your order; a
          contract is formed once payment is successfully processed. We reserve the right to refuse or cancel any order,
          for example due to stock issues, suspected fraud, or errors in pricing.
        </p>

        <h2>5. Shipping &amp; delivery</h2>
        <p>
          Delivery timelines and charges are described in our{' '}
          <a href="/shipping-policy">Shipping &amp; Delivery Policy</a>. Perishable items are packed with care, but you
          are responsible for providing an accurate address and receiving the order promptly.
        </p>

        <h2>6. Cancellations &amp; refunds</h2>
        <p>
          Cancellations, returns and refunds are governed by our{' '}
          <a href="/refund-policy">Cancellation &amp; Refund Policy</a>. As our products are perishable food items,
          special conditions apply.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          All content on this site — including the {SITE.brand} name, logo, text, graphics and images — is owned by or
          licensed to us and is protected by law. You may not copy, reproduce or use it without our written permission.
        </p>

        <h2>8. Acceptable use</h2>
        <p>
          You agree not to misuse the website, attempt to gain unauthorised access, disrupt its operation, or use it for
          any unlawful purpose.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.brand} shall not be liable for any indirect or consequential
          loss arising from the use of our website or products. Our total liability for any order shall not exceed the
          amount paid for that order.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction
          of the courts of {SITE.country}.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms? Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
          {SITE.phone}.
        </p>
      </div>
    </section>
  );
}
