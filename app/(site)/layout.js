import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SiteFx from '@/components/SiteFx';
import { getContent, c } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }) {
  const content = await getContent();
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>{children}</main>
      <Footer tagline={c(content, 'footer.tagline')} />
      <CartDrawer />
      <SiteFx />
    </>
  );
}
