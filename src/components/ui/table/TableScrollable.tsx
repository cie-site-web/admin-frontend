"use client";

import React, { useState } from "react";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

type SortDir = "asc" | "desc" | null;

interface TableScrollableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
}

export default function TableScrollable<T extends Record<string, unknown>>({
  columns,
  data,
  striped = false,
  pageSize: defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  className = "",
}: TableScrollableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return [...data];
    return [...data].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      const next: SortDir = sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc";
      setSortDir(next);
      if (next === null) setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className={`table table-nowrap table-striped${striped ? " table-striped" : ""} table-bordered w-100 mb-0 ${className}`.trim()}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? "sorting" : ""}
                  style={{ cursor: col.sortable ? "pointer" : undefined }}
                  onClick={() => col.sortable && handleSort(col.key)}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === "asc" ? "ascending" : "descending"
                      : undefined
                  }
                >
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <i className={`ms-1 ri-arrow-${sortDir === "asc" ? "up" : "down"}-s-line`} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
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

      {/* Footer pagination */}
      <div className="d-flex gap-3 justify-content-center justify-content-md-between flex-wrap mt-3">
        <div className="dataTables_length">
          <select
            className="form-select form-select-sm"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {pageSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <ul className="pagination mb-0">
          <li className={`page-item${page === 1 ? " disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}>
              <i className="ri-arrow-left-s-line" />
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <li key={p} className={`page-item${p === page ? " active" : ""}`}>
              <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setPage(p); }}>{p}</a>
            </li>
          ))}
          <li className={`page-item${page === totalPages ? " disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }}>
              <i className="ri-arrow-right-s-line" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}