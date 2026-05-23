import React from "react";

type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type AlertStyle = "default" | "outline" | "border" | "subtle";

const DEFAULT_ICONS: Record<AlertVariant, string> = {
  primary:   "bi bi-info-circle-fill",
  secondary: "bi bi-exclamation-circle-fill",
  success:   "bi bi-check-circle-fill",
  danger:    "bi bi-exclamation-triangle-fill",
  warning:   "bi bi-exclamation-triangle-fill",
  info:      "bi bi-info-circle-fill",
  light:     "bi bi-lightbulb-fill",
  dark:      "bi bi-moon-fill",
};

function buildAlertClass(variant: AlertVariant, style: AlertStyle): string {
  if (style === "default") return `alert-${variant}`;
  return `alert-${style}-${variant}`;
}

interface Alert2Props {
  variant: AlertVariant;
  style?: AlertStyle;
  message: React.ReactNode;
  icon?: string;
  className?: string;
}

export default function Alert2({
  variant,
  style = "default",
  message,
  icon,
  className = "",
}: Alert2Props) {
  const iconClass = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className={`alert ${buildAlertClass(variant, style)} d-flex align-items-center mb-0 ${className}`.trim()}
      role="alert"
    >
      <i className={`${iconClass} flex-shrink-0 me-2`} aria-hidden="true" />
      <div>{message}</div>
    </div>
  );
}