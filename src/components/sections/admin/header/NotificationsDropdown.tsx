"use client";

import React from "react";
import type { NotificationItem } from "./types";

interface NotificationsDropdownProps {
  notifications: NotificationItem[];
  unreadCount: number;
}

export default function NotificationsDropdown({
  notifications,
  unreadCount,
}: NotificationsDropdownProps) {
  return (
    <div className="dropdown pe-dropdown-mega d-none d-md-block">
      <button
        className="btn header-btn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Notifications"
      >
        <i className="bi bi-bell"></i>
        <div className="icon-dot"></div>
      </button>
      <div className="dropdown-menu dropdown-mega-md header-dropdown-menu pe-noti-dropdown-menu p-0">
        <div className="p-3 border-bottom">
          <h6 className="d-flex align-items-center mb-0">
            Notification{" "}
            <span className="badge bg-success-subtle text-success ms-auto">
              {unreadCount} Unread
            </span>
          </h6>
        </div>
        <div>
          {notifications.map((n) => (
            <NotificationRow key={n.id} item={n} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <div className="noti-item">
      {item.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.avatarUrl} alt="Avatar" className="avatar-md" />
      ) : (
        <div
          className={`avatar-md d-flex align-items-center justify-content-center fs-16 ${
            item.iconBg ?? "bg-primary-subtle text-primary"
          }`}
        >
          <i className={item.icon}></i>
        </div>
      )}

      <div className="flex-grow-1">
        <a href="#" className="text-decoration-none stretched-link">
          <h6 className="mb-1 fw-semibold">{item.title}</h6>
        </a>
        <p className="text-muted mb-2 fs-12">{item.date}</p>

        {item.detail && (
          <div className="p-2 bg-body-tertiary bg-opacity-50 rounded">
            <p className="mb-0 lh-base fs-13">{item.detail}</p>
          </div>
        )}

        {item.attachment && (
          <div className="d-flex align-items-center gap-2 p-2 position-relative z-1 border rounded">
            <div className="avatar-md d-flex align-items-center rounded justify-content-center flex-shrink-0 bg-danger-subtle text-danger">
              <i className={item.attachment.icon}></i>
            </div>
            <div className="flex-grow-1">
              <a href="#">
                <h6 className="mb-2">{item.attachment.name}</h6>
              </a>
              <p className="mb-0 text-muted fs-12">{item.attachment.size}</p>
            </div>
          </div>
        )}
      </div>

      <a
        href="#"
        className="position-absolute top-0 end-0 mt-2 me-3 fs-18 link link-danger z-1"
        aria-label="Dismiss notification"
      >
        <i className="bi bi-x"></i>
      </a>
    </div>
  );
}