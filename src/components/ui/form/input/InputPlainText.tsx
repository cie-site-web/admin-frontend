import React from "react";

type InputSize = "sm" | "md" | "lg";

interface InputPlainTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly" | "size"> {
  id: string;
  label?: string;
  size?: InputSize;
  wrapperClass?: string;
}

export default function InputPlainText({ id, label, size = "md", wrapperClass = "", className = "", ...rest }: InputPlainTextProps) {
  // form-control-plaintext n'a pas de variante -sm/-lg officielle Bootstrap,
  // mais on expose size pour cohérence et on ajoute la classe si fournie
  const sizeClass = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";
  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} type="text" readOnly
        className={["form-control-plaintext", sizeClass, className].filter(Boolean).join(" ")}
        {...rest} />
    </div>
  );
}