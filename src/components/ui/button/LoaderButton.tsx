"use client";

import React from "react";

type BtnVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface LoaderButtonProps {
  label: string;
  loadingText?: string;
  loadingIcon?: string;
  isLoading?: boolean;
  variant?: BtnVariant;
  onClick?: () => void;
  className?: string;
}

export default function LoaderButton({
  label,
  loadingText = "Loading...",
  loadingIcon = "ri-loader-2-fill",
  isLoading = false,
  variant = "primary",
  onClick,
  className = "",
}: LoaderButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} btn-loader ${isLoading ? "loading" : ""} ${className}`.trim()}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      <span className="indicator-label">{label}</span>
      <span className="indicator-progress d-flex gap-2 align-items-center">
        <span>{loadingText}</span>
        <i className={loadingIcon} aria-hidden="true" />
      </span>
    </button>
  );
}