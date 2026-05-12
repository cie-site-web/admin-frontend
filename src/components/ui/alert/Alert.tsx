import React from "react";

type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

const DEFAULT_ICONS: Record<AlertVariant, string> = {
  primary: "bi bi-info-circle-fill",
  secondary: "bi bi-exclamation-circle-fill",
  success: "bi bi-check-circle-fill",
  danger: "bi bi-x-circle-fill",
  warning: "bi bi-exclamation-triangle-fill",
  info: "bi bi-info-circle-fill",
  light: "bi bi-lightbulb-fill",
  dark: "bi bi-moon-fill",
};

interface AlertProps {
  variant: AlertVariant;
  message: React.ReactNode;
  icon?: string; // classe CSS personnalisée, ex: "bi bi-star-fill"
  className?: string;
}

export default function Alert({ variant, message, icon, className = "" }: AlertProps) {
  const iconClass = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className={`alert alert-border-${variant} d-flex align-items-center ${className}`.trim()}
      role="alert"
    >
      <i className={`${iconClass} me-2`} aria-hidden="true" />
      <div>{message}</div>
    </div>
  );
}