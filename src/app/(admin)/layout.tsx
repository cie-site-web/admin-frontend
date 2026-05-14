import type { ReactNode } from "react";

/**
 * Layout du groupe (admin).
 * Le RootLayout (src/app/layout.tsx) fournit déjà html/body, les CSS et les
 * scripts du thème Urbix. Le wrapper #layout-wrapper et la <main class="app-wrapper">
 * structurent le contenu pour que le thème s'affiche correctement.
 *
 * Le header, sidebar et footer sont chargés par le thème Urbix lui-même
 * (via /assets/js/components-loader.js qui injecte les partials).
 * À terme, on remplacera ces partials par les composants React
 * src/components/sections/admin/Header.tsx, Navbar.tsx, Footer.tsx.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div id="layout-wrapper">
      <main className="app-wrapper">
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
}