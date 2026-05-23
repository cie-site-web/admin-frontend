"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./menuItems";

interface NavMenuItemProps {
  item: NavItem;
  /** Profondeur dans l'arborescence (0 = niveau racine du menu) */
  level?: number;
}

export default function NavMenuItem({ item, level = 0 }: NavMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const hasChildren = !!item.children && item.children.length > 0;

  // Item actif si son href correspond exactement à l'URL courante
  const isActive = item.href === pathname;

  

  return (
    <li className={`pe-slide pe-has-sub`}>
      {hasChildren ? (
        <a
          href={`#${item.collapseId ?? ""}`}
          className="pe-nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen}
          aria-controls={item.collapseId}
        >
          {item.icon && <i className={`${item.icon} pe-nav-icon`}></i>}
          <span className="pe-nav-content">{item.label}</span>
          <i className="ri-arrow-down-s-line pe-nav-arrow"></i>
        </a>
      ) : (
        <Link
          href={item.href ?? "#"}
          className={`pe-nav-link ${isActive ? "active" : ""}`}
        >
          {item.icon && <i className={`${item.icon} pe-nav-icon`}></i>}
          <span className="pe-nav-content">{item.label}</span>
        </Link>
      )}

      {hasChildren && (
        <ul
          id={item.collapseId}
          className={`pe-slide-menu collapse ${isOpen ? "show" : ""}`}
        >
          {item.children!.map((child, idx) => (
            <NavMenuItem key={idx} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}