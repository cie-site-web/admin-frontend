"use client";

import React, { useState } from "react";

interface RadioItem {
  id: string;
  label: string;
}

interface ListGroupRadioProps {
  name: string;
  items: RadioItem[];
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export default function ListGroupRadio({
  name,
  items,
  defaultValue,
  onChange,
  className = "",
}: ListGroupRadioProps) {
  const [selected, setSelected] = useState<string | null>(
    defaultValue ?? null
  );

  const handleChange = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  return (
    <ul className={`list-group ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.id} className="list-group-item">
          <input
            className="form-check-input me-1"
            type="radio"
            name={name}
            id={item.id}
            checked={selected === item.id}
            onChange={() => handleChange(item.id)}
          />
          <label className="form-check-label" htmlFor={item.id}>
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}