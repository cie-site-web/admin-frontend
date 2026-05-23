"use client";

import React from "react";

// --- Types partagés ---

type BadgeVariant =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

interface BadgeConfig {
  content: React.ReactNode;
  variant?: BadgeVariant;
  subtle?: boolean; // bg-{variant}-subtle text-{variant}
  className?: string; // surcharge totale des classes du badge
}

// --- Variante 1 : liste de boutons cliquables avec badge flottant ---

interface ButtonItem {
  label: string;
  badge?: BadgeConfig;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListGroupButtonProps {
  items: ButtonItem[];
  className?: string;
}

export function ListGroupButton({ items, className = "" }: ListGroupButtonProps) {
  return (
    <div className={`list-group ${className}`.trim()}>
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          className={[
            "list-group-item list-group-item-action",
            item.active ? "active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={item.active ? "true" : undefined}
          disabled={item.disabled}
          onClick={item.onClick}
        >
          {item.label}
          {item.badge && (
            <span className={item.badge.className ?? buildBadgeClass(item.badge, "float-end")}>
              {item.badge.content}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// --- Variante 2 : liste <ul> avec label + badge aligné à droite ---

interface StatusItem {
  label: string;
  badge?: BadgeConfig;
}

interface ListGroupStatusProps {
  items: StatusItem[];
  className?: string;
}

export function ListGroupStatus({ items, className = "" }: ListGroupStatusProps) {
  return (
    <ul className={`list-group ${className}`.trim()}>
      {items.map((item, i) => (
        <li
          key={i}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {item.label}
          {item.badge && (
            <span className={item.badge.className ?? buildBadgeClass(item.badge)}>
              {item.badge.content}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// --- Helper ---

function buildBadgeClass(badge: BadgeConfig, extra?: string): string {
  const { variant = "primary", subtle = false } = badge;
  return [
    "badge",
    subtle ? `bg-${variant}-subtle text-${variant}` : `bg-${variant}`,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

// --- Export par défaut : les deux variantes ---

interface ListGroupProps {
  variant: "button" | "status";
  items: ButtonItem[] | StatusItem[];
  className?: string;
}

export default function ListGroup({ variant, items, className }: ListGroupProps) {
  if (variant === "button") {
    return <ListGroupButton items={items as ButtonItem[]} className={className} />;
  }
  return <ListGroupStatus items={items as StatusItem[]} className={className} />;
}