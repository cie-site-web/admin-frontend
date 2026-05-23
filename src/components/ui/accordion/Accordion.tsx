"use client";

import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string; // ex: "ri-code-line"
}

interface AccordionProps {
  id: string;
  items: AccordionItem[];
  defaultOpenId?: string;
  flush?: boolean;
  iconVariant?: boolean;
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
  iconVariant,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  iconVariant: boolean;
}) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${item.id}`}>
        <button
          className={`accordion-button${isOpen ? "" : " collapsed"}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={item.id}
        >
          {iconVariant && item.icon && (
            <i className={`${item.icon} me-2`} aria-hidden="true" />
          )}
          {item.title}
        </button>
      </h2>
      <div
        id={item.id}
        className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
        role="region"
        aria-labelledby={`heading-${item.id}`}
      >
        <div className="accordion-body">{item.content}</div>
      </div>
    </div>
  );
}

export default function Accordion({
  id,
  items,
  defaultOpenId,
  flush = false,
  iconVariant = false,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? null
  );

  const handleToggle = (itemId: string) => {
    setOpenId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <div
      className={[
        "accordion",
        flush ? "accordion-flush" : "",
        iconVariant ? "accordion-icon" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={id}
    >
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
          iconVariant={iconVariant}
        />
      ))}
    </div>
  );
}