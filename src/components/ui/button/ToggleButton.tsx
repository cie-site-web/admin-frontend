"use client";

import React, { useState } from "react";

type BtnVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface ToggleContent {
  icon?: string;   // classe icône ex: "ri-add-line align-bottom me-1"
  label?: string;
}

interface ToggleButtonProps {
  on: ToggleContent;    // état actif (icon-on = état par défaut / non pressé)
  off: ToggleContent;   // état inactif (icon-off = état pressé/toggled)
  variant?: BtnVariant;
  iconOnly?: boolean;
  defaultPressed?: boolean;
  onChange?: (pressed: boolean) => void;
  className?: string;
}

export default function ToggleButton({
  on,
  off,
  variant = "primary",
  iconOnly = false,
  defaultPressed = false,
  onChange,
  className = "",
}: ToggleButtonProps) {
  const [pressed, setPressed] = useState(defaultPressed);

  const handleClick = () => {
    const next = !pressed;
    setPressed(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      className={[
        "btn",
        `btn-${variant}`,
        iconOnly ? "icon-btn" : "",
        "custom-toggle",
        pressed ? "active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={pressed}
      onClick={handleClick}
    >
      <span className="icon-on">
        {on.icon && <i className={on.icon} aria-hidden="true" />}
        {on.label}
      </span>
      <span className="icon-off">
        {off.icon && <i className={off.icon} aria-hidden="true" />}
        {off.label}
      </span>
    </button>
  );
}