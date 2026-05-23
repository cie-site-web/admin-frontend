import ArchiveCatalogue from "@/components/sections/admin/archive/ArchiveCatalogue";

export const metadata = {
  title: "Archives | CIE Admin",
  description: "Consultation et gestion des archives du club",
};

const HERO_STATS = [
  { value: "34", label: "Éléments" },
  { value: "1,3 Go", label: "Stockage" },
  { value: "2025", label: "Dernier ajout" },
];

export default function ArchivesPage() {
  return (
    <>
      <div className="card archive-hero mb-4 position-relative z-1">
        <div className="card-body p-4 p-lg-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
            <div className="d-flex align-items-start gap-3">
              <span className="archive-hero-icon" aria-hidden>
                <i className="ri-archive-2-line"></i>
              </span>
              <div>
                <h4 className="archive-hero-title mb-1">Archives du club</h4>
                <p className="archive-hero-subtitle mb-0">
                  Retrouvez les documents officiels, médias et événements passés.
                  Filtrez par catégorie, année ou visibilité.
                </p>
              </div>
            </div>

            <div className="archive-hero-stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="archive-hero-stat">
                  <div className="archive-hero-stat-value">{stat.value}</div>
                  <div className="archive-hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArchiveCatalogue />
    </>
  );
}