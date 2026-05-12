"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div>
            {currentYear} © Urbix.
          </div>
          <div className="text-sm-end d-none d-sm-block">
            Design &amp; Develop by Pixeleyez
          </div>
        </div>
      </div>
    </footer>
  );
}
