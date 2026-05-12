"use client";

import React, { useState, useRef, useEffect } from "react";

type DropdownVariant =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

type DropdownItemType =
  | { type: "item"; label: string; href?: string; onClick?: () => void }
  | { type: "divider" };

interface DropdownSplitProps {
  label: string;
  items: DropdownItemType[];
  variant?: DropdownVariant;
  menuAlign?: "start" | "end";
  onLabelClick?: () => void;
  className?: string;
}

export default function DropdownSplit({
  label,
  items,
  variant = "primary",
  menuAlign = "start",
  onLabelClick,
  className = "",
}: DropdownSplitProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`btn-group${open ? " show" : ""} ${className}`.trim()}>
      {/* Bouton principal */}
      <button
        type="button"
        className={`btn btn-${variant}`}
        onClick={onLabelClick}
      >
        {label}
      </button>

      {/* Bouton toggle */}
      <button
        type="button"
        className={`btn btn-${variant} dropdown-toggle dropdown-toggle-split`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>

      {/* Menu */}
      <ul className={`dropdown-menu${open ? " show" : ""}${menuAlign === "end" ? " dropdown-menu-end" : ""}`}>
        {items.map((item, i) => {
          if (item.type === "divider") {
            return (
              <li key={i}>
                <hr className="dropdown-divider" />
              </li>
            );
          }
          return (
            <li key={i}>
              <a
                className="dropdown-item"
                href={item.onClick ? undefined : (item.href ?? "#")}
                role={item.onClick ? "button" : undefined}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}