import {
    ABOUT_APP,
    ABOUT_SYSINFO,
    ABOUT_MODULES,
    ABOUT_ROLES,
    ABOUT_TECH,
    ABOUT_SUPPORT,
  } from "./mockData";
  
  export default function AboutAdmin() {
    return (
      <div className="position-relative z-1">
  
        {/* ── Informations système ────────────────────────────────────── */}
        <div className="row g-3 mb-4">
          {ABOUT_SYSINFO.map((info) => (
            <div className="col-6 col-xl-3" key={info.label}>
              <div className="card about-stat-card h-100 mb-0">
                <div className="card-body d-flex align-items-center gap-3">
                  <span className="about-stat-icon" aria-hidden>
                    <i className={info.icon}></i>
                  </span>
                  <div>
                    <h4 className="mb-0 fw-semibold">{info.value}</h4>
                    <p className="text-muted mb-0 small">{info.label}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* ── Présentation de la plateforme ───────────────────────────── */}
        <div className="card mb-4">
          <div className="card-body p-4">
            <div className="row g-4 align-items-center">
              <div className="col-lg-8">
                <h4 className="mb-2">À propos de la plateforme</h4>
                <p className="text-muted mb-3">
                  {ABOUT_APP.name} centralise la gestion administrative du club au
                  sein d&apos;une interface unique&nbsp;: suivi des membres,
                  planification des activités, gestion de la trésorerie et
                  conservation des archives. Chaque module est pensé pour simplifier
                  le travail du bureau et garder une trace claire de la vie du club.
                </p>
                <ul className="list-unstyled about-checklist mb-0">
                  <li><i className="ri-checkbox-circle-fill text-primary me-2"></i>Interface unifiée pour toute la gestion du club</li>
                  <li><i className="ri-checkbox-circle-fill text-primary me-2"></i>Droits d&apos;accès adaptés à chaque rôle</li>
                  <li><i className="ri-checkbox-circle-fill text-primary me-2"></i>Données centralisées, exportables et archivables</li>
                </ul>
              </div>
              <div className="col-lg-4">
                <div className="about-info-panel">
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Application</span>
                    <span className="fw-medium">{ABOUT_APP.name}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Version</span>
                    <span className="fw-medium font-monospace">{ABOUT_APP.version}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">Dernière MAJ</span>
                    <span className="fw-medium">{ABOUT_APP.releaseDate}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span className="text-muted">Statut</span>
                    <span className="badge bg-success-subtle text-success">
                      <i className="ri-checkbox-blank-circle-fill me-1 fs-11"></i>Opérationnel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* ── Modules de gestion ──────────────────────────────────────── */}
        <div id="about-modules" className="mb-2">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-3 gap-2">
            <div>
              <h4 className="mb-1">Modules de gestion</h4>
              <p className="text-muted mb-0">Les espaces qui composent la plateforme d&apos;administration.</p>
            </div>
          </div>
          <div className="row g-4 mb-4">
            {ABOUT_MODULES.map((mod) => (
              <div className="col-md-6 col-xl-4" key={mod.title}>
                <a href={mod.href} className="card about-module-card h-100 mb-0 text-decoration-none">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <span className={`about-pole-icon bg-${mod.color}-subtle text-${mod.color}`} aria-hidden>
                        <i className={mod.icon}></i>
                      </span>
                      {mod.status === "beta" ? (
                        <span className="badge bg-warning-subtle text-warning">Bêta</span>
                      ) : (
                        <span className="badge bg-success-subtle text-success">Stable</span>
                      )}
                    </div>
                    <h5 className="fs-15 mb-2 text-body">{mod.title}</h5>
                    <p className="text-muted small mb-3">{mod.description}</p>
                    <span className="about-module-link">
                      Ouvrir le module<i className="ri-arrow-right-line ms-1"></i>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
  
        {/* ── Rôles & permissions ─────────────────────────────────────── */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="ri-shield-keyhole-line me-2 text-primary"></i>Rôles &amp; permissions
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle mb-0 about-roles-table">
                <thead>
                  <tr>
                    <th scope="col">Rôle</th>
                    <th scope="col">Description</th>
                    <th scope="col">Accès principaux</th>
                  </tr>
                </thead>
                <tbody>
                  {ABOUT_ROLES.map((r) => (
                    <tr key={r.role}>
                      <td>
                        <span className={`badge ${r.badgeClass}`}>{r.role}</span>
                      </td>
                      <td className="text-muted small">{r.description}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {r.permissions.map((p) => (
                            <span key={p} className="badge bg-light text-muted">{p}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        {/* ── Pile technique ──────────────────────────────────────────── */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="ri-stack-line me-2 text-primary"></i>Technologies utilisées
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {ABOUT_TECH.map((t) => (
                <div className="col-md-6 col-xl-4" key={t.name}>
                  <div className="about-tech-item d-flex align-items-center gap-3">
                    <span className="about-tech-icon" aria-hidden>
                      <i className={t.icon}></i>
                    </span>
                    <div>
                      <h6 className="mb-0 fs-14">{t.name}</h6>
                      <p className="text-muted small mb-0">{t.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* ── Support & contact ───────────────────────────────────────── */}
        <div id="about-support" className="row g-4 mb-4">
          {ABOUT_SUPPORT.map((s) => (
            <div className="col-md-4" key={s.title}>
              <div className="card about-support-card h-100 mb-0">
                <div className="card-body text-center">
                  <span className="about-value-icon" aria-hidden>
                    <i className={s.icon}></i>
                  </span>
                  <h6 className="mt-3 mb-2">{s.title}</h6>
                  <p className="text-muted small mb-3">{s.description}</p>
                  <a href={s.href} className="btn btn-light btn-sm">
                    {s.action}<i className="ri-arrow-right-line ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* ── Pied / mentions ─────────────────────────────────────────── */}
        <div className="card mb-0">
          <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 text-muted small">
            <span>
              <i className="ri-copyright-line me-1"></i>
              {new Date().getFullYear()} {ABOUT_APP.name} — Club Informatique &amp; Électronique. Tous droits réservés.
            </span>
            <span>
              Distribué sous licence MIT · Version {ABOUT_APP.version}
            </span>
          </div>
        </div>
      </div>
    );
  }