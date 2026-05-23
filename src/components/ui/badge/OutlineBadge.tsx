import React from "react";

type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type BadgePosition = "inline" | "floating";

interface OutlineBadgeProps {
  label: string;
  badgeContent: React.ReactNode;
  variant?: BadgeVariant;
  position?: BadgePosition;
  pill?: boolean;
  srText?: string;
  onClick?: () => void;
  className?: string;
}

export default function OutlineBadge({
  label,
  badgeContent,
  variant = "primary",
  position = "inline",
  pill = false,
  srText,
  onClick,
  className = "",
}: OutlineBadgeProps) {
  const isFloating = position === "floating";

  const badgeClass = [
    "badge",
    pill || isFloating ? "rounded-pill" : "",
    `bg-${variant}`,
    isFloating
      ? "position-absolute top-0 start-100 translate-middle"
      : "ms-1",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={`btn btn-outline-${variant}${isFloating ? " position-relative" : ""} ${className}`.trim()}
      onClick={onClick}
    >
      {label}
      <span className={badgeClass}>
        {badgeContent}
        {srText && <span className="visually-hidden">{srText}</span>}
      </span>
    </button>
  );
}