import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputColorProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  id: string;
  label?: string;
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputColor({ id, label, size = "md", wrapperClass = "", className = "", ...rest }: InputColorProps) {
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} type="color" title="Choose your color"
        className={["form-control form-control-color w-100", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
    </div>
  );
}