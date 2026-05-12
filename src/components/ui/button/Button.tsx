import React from "react";

type BtnVariant =
  | "primary" | "secondary" | "success" | "danger"
  | "warning" | "info" | "light" | "dark" | "link";

type BtnStyle = "solid" | "light" | "outline" | "shadow" | "text";
type BtnSize  = "sm" | "md" | "lg";

function buildVariantClass(variant: BtnVariant, style: BtnStyle): string {
  if (style === "solid")   return `btn-${variant}`;
  if (style === "light")   return `btn-light-${variant}`;
  if (style === "outline") return `btn-outline-${variant}`;
  if (style === "shadow")  return `btn-shadow-${variant}`;
  if (style === "text")    return `btn-text-${variant}`;
  return `btn-${variant}`;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  btnStyle?: BtnStyle;
  size?: BtnSize;
  pill?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  btnStyle = "solid",
  size = "md",
  pill = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    pill ? "rounded-pill" : "",
    buildVariantClass(variant, btnStyle),
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}