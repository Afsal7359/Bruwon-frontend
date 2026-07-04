import { getProducts, getContent, c } from '@/lib/server';
import ProductsGrid from '@/components/ProductsGrid';

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

        <div className="shop-grid">
          <ProductsGrid initial={products} />
        </div>

        <p className="shop-note reveal in" style={{ marginTop: 40 }}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12l5 5 9-11" /></svg>
          Free shipping on the 15-piece box · Every box packed fresh
        </p>
      </div>
    </section>
  );
}
