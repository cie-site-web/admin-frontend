"use client";

import { useState } from "react";
import type { ArchiveCategoryFilter, ArchiveType } from "@/types/archive";

interface ArchiveFiltersSidebarProps {
  activeType: ArchiveType;
  categories: ArchiveCategoryFilter[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  onReset: () => void;
  offcanvasId?: string;
}

export default function ArchiveFiltersSidebar({
  activeType,
  categories,
  activeCategory,
  onCategoryChange,
  onReset,
  offcanvasId = "archiveFiltersOffcanvas",
}: ArchiveFiltersSidebarProps) {
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [activeVisibility, setActiveVisibility] = useState<string[]>([]);

  const yearTitle = activeType === "evenements" ? "Année de l'événement" : "Année d'archivage";
  const formatChips =
    activeType === "documents"
      ? ["PDF", "DOC", "XLS", "ZIP"]
      : activeType === "code"
        ? ["TypeScript", "JavaScript", "Python", "SQL", "ZIP"]
        : activeType === "medias"
          ? ["Photos", "Vidéos", "PDF"]
          : activeType === "evenements"
            ? ["Sport", "Culture", "Formation"]
            : [];

  const visibilityChips = ["Public", "Membres", "Bureau"];

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleReset = () => {
    setActiveFormats([]);
    setActiveVisibility([]);
    onReset();
  };

  const content = (
    <div className="card archive-filters-card overflow-hidden mb-0">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="fs-16 mb-0">
          <i className="ri-filter-3-line me-2 text-primary"></i>Filtres
        </h3>
        <button
          type="button"
          className="btn btn-link btn-sm p-0 text-decoration-none"
          onClick={handleReset}
        >
          <i className="ri-refresh-line me-1"></i>Effacer
        </button>
      </div>

      <div className="px-4 pt-3">
        <div className="form-icon right">
          <input
            type="text"
            className="form-control rounded-3 form-control-icon"
            placeholder="Rechercher dans les filtres..."
          />
          <i className="ri-search-2-line text-muted"></i>
        </div>
      </div>

      <div className="card-body border-bottom">
        <h4 className="text-muted text-uppercase fs-12 fw-medium mb-3">Catégorie</h4>
        <ul className="list-unstyled mb-0 archive-filter-list">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={`archive-filter-item w-100 d-flex justify-content-between align-items-center${
                  activeCategory === cat.id ? " active" : ""
                }`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="badge bg-light text-muted">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-body border-bottom">
        <h4 className="text-muted text-uppercase fs-12 fw-medium mb-3">{yearTitle}</h4>
        <div className="row g-2">
          <div className="col-6">
            <input type="number" className="form-control form-control-sm" placeholder="De" defaultValue={2020} />
          </div>
          <div className="col-6">
            <input type="number" className="form-control form-control-sm" placeholder="À" defaultValue={2025} />
          </div>
        </div>
      </div>

      <div className="card-body border-bottom">
        <h4 className="text-muted text-uppercase fs-12 fw-medium mb-3">Format</h4>
        <div className="d-flex flex-wrap gap-2">
          {formatChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`archive-chip${activeFormats.includes(chip) ? " active" : ""}`}
              aria-pressed={activeFormats.includes(chip)}
              onClick={() => toggle(chip, activeFormats, setActiveFormats)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="card-body">
        <h4 className="text-muted text-uppercase fs-12 fw-medium mb-3">Visibilité</h4>
        <div className="d-flex flex-wrap gap-2">
          {visibilityChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`archive-chip${activeVisibility.includes(chip) ? " active" : ""}`}
              aria-pressed={activeVisibility.includes(chip)}
              onClick={() => toggle(chip, activeVisibility, setActiveVisibility)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="d-none d-xl-block col-xl-3">{content}</aside>

      <div
        className="offcanvas offcanvas-start d-xl-none"
        tabIndex={-1}
        id={offcanvasId}
        aria-labelledby={`${offcanvasId}Label`}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${offcanvasId}Label`}>
            Filtres
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
        </div>
        <div className="offcanvas-body p-0">{content}</div>
      </div>
    </>
  );
}