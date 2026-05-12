import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputIconProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  label?: string;
  icon: string;
  iconPosition?: "left" | "right";
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputIcon({
  id, label, icon, iconPosition = "left", size = "md",
  wrapperClass = "", className = "", type = "email", ...rest
}: InputIconProps) {
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <div className={`form-icon${iconPosition === "right" ? " right" : ""}`}>
        <input id={id} type={type}
          className={["form-control form-control-icon", sizeClass, className].filter(Boolean).join(" ")}
          {...rest} />
        <i className={icon} aria-hidden="true" />
      </div>
    </div>
  );
}