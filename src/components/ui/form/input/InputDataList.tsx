import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputDatalistProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "list" | "size"> {
  id: string;
  label?: string;
  options: string[];
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputDatalist({ id, label, options, size = "md", wrapperClass = "", className = "", ...rest }: InputDatalistProps) {
  const listId = `${id}-datalist`;
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} list={listId}
        className={["form-control", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
      <datalist id={listId}>
        {options.map((opt) => <option key={opt} value={opt} />)}
      </datalist>
    </div>
  );
}