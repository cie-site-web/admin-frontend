"use client";

import React from "react";

export interface TableBorderedColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

interface TableBorderedProps<T extends Record<string, unknown>> {
  columns: TableBorderedColumn<T>[];
  data: T[];
  className?: string;
}

export default function TableBordered<T extends Record<string, unknown>>({
  columns,
  data,
  className = "",
}: TableBorderedProps<T>) {
  return (
    <div className="table-responsive">
      <table className={`table text-nowrap table-bordered mb-0 ${className}`.trim()}>
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