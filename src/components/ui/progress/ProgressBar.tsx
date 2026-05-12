import React from "react";

type ProgressColor =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

interface ProgressBarProps {
  value: number;              // 0-100
  min?: number;
  max?: number;
  color?: ProgressColor;
  striped?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  label?: string;             // surcharge le label (défaut: "{value}%")
  ariaLabel?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  min = 0,
  max = 100,
  color,
  striped = false,
  animated = false,
  showLabel = false,
  label,
  ariaLabel,
  className = "",
}: ProgressBarProps) {
  const percent = Math.min(Math.max(value, min), max);

  const barClass = [
    "progress-bar",
    striped ? "progress-bar-striped" : "",
    animated ? "progress-bar-animated" : "",
    color ? `bg-${color}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`progress ${className}`.trim()}
      role="progressbar"
      aria-label={ariaLabel ?? `${color ?? "default"} progress`}
      aria-valuenow={percent}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <div className={barClass} style={{ width: `${percent}%` }}>
        {showLabel && (label ?? `${percent}%`)}
      </div>
    </div>
  );
}