import React from "react";

type CircularColor =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark";

type CircularSize = "sm" | "md" | "default" | "xl" | "xxl";

const SIZE_VIEWBOX: Record<CircularSize, string> = {
  sm:      "0 0 56 56",
  md:      "0 0 76 76",
  default: "0 0 90 90",
  xl:      "0 0 110 110",
  xxl:     "0 0 130 130",
};

const SIZE_CLASS: Record<CircularSize, string> = {
  sm:      "circular-sm",
  md:      "circular-md",
  default: "",
  xl:      "circular-xl",
  xxl:     "circular-xxl",
};

interface CircularProgressProps {
  value?: number;             // 0-100 ; absent = indéterminé (pas de --progress)
  color?: CircularColor;
  size?: CircularSize;
  showLabel?: boolean;        // défaut true si value est défini
  label?: string;             // surcharge le label "{value}%"
  className?: string;
}

export default function CircularProgress({
  value,
  color,
  size = "default",
  showLabel,
  label,
  className = "",
}: CircularProgressProps) {
  const hasValue  = value !== undefined;
  const showText  = showLabel ?? hasValue;
  const viewBox   = SIZE_VIEWBOX[size];
  const sizeClass = SIZE_CLASS[size];

  const wrapperClass = [
    "circular-progress",
    sizeClass,
    color ? `circular-progress-${color}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = hasValue
    ? ({ "--progress": value } as React.CSSProperties)
    : undefined;

  return (
    <div className={wrapperClass} style={style}>
      <svg className="circular-inner" viewBox={viewBox}>
        <circle className="bg-circular-progress" />
        <circle className="fg-circular-progress" />
      </svg>
      {showText && (
        <div className="circular-text">
          {label ?? `${value}%`}
        </div>
      )}
    </div>
  );
}