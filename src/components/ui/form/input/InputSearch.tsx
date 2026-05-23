import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  id: string;
  label?: string;
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputSearch({ id, label, size = "md", wrapperClass = "", className = "", ...rest }: InputSearchProps) {
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} type="search"
        className={["form-control", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
    </div>
  );
}