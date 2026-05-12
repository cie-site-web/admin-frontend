"use client";

import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  return (
    <header className="page-content-header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle text-muted">{subtitle}</p>}
          </div>
          <div className="col-auto">
            <div className="header-actions d-flex gap-2">
              {/* Add header actions here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
