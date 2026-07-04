import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SiteFx from '@/components/SiteFx';

export default function SiteLayout({ children }) {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <SiteFx />
    </>
  );
}
