"use client";

import React from "react";

type RadioColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type RadioSize  = "sm" | "md" | "lg";

interface RadioProps {
  id: string;
  label: string;
  name: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  color?: RadioColor;
  size?: RadioSize;
  disabled?: boolean;
  onChange?: (value: string) => void;
  wrapperClass?: string;
}

export default function Radio({
  id,
  label,
  name,
  value = "",
  checked,
  defaultChecked,
  color,
  size = "md",
  disabled = false,
  onChange,
  wrapperClass = "",
}: RadioProps) {
  const wrapperCls = [
    "form-check",
    size === "sm" ? "form-check-sm" : size === "lg" ? "form-check-lg" : "",
    color ? `form-check-${color}` : "",
    wrapperClass,
  ]
    .filter(Boolean)
    .join(" ");

  const inputProps = checked !== undefined
    ? { checked }
    : { defaultChecked };

  return (
    <div className={wrapperCls}>
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={() => onChange?.(value)}
        {...inputProps}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}