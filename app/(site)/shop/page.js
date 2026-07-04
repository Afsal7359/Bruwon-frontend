import { getProducts, getContent, c } from '@/lib/server';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Shop — Bruwon™' };

export default async function ShopPage() {
  const [products, content] = await Promise.all([getProducts(), getContent()]);

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head reveal in">
          <span className="eyebrow">{c(content, 'shop.eyebrow', 'The collection')}</span>
          <h1>Shop the bars.</h1>
          <p>{c(content, 'shop.subtitle', 'Choose your shell. The molten pistachio-kunafa core stays exactly the same — non-negotiable.')}</p>
        </div>

        {products.length > 0 ? (
          <div className="shop-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No products yet.</p>
            <span className="muted">Start the API server and run <code>npm run seed</code> to load the bars.</span>
          </div>
        )}

        <p className="shop-note reveal in" style={{ marginTop: 40 }}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12l5 5 9-11" /></svg>
          Free shipping on the 15-piece box · Every box packed fresh
        </p>
      </div>
    </section>
  );
}
