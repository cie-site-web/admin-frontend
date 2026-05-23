"use client";

import React from "react";
import NavMenuItem from "./NavMenuItem";
import { MENU } from "./menuItems";

/**
 * Navigation horizontale. Reproduit le partial horizontal.html.
 * Consomme exactement le même MENU que Sidebar — un seul endroit pour
 * gérer la structure de navigation, deux rendus visuels.
 */
export default function HorizontalNav() {
  return (
    <>
      <aside className="pe-app-sidebar horizontal-sidebar" id="horizontal-aside">
        <nav className="pe-app-sidebar-menu nav nav-pills">
          <ul
            className="pe-horizontal-menu mb-0 list-unstyled"
            id="horizontal-menu"
          >
            {MENU.map((section, sectionIdx) => (
              <React.Fragment key={sectionIdx}>
                <li className="pe-menu-title">{section.title}</li>
                {section.items.map((item, itemIdx) => (
                  <NavMenuItem key={itemIdx} item={item} />
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="sidebar-backdrop" id="sidebar-backdrop"></div>
    </>
  );
}