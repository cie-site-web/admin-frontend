"use client";

import React, { useState } from "react";

type PaginationSize    = "sm" | "md" | "lg";
type PaginationColor   =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

interface PaginationProps {
  totalPages: number;
  defaultPage?: number;
  size?: PaginationSize;
  rounded?: boolean;
  color?: PaginationColor;
  ariaLabel?: string;
  prevIcon?: string;
  nextIcon?: string;
  onChange?: (page: number) => void;
  className?: string;
}

export default function Pagination({
  totalPages,
  defaultPage = 1,
  size = "md",
  rounded = false,
  color,
  ariaLabel = "Page navigation",
  prevIcon = "ri-arrow-left-s-line fw-semibold",
  nextIcon = "ri-arrow-right-s-line fw-semibold",
  onChange,
  className = "",
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onChange?.(page);
  };

  const ulClass = [
    "pagination",
    size !== "md" ? `pagination-${size}` : "",
    rounded ? "pagination-rounded" : "",
    color ? `pagination-${color}` : "",
    "mb-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav aria-label={ariaLabel}>
      <ul className={ulClass}>
        {/* Prev */}
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e) => { e.preventDefault(); goTo(currentPage - 1); }}
          >
            <i className={prevIcon} aria-hidden="true" />
          </a>
        </li>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item${page === currentPage ? " active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={(e) => { e.preventDefault(); goTo(page); }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* Next */}
        <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => { e.preventDefault(); goTo(currentPage + 1); }}
          >
            <i className={nextIcon} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </nav>
  );
}