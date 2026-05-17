"use client";

import React from "react";
import Link from "next/link";
import NotificationsDropdown from "./NotificationsDropdown";
import CartDropdown from "./CartDropdown";
import ProfileMenu from "./ProfileMenu";
import SearchModal from "./SearchModal";
import DarkModeToggle from "./DarkModeToggle";
import type {
  NotificationItem,
  CartItem,
  UserProfile,
} from "./types";

interface HeaderProps {
  user: UserProfile;
  notifications: NotificationItem[];
  unreadCount: number;
  cartItems: CartItem[];
}

export default function Header({
  user,
  notifications,
  unreadCount,
  cartItems,
}: HeaderProps) {
  return (
    <>
      <header className="app-header" id="appHeader">
        <div className="container-fluid w-100">
          <div className="d-flex justify-content-between align-items-center">
            {/* Bloc gauche : logo + toggles sidebar + barre de recherche */}
            <div className="d-inline-flex align-items-center gap-2">
              <Link
                href="/"
                className="align-items-end logo-main d-none me-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  height={35}
                  width={34}
                  className="logo-dark"
                  alt="Dark Logo"
                  src="/assets/images/logo-md.png"
                />
                <h3 className="text-body-emphasis fw-bolder mb-0 ms-1">
                  Urbix
                </h3>
              </Link>

              <button
                type="button"
                className="vertical-toggle btn header-btn"
                id="toggleSidebar"
                aria-label="Toggle Sidebar"
              >
                <i className="bi bi-arrow-bar-left header-icon"></i>
              </button>

              <button
                type="button"
                className="horizontal-toggle btn header-btn d-none"
                id="toggleHorizontal"
                aria-label="Toggle Menu"
              >
                <i className="ri-menu-2-line header-icon"></i>
              </button>

              {/* Barre de recherche (ouvre #searchModal) */}
              <div
                className="form-icon right d-none d-md-block"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <input
                  type="text"
                  className="form-control form-control-icon bg-transparent rounded-pill min-w-300px"
                  id="Search"
                  placeholder="Search"
                  readOnly
                />
                <div className="search-btn">
                  <div>
                    <i className="ri-search-line text-muted fs-16"></i>
                  </div>
                  <div>
                    <span className="badge bg-light-subtle text-muted">
                      CTRL D
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloc droit : notifications, cart, settings, dark mode, profil */}
            <div className="flex-shrink-0 d-flex align-items-center gap-4">
              <div className="d-flex gap-2 align-items-center">
                <NotificationsDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                />
                <CartDropdown items={cartItems} />

                {/* Bouton search mobile */}
                <button
                  className="btn header-btn d-block d-md-none"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                  aria-label="Open search"
                >
                  <i className="ri-search-line"></i>
                </button>
              </div>

              <DarkModeToggle />
              <ProfileMenu user={user} />
            </div>
          </div>
        </div>
      </header>

      <SearchModal />
    </>
  );
}