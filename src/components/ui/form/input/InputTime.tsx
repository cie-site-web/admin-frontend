import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputTimeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  id: string;
  label?: string;
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputTime({ id, label, size = "md", wrapperClass = "", className = "", ...rest }: InputTimeProps) {
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} type="time"
        className={["form-control", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
    </div>
  );
}