"use client";

import React from "react";
import Link from "next/link";
import NavMenuItem from "./NavMenuItem";
import { MENU } from "./menuItems";

/**
 * Sidebar verticale (par défaut). Reproduit le partial sidebar.html.
 * Consomme MENU depuis menuItems.ts (source unique partagée avec HorizontalNav).
 */
export default function Sidebar() {
  return (
    <aside className="pe-app-sidebar" id="sidebar">
      <div className="pe-app-sidebar-logo px-6 d-flex align-items-center position-relative">
        <Link href="/" className="d-flex align-items-end logo-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={35}
            width={34}
            className="logo-dark"
            alt="Dark Logo"
            src="/assets/images/logo-md.png"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height={35}
            width={34}
            className="logo-light"
            alt="Light Logo"
            src="/assets/images/logo-md-light.png"
          />
          <h3 className="text-body-emphasis fw-bolder mb-0 ms-1">Urbix</h3>
        </Link>
        <button
          type="button"
          id="sidebarDefaultArrow"
          className="btn btn-sm p-0 fs-16 text-body-emphasis ms-auto float-end d-none icon-hover-btn"
          aria-label="Collapse sidebar"
        >
          <i className="ri-arrow-right-line fs-5"></i>
        </button>
      </div>

      <nav
        className="pe-app-sidebar-menu nav nav-pills"
        data-simplebar
        id="sidebar-simplebar"
      >
        <div className="d-flex align-items-start flex-column w-100">
          <ul className="pe-main-menu list-unstyled">
            {MENU.map((section, sectionIdx) => (
              <React.Fragment key={sectionIdx}>
                <li className="pe-menu-title">{section.title}</li>
                {section.items.map((item, itemIdx) => (
                  <NavMenuItem key={itemIdx} item={item} />
                ))}
              </React.Fragment>
            ))}
          </ul>

          {/* Widget en bas du sidebar */}
          <div className="sidebar-widget text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/sidebar-widget.png"
              alt="Widget"
            />
            <p className="text-muted fw-semibold">
              Click here to update the new version
            </p>
            <button className="btn btn-primary rounded-pill w-100">
              Update Now
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}