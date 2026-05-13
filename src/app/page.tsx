import fs from "node:fs";
import path from "node:path";

/** Référence unique du thème statique (HTML/CSS) */
const ADMIN_HTML_DIR = path.join(process.cwd(), "Admin-html");

function inlinePartials(html: string): string {
  return html.replace(
    /<div data-include="partials\/([^"]+)"><\/div>/g,
    (_m, file: string) => {
      const fp = path.join(ADMIN_HTML_DIR, "partials", file);
      return fs.readFileSync(fp, "utf8");
    }
  );
}

function toPublicAssetPaths(html: string): string {
  return html
    .replace(/\bsrc="assets\//g, 'src="/assets/')
    .replace(/\bhref="assets\//g, 'href="/assets/');
}

function normalizeAppLinks(html: string): string {
  return html.replace(/\bhref="index\.html"/g, 'href="/"');
}

function buildUrbixDashboardHtml(): string {
  const indexPath = path.join(ADMIN_HTML_DIR, "index.html");
  const raw = fs.readFileSync(indexPath, "utf8");
  const start = raw.indexOf('<div id="layout-wrapper">');
  const end = raw.indexOf("<!-- Load reusable components");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(
      "Admin-html/index.html: balise #layout-wrapper ou commentaire scripts introuvable."
    );
  }

  let fragment = raw.slice(start, end);

  fragment = inlinePartials(fragment);
  fragment = toPublicAssetPaths(fragment);
  fragment = normalizeAppLinks(fragment);

  // Fermetures </div></main> en trop (fichier source du thème)
  fragment = fragment.replace(
    /\s*<\/footer>\s*<\/div>\s*<\/main>\s*<\/div>/,
    "\n            </footer>\n</div>"
  );

  fragment = fragment.replace(
    /class="tab-pane fade show active"([^>]*?)id="average-line" class="apexcharts-container"/,
    'class="tab-pane fade show active apexcharts-container"$1id="average-line"'
  );

  return fragment;
}

export default function HomePage() {
  const html = buildUrbixDashboardHtml();
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
