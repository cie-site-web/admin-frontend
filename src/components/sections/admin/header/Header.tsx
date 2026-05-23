"use client";

import React from "react";
import Link from "next/link";
import NotificationsDropdown from "./NotificationsDropdown";
import CartDropdown from "./CartDropdown";
import ProfileMenu from "./ProfileMenu";
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
            {/* Bloc gauche : logo + toggles sidebar */}
            <div className="d-inline-flex align-items-center gap-2">
              <Link
                href="/"
                className="align-items-end logo-main d-none me-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  height={40}
                  width={40}
                  className="logo-dark"
                  alt="Logo Club Informatique de l'EPO (CIE)"
                  src="/assets/images/logo-md.png"
                />
                <h3 className="text-body-emphasis fw-bolder mb-0 ms-1">
                  CIE
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
            </div>

            {/* Bloc droit : notifications, cart, settings, dark mode, profil */}
            <div className="flex-shrink-0 d-flex align-items-center gap-4">
              <div className="d-flex gap-2 align-items-center">
                <NotificationsDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                />
                <CartDropdown items={cartItems} />
              </div>

              <DarkModeToggle />
              <ProfileMenu user={user} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}