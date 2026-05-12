"use client";

import React, { useState } from "react";

type NavColor =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

interface NavItem {
  id: string;
  label: string;
  icon?: string;
  content?: React.ReactNode;
}

interface NavPillsProps {
  items: NavItem[];
  defaultActiveId?: string;
  color?: NavColor;
  vertical?: boolean;
  gap?: number;
  className?: string;
  onChange?: (id: string) => void;
}

export default function NavPills({
  items,
  defaultActiveId,
  color = "success",
  vertical = false,
  gap = 3,
  className = "",
  onChange,
}: NavPillsProps) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? "");

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const navClass = [
    "nav",
    `gap-${gap}`,
    "custom-verti-nav-pills",
    `nav-${color}`,
    "text-center",
    vertical ? "flex-column" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <ul className={navClass} role="tablist">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="nav-item" role="presentation">
              <a
                className={`nav-link${isActive ? " active" : ""}`}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? undefined : -1}
                onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                href={`#${item.id}`}
              >
                {item.icon && (
                  <i className={`${item.icon} d-block fs-20 mb-1`} aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Panneaux de contenu */}
      {items.some((i) => i.content) && (
        <div className="tab-content">
          {items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`tab-pane fade${item.id === activeId ? " show active" : ""}`}
              role="tabpanel"
            >
              {item.content}
            </div>
          ))}
        </div>
      )}
    </>
  );
}