"use client";

import React, { useState } from "react";

interface CheckboxItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}

interface ListGroupCheckboxProps {
  items: CheckboxItem[];
  onChange?: (id: string, checked: boolean) => void;
  className?: string;
}

export default function ListGroupCheckbox({
  items,
  onChange,
  className = "",
}: ListGroupCheckboxProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, item.defaultChecked ?? false]))
  );

  const handleChange = (id: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [id]: value }));
    onChange?.(id, value);
  };

  return (
    <ul className={`list-group ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.id} className="list-group-item">
          <input
            className="form-check-input me-1"
            type="checkbox"
            id={item.id}
            checked={checked[item.id]}
            onChange={(e) => handleChange(item.id, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={item.id}>
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}