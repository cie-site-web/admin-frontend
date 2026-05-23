import Script from "next/script";

/**
 * Ancien chargement synchrone des scripts du thème.
 * Préférez `next/script` dans `src/app/layout.tsx` pour la page principale.
 */
export default function Scripts() {
  return (
    <>
      <Script src="/js/components-loader.js" strategy="afterInteractive" />
      <Script src="/assets/libs/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/libs/simplebar/simplebar.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/scroll-top.init.js" strategy="afterInteractive" />
      <Script src="/assets/libs/gridjs/gridjs.umd.js" strategy="afterInteractive" />
      <Script src="/assets/libs/apexcharts/apexcharts.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/dashboard/e-commerce.init.js" strategy="afterInteractive" />
      <Script src="/assets/js/app.js" type="module" strategy="afterInteractive" />
    </>
  );
}
