import Link from 'next/link';
import { getProducts, getContent, c } from '@/lib/server';
import ProductsGrid from '@/components/ProductsGrid';
import SubscribeForm from '@/components/SubscribeForm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, content] = await Promise.all([getProducts(), getContent()]);

  const title = c(content, 'hero.title', 'A bar built to be broken.');
  const words = title.trim().split(' ');
  const last = words.pop();
  const heroImg = c(content, 'hero.image', 'https://images.pexels.com/photos/6261691/pexels-photo-6261691.jpeg?auto=compress&cs=tinysrgb&w=1600');

  return (
    <>
      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <img className="lazy-img loaded" src={heroImg} alt="" />
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-anim ha1">{c(content, 'hero.eyebrow', 'Bruwon™')}</span>
            <h1 className="hero-anim ha2">
              {words.join(' ')} <span className="gleam">{last}</span>
            </h1>
            <p className="hero-sub hero-anim ha3">
              {c(content, 'hero.subtitle', 'Discover our signature collection of handcrafted chocolates — featuring toasted kunafa, pistachio cream and single-origin chocolate. Small batches, packed fresh.')}
            </p>
            <div className="hero-cta hero-anim ha4">
              <Link href="/shop" className="btn btn--solid">
                Taste the signature <span className="arrow">→</span>
              </Link>
              <Link href="/#story" className="btn btn--ghost">Our story</Link>
            </div>
            <div className="hero-meta hero-anim ha5">
              <div><span className="n">48h</span><span className="l">Hand toasted</span></div>
              <div><span className="n">100%</span><span className="l">Real pistachio</span></div>
              <div><span className="n">{products.length || 2}</span><span className="l">Signature bars</span></div>
            </div>
          </div>

          <div className="hero-visual hero-anim">
            <video
              className="hero-video"
              src="/assets/video/video.mp4"
              poster={c(content, 'hero.rotateImage', '/assets/products/p3.jpg')}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="scroll-cue hero-anim ha5" aria-hidden="true">
          <span className="mouse"><i></i></span>
          Scroll
        </div>
      </header>

      {/* ================= MARQUEE ================= */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Pistachio Kunafa<i className="dot"></i>Built To Be Broken<i className="dot"></i>Single Origin<i className="dot"></i>Small Batch<i className="dot"></i>The Green Inside<i className="dot"></i>Crack Into It<i className="dot"></i></span>
          <span>Pistachio Kunafa<i className="dot"></i>Built To Be Broken<i className="dot"></i>Single Origin<i className="dot"></i>Small Batch<i className="dot"></i>The Green Inside<i className="dot"></i>Crack Into It<i className="dot"></i></span>
        </div>
      </div>

      {/* ================= SHOP ================= */}
      <section className="section shop" id="shop">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">{c(content, 'shop.eyebrow', 'The collection')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: c(content, 'shop.title', 'Two bars.<br>One obsession.').replace(/\n/g, '<br>') }} />
            <p>{c(content, 'shop.subtitle', 'Choose your shell. The molten pistachio-kunafa core stays exactly the same — non-negotiable.')}</p>
          </div>

          <div className="products">
            <ProductsGrid initial={products} />
          </div>

          <p className="shop-note reveal">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12l5 5 9-11" /></svg>
            Free shipping on the 15-piece box · Every box packed fresh
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section story" id="story">
        <div className="wrap story-grid">
          <div className="story-text reveal">
            <span className="eyebrow">{c(content, 'story.eyebrow', 'Our obsession')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: c(content, 'story.title', 'We chase the<br>perfect crack.').replace(/\n/g, '<br>') }} />
            <p className="lead">{c(content, 'story.lead', 'It starts with a sound — the dry snap of chocolate giving way to a soft, green centre.')}</p>
            <p>{c(content, 'story.body1', 'Bruwon began in a small kitchen with one stubborn question: could a chocolate bar hold the warmth of fresh kunafa and the richness of pistachio without losing its snap?')}</p>
            <p>{c(content, 'story.body2', 'No shortcuts, no fillers, no pretending. Just the most honest version of a flavour the world fell in love with.')}</p>
            <div className="sign">— The Bruwon kitchen</div>
          </div>
          <div className="story-visual reveal reveal-d2">
            <img className="cover-photo" src={c(content, 'story.image', '/assets/image.jpg')} alt="Bruwon pistachio kunafa chocolate bar." loading="lazy" />
            <div className="story-badge">
              <div className="b1">Est. small-batch</div>
              <div className="b2">Made by hand, daily</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="section process" id="process">
        <div className="wrap">
          <div className="process-grid">
            <div className="proc-text reveal">
              <span className="eyebrow">{c(content, 'process.eyebrow', 'From tray to bar')}</span>
              <h2>{c(content, 'process.title', "How it's made.")}</h2>
              <p>{c(content, 'process.subtitle', 'Four steps, no rushing. This is the order it actually happens in the kitchen — slow toasting, hand-folding, and a final temper that gives every bar its clean snap.')}</p>
            </div>
            <div className="proc-visual reveal reveal-d2">
              <img className="cover-photo" src={c(content, 'process.image', 'https://images.pexels.com/photos/6036005/pexels-photo-6036005.jpeg?auto=compress&cs=tinysrgb&w=1000')} alt="A chocolatier pouring glossy melted chocolate." loading="lazy" />
              <div className="proc-tag"><div className="pt1">In the kitchen</div><div className="pt2">Tempered by hand</div></div>
            </div>
          </div>
          <div className="steps">
            <div className="step reveal"><span className="dot"></span><div className="sn">01</div><h3>Toast</h3><p>Kunafa strands hit the trays and toast low and slow until they&apos;re deep gold and crisp through.</p></div>
            <div className="step reveal reveal-d1"><span className="dot"></span><div className="sn">02</div><h3>Fold</h3><p>We grind pistachios into cream and fold the cooled kunafa through it for crunch in every bite.</p></div>
            <div className="step reveal reveal-d2"><span className="dot"></span><div className="sn">03</div><h3>Enrobe</h3><p>Tempered chocolate is cast into moulds, filled with the core, and capped with a thin glossy shell.</p></div>
            <div className="step reveal reveal-d3"><span className="dot"></span><div className="sn">04</div><h3>Set</h3><p>Bars cool until they snap clean, then they&apos;re wrapped, boxed and sent out cold the same week.</p></div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section stats">
        <div className="wrap stats-grid">
          <div className="stat reveal"><div className="v"><span>48</span><span className="u">h</span></div><div className="k">Toast time</div></div>
          <div className="stat reveal reveal-d1"><div className="v"><span>3</span></div><div className="k">Pure ingredients</div></div>
          <div className="stat reveal reveal-d2"><div className="v"><span>100</span><span className="u">%</span></div><div className="k">Real pistachio</div></div>
          <div className="stat reveal reveal-d3"><div className="v"><span>0</span></div><div className="k">Fillers or dyes</div></div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="section quote">
        <div className="wrap">
          <span className="mark reveal" aria-hidden="true">&ldquo;</span>
          <blockquote className="reveal reveal-d1">{c(content, 'quote.text', 'I cracked it open and actually gasped. The kunafa still crunches and the pistachio is the real thing — this is the one to beat.')}</blockquote>
          <div className="who reveal reveal-d2">{c(content, 'quote.author', 'Reema A.')}<span>{c(content, 'quote.role', 'verified Bruwon regular')}</span></div>
        </div>
      </section>

      {/* ================= NEWSLETTER CTA ================= */}
      <section className="section cta">
        <div className="wrap cta-inner reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{c(content, 'cta.eyebrow', 'Join the inner crowd')}</span>
          <h2>{c(content, 'cta.title', 'First crack at every drop.')}</h2>
          <p>{c(content, 'cta.subtitle', 'New flavours sell out fast. Get early access, restock alerts and the occasional pistachio secret.')}</p>
          <SubscribeForm />
        </div>
      </section>
    </>
  );
}
