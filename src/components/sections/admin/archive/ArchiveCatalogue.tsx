"use client";

import { useMemo, useState } from "react";
import ArchiveCard from "@/components/ui/card/ArchiveCard";
import Pagination from "@/components/ui/pagination/Pagination";
import ArchiveFiltersSidebar from "./ArchiveFiltersSidebar";
import {
  ARCHIVE_ITEMS,
  ARCHIVE_TYPE_TABS,
  CODE_CATEGORIES,
  DOCUMENT_CATEGORIES,
  EVENT_CATEGORIES,
  MEDIA_CATEGORIES,
} from "./mockData";
import type { ArchiveType } from "@/types/archive";

const CATEGORIES_BY_TYPE = {
  documents: DOCUMENT_CATEGORIES,
  code: CODE_CATEGORIES,
  medias: MEDIA_CATEGORIES,
  evenements: EVENT_CATEGORIES,
} as const;

const PAGE_SIZE = 6;

export default function ArchiveCatalogue() {
  const [activeType, setActiveType] = useState<ArchiveType>("documents");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");

  const categories = CATEGORIES_BY_TYPE[activeType];

  const filteredItems = useMemo(() => {
    let items = ARCHIVE_ITEMS.filter((item) => item.type === activeType);
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    return [...items].sort((a, b) => {
      if (sortBy === "year-desc") return b.year - a.year;
      if (sortBy === "year-asc") return a.year - b.year;
      if (sortBy === "title") return a.title.localeCompare(b.title, "fr");
      return b.reference.localeCompare(a.reference);
    });
  }, [activeType, activeCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice(0, PAGE_SIZE);

  const handleTypeChange = (type: ArchiveType) => {
    setActiveType(type);
    setActiveCategory("all");
  };

  const handleReset = () => {
    setActiveCategory("all");
    setSortBy("recent");
  };

  const activeTab = ARCHIVE_TYPE_TABS.find((t) => t.type === activeType);

  return (
    <div className="position-relative z-1">
      <div className="archive-type-tabs-row d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="archive-type-tabs-wrapper">
          <div className="archive-type-tabs" role="tablist" aria-label="Types d'archives">
            {ARCHIVE_TYPE_TABS.map((tab) => (
              <button
                key={tab.type}
                type="button"
                role="tab"
                aria-selected={activeType === tab.type}
                className={`archive-type-tab${activeType === tab.type ? " active" : ""}`}
                onClick={() => handleTypeChange(tab.type)}
              >
                <i className={`${tab.icon} archive-type-tab-icon`} aria-hidden></i>
                <span className="archive-type-tab-label">{tab.label}</span>
                <span className="archive-type-tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="btn btn-danger flex-shrink-0 ms-xl-auto">
          <i className="ri-add-line me-1"></i>Ajouter
        </button>
      </div>

      <button
        type="button"
        className="btn btn-outline-secondary w-100 d-xl-none mb-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#archiveFiltersOffcanvas"
      >
        <i className="ri-filter-3-line me-2"></i>Filtres
      </button>

      <div className="row g-4">
        <ArchiveFiltersSidebar
          activeType={activeType}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onReset={handleReset}
        />

        <div className="col-xl-9">
          <div className="card archive-toolbar mb-4">
            <div className="card-body py-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="archive-catalogue-count">
                <strong>{filteredItems.length}</strong>{" "}
                {filteredItems.length > 1 ? "éléments archivés" : "élément archivé"}
                {activeTab && (
                  <span className="text-muted ms-1">— {activeTab.label}</span>
                )}
              </div>
              <div className="d-flex flex-wrap align-items-center gap-2">
                <select
                  className="form-select form-select-sm archive-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Trier les archives"
                >
                  <option value="recent">Plus récents</option>
                  <option value="year-desc">Année décroissante</option>
                  <option value="year-asc">Année croissante</option>
                  <option value="title">Titre (A–Z)</option>
                </select>
                <div className="btn-group archive-view-toggle" role="group" aria-label="Mode d'affichage">
                  <button
                    type="button"
                    className={`btn btn-light btn-sm${viewMode === "grid" ? " active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Vue grille"
                    aria-pressed={viewMode === "grid"}
                  >
                    <i className="ri-layout-grid-line"></i>
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light btn-sm${viewMode === "list" ? " active" : ""}`}
                    onClick={() => setViewMode("list")}
                    aria-label="Vue liste"
                    aria-pressed={viewMode === "list"}
                  >
                    <i className="ri-list-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <span className="archive-empty-icon" aria-hidden>
                  <i className="ri-inbox-archive-line"></i>
                </span>
                <h6 className="mb-1">Aucun élément trouvé</h6>
                <p className="text-muted mb-3">Aucune archive ne correspond à vos filtres actuels.</p>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleReset}>
                  <i className="ri-refresh-line me-1"></i>Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="row g-4">
              {pageItems.map((item, i) => (
                <ArchiveCard key={item.id} item={item} view="grid" index={i} />
              ))}
            </div>
          ) : (
            <div>
              {pageItems.map((item, i) => (
                <ArchiveCard key={item.id} item={item} view="list" index={i} />
              ))}
            </div>
          )}

          {filteredItems.length > PAGE_SIZE && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination totalPages={totalPages} color="primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}