import { Sidebar, HorizontalNav } from "@/components/sections/admin/navbar";
import { Header, NOTIFICATIONS, CART_ITEMS, CURRENT_USER } from "@/components/sections/admin/header";
import Footer from "@/components/sections/admin/Footer";
import ScrollToTop from "@/components/ui/scroll_to_top/ScrollToTop";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout-wrapper">
      <Header
        user={CURRENT_USER}
        notifications={NOTIFICATIONS}
        unreadCount={4}
        cartItems={CART_ITEMS}
      />

      <Sidebar />

      <HorizontalNav />

      <main className="app-wrapper">
        <div className="container-fluid">{children}</div>
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}
