import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/server';
import { money } from '@/lib/format';
import ProductBuy from '@/components/ProductBuy';
import ProductGallery from '@/components/ProductGallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return { title: product ? `${product.name} — Bruwon™` : 'Bruwon™' };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return (
    <section className="page">
      <div className="wrap">
        <div className="crumb">
          <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}
        </div>

        <div className="pdp">
          <ProductGallery image={product.image} gallery={product.gallery} tag={product.tag} alt={product.name} />

          <div className="pdp-info">
            {product.tagline ? <span className="eyebrow">{product.tagline}</span> : null}
            <h1>{product.name}</h1>
            <div className="pdp-price">
              {money(product.price, product.currency)}
              {product.compareAtPrice ? <span className="was">{money(product.compareAtPrice, product.currency)}</span> : null}
            </div>
            <p className="pdp-desc">{product.description}</p>

            {product.notes?.length ? (
              <div className="pdp-notes">
                {product.notes.map((n, i) => (
                  <span key={i}>{n}</span>
                ))}
              </div>
            ) : null}

            <ProductBuy product={product} />

            <p className="muted" style={{ marginTop: 22, fontSize: 14 }}>
              {product.stock > 0 ? 'In stock · packed fresh' : 'Currently sold out'}
              {product.pieces ? ` · ${product.pieces} pieces` : ''}
              {' · '}
              {product.shipping > 0 ? `Shipping ${money(product.shipping, product.currency)}` : 'Free shipping'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
