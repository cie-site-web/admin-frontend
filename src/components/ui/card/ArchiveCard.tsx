import type { ArchiveFormat, ArchiveItem, ArchiveVisibility } from "@/types/archive";

const FORMAT_META: Record<
  ArchiveFormat,
  { icon: string; bgClass: string; textClass: string; label: string }
> = {
  pdf: { icon: "ri-file-pdf-2-line", bgClass: "bg-danger-subtle", textClass: "text-danger", label: "PDF" },
  doc: { icon: "ri-file-word-2-line", bgClass: "bg-primary-subtle", textClass: "text-primary", label: "DOC" },
  xls: { icon: "ri-file-excel-2-line", bgClass: "bg-success-subtle", textClass: "text-success", label: "XLS" },
  image: { icon: "ri-image-2-line", bgClass: "bg-info-subtle", textClass: "text-info", label: "Image" },
  video: { icon: "ri-video-on-line", bgClass: "bg-warning-subtle", textClass: "text-warning", label: "Vidéo" },
  zip: { icon: "ri-folder-zip-line", bgClass: "bg-secondary-subtle", textClass: "text-secondary", label: "ZIP" },
  code: { icon: "ri-code-s-slash-line", bgClass: "bg-dark-subtle", textClass: "text-dark", label: "Code" },
};

const VISIBILITY_META: Record<
  ArchiveVisibility,
  { label: string; className: string; icon: string }
> = {
  public: { label: "Public", className: "bg-success-subtle text-success", icon: "ri-global-line" },
  membres: { label: "Membres", className: "bg-primary-subtle text-primary", icon: "ri-group-line" },
  bureau: { label: "Bureau", className: "bg-warning-subtle text-warning", icon: "ri-shield-user-line" },
};

interface ArchiveCardProps {
  item: ArchiveItem;
  view?: "grid" | "list";
  /** Index utilisé pour l'animation décalée au chargement */
  index?: number;
}

export default function ArchiveCard({ item, view = "grid", index = 0 }: ArchiveCardProps) {
  const format = FORMAT_META[item.format];
  const visibility = VISIBILITY_META[item.visibility];
  const animStyle = { animationDelay: `${Math.min(index, 8) * 60}ms` };

  if (view === "list") {
    return (
      <div className="card archive-card archive-card-list archive-animate-in mb-3" style={animStyle}>
        <div className="card-body d-flex flex-column flex-md-row align-items-md-center gap-3">
          <div
            className={`archive-file-icon flex-shrink-0 ${format.bgClass} ${format.textClass}`}
            aria-hidden
          >
            <i className={format.icon}></i>
          </div>
          <div className="flex-grow-1 min-w-0">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
              <h6 className="mb-0 text-truncate">{item.title}</h6>
              <span className="badge bg-light text-muted font-monospace fs-11">{item.reference}</span>
            </div>
            <p className="text-muted mb-2 small text-truncate-2">{item.description}</p>
            <div className="d-flex flex-wrap gap-2 align-items-center small text-muted">
              <span className="badge bg-light text-muted text-capitalize">{item.category.replace(/-/g, " ")}</span>
              <span><i className="ri-calendar-line me-1"></i>{item.dateArchived}</span>
              {item.fileSize !== "—" && (
                <span><i className="ri-hard-drive-2-line me-1"></i>{item.fileSize}</span>
              )}
              <span className={`badge ${visibility.className}`}>
                <i className={`${visibility.icon} me-1`}></i>{visibility.label}
              </span>
            </div>
          </div>
          <div className="d-flex gap-2 flex-shrink-0">
            <a href="#" className="btn btn-light btn-sm">
              <i className="ri-eye-line me-1"></i>Consulter
            </a>
            <a href="#" className="btn btn-primary btn-sm">
              <i className="ri-download-2-line me-1"></i>Télécharger
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-6 col-xl-4">
      <div className="card archive-card archive-animate-in h-100" style={animStyle}>
        {item.thumbnailSrc ? (
          <div className="archive-card-thumb position-relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumbnailSrc} className="card-img-top object-fit-cover" alt="" />
            <span className={`badge position-absolute top-0 start-0 m-3 ${format.bgClass} ${format.textClass}`}>
              <i className={`${format.icon} me-1`}></i>
              {format.label}
            </span>
            <span className={`badge position-absolute top-0 end-0 m-3 ${visibility.className}`}>
              <i className={`${visibility.icon} me-1`}></i>{visibility.label}
            </span>
          </div>
        ) : (
          <div className={`archive-card-icon-header ${format.bgClass} ${format.textClass}`}>
            <i className={`${format.icon} archive-card-icon-lg`}></i>
            <span className="badge bg-white text-body shadow-sm">{format.label}</span>
          </div>
        )}

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h5 className="card-title mb-0 fs-15">{item.title}</h5>
            <div className="dropdown flex-shrink-0">
              <button
                className="btn btn-light btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Actions"
              >
                <i className="ri-more-2-fill"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="ri-eye-line me-2"></i>Consulter</a></li>
                <li><a className="dropdown-item" href="#"><i className="ri-download-2-line me-2"></i>Télécharger</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="ri-share-line me-2"></i>Partager</a></li>
              </ul>
            </div>
          </div>

          <p className="card-text text-muted small flex-grow-1">{item.description}</p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-light text-muted text-capitalize">
              {item.category.replace(/-/g, " ")}
            </span>
            <span className="badge bg-light text-muted">{item.year}</span>
            <span className="font-monospace fs-11 text-muted ms-auto">{item.reference}</span>
          </div>

          <div className="archive-card-meta d-flex justify-content-between align-items-center text-muted small mb-3">
            <span><i className="ri-calendar-line me-1"></i>{item.dateArchived}</span>
            {item.fileSize !== "—" ? (
              <span><i className="ri-hard-drive-2-line me-1"></i>{item.fileSize}</span>
            ) : item.bureau ? (
              <span><i className="ri-building-line me-1"></i>{item.bureau}</span>
            ) : null}
          </div>

          <div className="d-flex gap-2 mt-auto">
            <a href="#" className="btn btn-light btn-sm flex-grow-1">
              <i className="ri-eye-line me-1"></i>Consulter
            </a>
            <a href="#" className="btn btn-primary btn-sm flex-grow-1">
              <i className="ri-download-2-line me-1"></i>Télécharger
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}