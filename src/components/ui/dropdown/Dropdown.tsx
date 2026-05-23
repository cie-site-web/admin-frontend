"use client";

import React, { useState, useRef, useEffect } from "react";

type DropdownVariant =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

type DropdownItemType =
  | { type: "item"; label: string; href?: string; onClick?: () => void }
  | { type: "divider" };

interface DropdownProps {
  label: string;
  items: DropdownItemType[];
  variant?: DropdownVariant;
  menuAlign?: "start" | "end";
  className?: string;
}

export default function Dropdown({
  label,
  items,
  variant = "primary",
  menuAlign = "start",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu si clic en dehors
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
    <div ref={ref} className={`dropdown${open ? " show" : ""} ${className}`.trim()}>
      <button
        className={`btn btn-${variant} dropdown-toggle`}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      <ul className={`dropdown-menu${open ? " show" : ""}${menuAlign === "end" ? " dropdown-menu-end" : ""}`}>
        {items.map((item, i) => {
          if (item.type === "divider") {
            return <div key={i} className="dropdown-divider" />;
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