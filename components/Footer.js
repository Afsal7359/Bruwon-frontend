import Link from 'next/link';

export default function Footer({ tagline }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">Bruwon<sup>™</sup></span>
            <p>{tagline || 'A bar built to be broken. Pistachio, kunafa and single-origin chocolate, handcrafted in small batches.'}</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinejoin="round"><path d="M15 4c.5 3 2.5 4.5 5 4.7V12c-2 0-3.8-.7-5-1.7V16a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4Z" /></svg>
              </a>
              <a href="#" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">All bars</Link></li>
              <li><Link href="/product/the-original">The Original</Link></li>
              <li><Link href="/product/dark-royale">Dark Royale</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Bruwon</h4>
            <ul>
              <li><Link href="/#story">Our story</Link></li>
              <li><Link href="/#process">How it&apos;s made</Link></li>
              <li><a href="#">Ingredients</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Storage &amp; care</a></li>
              <li><a href="#">Allergens</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true"><span>Bruwon</span></div>
        <div className="footer-bottom">
          <span>© 2026 Bruwon™. All rights reserved.</span>
          <span>Made by hand · Shipped cold · <Link href="/">Back to top ↑</Link></span>
        </div>
      </div>
    </footer>
  );
}
