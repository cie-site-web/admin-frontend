import React from "react";

type InputSize = "sm" | "md" | "lg";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  size?: InputSize;
  wrapperClass?: string;
}

export default function Textarea({ id, label, size = "md", wrapperClass = "", className = "", rows = 3, ...rest }: TextareaProps) {
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <textarea id={id} rows={rows}
        className={["form-control", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
    </div>
  );
}