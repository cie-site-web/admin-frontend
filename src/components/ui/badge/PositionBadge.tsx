import React from "react";

type BtnVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type BadgeColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type ButtonShape = "default" | "rounded" | "circle";

interface BadgeConfig {
  color: BadgeColor;
  content?: React.ReactNode;   // texte/nombre — absent = dot only
  srText?: string;
  border?: boolean;            // ajoute border border-light-subtle
}

interface PositionBadgeProps {
  btnVariant?: BtnVariant;
  label?: string;              // texte du bouton (si pas icon-only)
  icon?: string;               // classe icône ex: "ri-mail-fill"
  shape?: ButtonShape;         // default | rounded | circle
  badge?: BadgeConfig;         // absent = pas de badge
  onClick?: () => void;
  className?: string;
}

export default function PositionBadge({
  btnVariant = "primary",
  label,
  icon,
  shape = "default",
  badge,
  onClick,
  className = "",
}: PositionBadgeProps) {
  const isIconOnly = !label && !!icon;

  const btnClass = [
    "btn",
    `btn-${btnVariant}`,
    "position-relative",
    isIconOnly ? "p-0 icon-btn" : "",
    shape === "circle" ? "rounded-circle" : shape === "rounded" ? "rounded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderBadge = () => {
    if (!badge) return null;

    const isDot = !badge.content;

    const badgeClass = [
      "position-absolute top-0 start-100 translate-middle badge",
      isDot ? "border rounded-circle p-1" : "rounded-pill",
      isDot && badge.border ? "border-light-subtle" : "",
      `bg-${badge.color}`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span className={badgeClass}>
        {!isDot && badge.content}
        {badge.srText && (
          <span className="visually-hidden">{badge.srText}</span>
        )}
      </span>
    );
  };

  return (
    <button type="button" className={btnClass} onClick={onClick}>
      {icon && <i className={icon} aria-hidden="true" />}
      {label}
      {renderBadge()}
    </button>
  );
}