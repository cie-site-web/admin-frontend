"use client";

import React from "react";
import Header from "@/components/sections/admin/Header";
import Footer from "@/components/sections/admin/Footer";
import Navbar from "@/components/sections/admin/Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
}: AdminLayoutProps) {
  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <Navbar />
      </aside>

      {/* Main Content */}
      <div className="app-main-content">
        {/* Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Page Content */}
        <main className="page-content">
          <div className="container-fluid">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
