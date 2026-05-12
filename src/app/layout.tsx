'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load stylesheets
    const links = [
      '/assets/libs/simplebar/simplebar.min.css',
      '/assets/libs/swiper/swiper-bundle.min.css',
      '/assets/libs/nouislider/nouislider.min.css',
      '/assets/css/bootstrap.min.css',
      '/assets/css/icons.min.css',
      '/assets/css/app.min.css',
    ];
    links.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Load scripts
    const scripts = [
      '/assets/libs/swiper/swiper-bundle.min.js',
      '/assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      '/assets/libs/simplebar/simplebar.min.js',
      '/assets/js/scroll-top.init.js',
      '/assets/js/app.js',
    ];
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    });

    // Load partials
    const partials = ['header.html', 'sidebar.html', 'horizontal.html', 'switcher.html', 'scroll-to-top.html', 'footer.html'];
    partials.forEach(file => {
      const div = document.querySelector(`[data-include="/partials/${file}"]`);
      if (div) {
        fetch(`/partials/${file}`)
          .then(res => res.text())
          .then(html => {
            div.innerHTML = html;
            div.querySelectorAll('script').forEach(script => {
              const newScript = document.createElement('script');
              newScript.textContent = script.textContent;
              document.body.appendChild(newScript);
            });
          })
          .catch(err => console.log('Error loading partial:', file, err));
      }
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta content="Admin & Dashboards Template" name="description" />
        <meta content="Pixeleyez" name="author" />
        <link rel="shortcut icon" href="/assets/images/favicon.png" />
        <title>Blank | Urbix Admin & Dashboards Template</title>
      </head>
      <body>
        <div id="layout-wrapper">
          <div data-include="/partials/header.html"></div>
          <div data-include="/partials/sidebar.html"></div>
          <div data-include="/partials/horizontal.html"></div>
          <main className="app-wrapper">
            <div className="container-fluid">
              {children}
            </div>
          </main>
          <div data-include="/partials/switcher.html"></div>
          <div data-include="/partials/scroll-to-top.html"></div>
          <div data-include="/partials/footer.html"></div>
        </div>
      </body>
    </html>
  );
}