import { SITE } from '@/lib/site';

export const metadata = { title: 'Contact Us — Bruwon™' };

export default function ContactPage() {
  return (
    <section className="page">
      <div className="wrap legal">
        <div className="page-head">
          <span className="eyebrow">We&rsquo;re here to help</span>
          <h1>Contact Us</h1>
          <p>
            Questions about an order, our chocolates, or anything else? Reach {SITE.brand} and we&rsquo;ll get back to
            you as soon as we can.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="ck">Email</div>
            <div className="cv"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          </div>
          <div className="contact-card">
            <div className="ck">Phone</div>
            <div className="cv"><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></div>
          </div>
          <div className="contact-card">
            <div className="ck">Hours</div>
            <div className="cv">{SITE.hours}</div>
          </div>
          <div className="contact-card">
            <div className="ck">Address</div>
            <div className="cv">{SITE.legalName}<br />{SITE.address}</div>
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          For order-related queries, please include your <strong>order number</strong> (e.g. BRU-10001) so we can help
          you faster.
        </p>

        <div style={{ marginTop: 20 }}>
          <a href={`mailto:${SITE.email}?subject=Bruwon%20enquiry`} className="btn btn--solid">
            Email us <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
