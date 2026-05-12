"use client";

import React, { useState, useRef, useEffect } from "react";

export interface TableBorderlessColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

// Dropdown d'actions intégré
interface ActionItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

export function TableDropdownActions({ id, items }: { id: string; items: ActionItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`dropdown${open ? " show" : ""}`}>
      <button
        className="btn btn-light-primary icon-btn"
        type="button"
        id={id}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="ri-more-2-line fw-semibold fs-16" aria-hidden="true" />
      </button>
      <ul className={`dropdown-menu${open ? " show" : ""}`}>
        {items.map((item, i) => (
          <li key={i}>
            <a className="dropdown-item" href="#"
              onClick={(e) => { e.preventDefault(); item.onClick?.(); setOpen(false); }}>
              {item.icon && <i className={`${item.icon} me-1`} aria-hidden="true" />}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TableBorderlessProps<T extends Record<string, unknown>> {
  columns: TableBorderlessColumn<T>[];
  data: T[];
  className?: string;
}

export default function TableBorderless<T extends Record<string, unknown>>({
  columns,
  data,
  className = "",
}: TableBorderlessProps<T>) {
  return (
    <div className="table-responsive">
      <table className={`table text-nowrap table-borderless mb-0 ${className}`.trim()}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} className={col.className ?? ""}>
                  {col.render ? col.render(row, i) : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}