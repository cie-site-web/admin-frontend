import React from "react";

interface DropdownItem {
  label: string;
  href?: string;
}

interface ActivityCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  footer: string;
  buyHref?: string;
  dropdownItems?: DropdownItem[];
  colClass?: string;
}

export default function ActivityCard({
  imageSrc,
  imageAlt = "",
  title,
  description,
  footer,
  buyHref = "#",
  dropdownItems = [
    { label: "Add to Wishlist" },
    { label: "Compare" },
  ],
  colClass = "col-md-6 col-xl-4",
}: ActivityCardProps) {
  return (
    <div className={colClass}>
      <div className="card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} className="card-img-top" alt={imageAlt} />

        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{title}</h5>
          <div className="dropdown">
            <button
              className="btn btn-light btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ri-more-2-fill"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {dropdownItems.map((item, i) => (
                <li key={i}>
                  <a className="dropdown-item" href={item.href ?? "#"}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-body">
          <p className="card-text">{description}</p>
          <a href={buyHref} className="btn btn-primary">
            Buy Now
          </a>
        </div>

        <div className="card-footer text-muted">{footer}</div>
      </div>
    </div>
  );
}
