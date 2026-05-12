"use client";

import React, { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboards",
        icon: "ri-dashboard-line",
        children: [
          { label: "E-Commerce", href: "/dashboard/ecommerce" },
          { label: "School", href: "/dashboard/school" },
          { label: "Sales Analytics", href: "/dashboard/analytics" },
          { label: "Social Media", href: "/dashboard/media" },
        ],
      },
      {
        label: "Applications",
        icon: "ri-apps-2-line",
        children: [
          { label: "Calendar", href: "/apps/calendar" },
          { label: "Chat", href: "/apps/chat" },
          { label: "Email", href: "/apps/email" },
          { label: "Kanban", href: "/apps/kanban" },
          {
            label: "E-Commerce",
            children: [
              { label: "Products", href: "/apps/ecommerce/products" },
              { label: "Product List", href: "/apps/ecommerce/products-list" },
              { label: "Product Details", href: "/apps/ecommerce/products-details" },
              { label: "Create Product", href: "/apps/ecommerce/create-product" },
              { label: "Customer", href: "/apps/ecommerce/customer" },
              { label: "Customer Details", href: "/apps/ecommerce/customer-details" },
              { label: "Orders", href: "/apps/ecommerce/orders" },
              { label: "Order Details", href: "/apps/ecommerce/order-details" },
              { label: "Cart", href: "/apps/ecommerce/cart" },
              { label: "Checkout", href: "/apps/ecommerce/checkout" },
              { label: "Wishlist", href: "/apps/ecommerce/wishlist" },
            ],
          },
          {
            label: "School",
            children: [
              {
                label: "Student",
                children: [
                  { label: "All Students", href: "/apps/school/students" },
                  { label: "Admission Form", href: "/apps/school/admission-form" },
                ],
              },
              {
                label: "Teacher",
                children: [
                  { label: "All Teacher", href: "/apps/teacher" },
                  { label: "Schedule", href: "/apps/teacher/schedule" },
                ],
              },
              { label: "Parents", href: "/apps/school/parents" },
              { label: "Course", href: "/apps/school/courses" },
              { label: "Exam", href: "/apps/school/exam" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        label: "Authentication",
        icon: "ri-user-line",
        children: [
          { label: "Sign in", href: "/auth/signin" },
          { label: "Register", href: "/auth/signup" },
          { label: "Forgot Password", href: "/auth/forgot-password" },
          { label: "Two Step Verification", href: "/auth/two-step-verify" },
          { label: "Reset Password", href: "/auth/reset-password" },
          { label: "Email Verification", href: "/auth/email-verify" },
          { label: "Log out", href: "/auth/logout" },
        ],
      },
      {
        label: "Pages",
        icon: "ri-pages-line",
        children: [
          { label: "Starter Page", href: "/pages/starter" },
          { label: "Profile", href: "/pages/profile" },
          {
            label: "Blogs",
            children: [
              { label: "Blog List", href: "/pages/blogs/list" },
              { label: "Blog Details", href: "/pages/blogs/details" },
              { label: "Create Blog", href: "/pages/blogs/create" },
            ],
          },
          { label: "Pricing", href: "/pages/pricing" },
          { label: "Privacy Policy", href: "/pages/privacy-policy" },
          { label: "Terms & Conditions", href: "/pages/terms-conditions" },
          { label: "Timeline", href: "/pages/timeline" },
          { label: "FAQs", href: "/pages/faqs" },
          { label: "Billing & Subscription", href: "/pages/billing-subscription" },
          { label: "Not Authorized", href: "/pages/not-authorized" },
          { label: "Coming Soon", href: "/pages/coming-soon" },
          { label: "Maintenance", href: "/pages/maintenance" },
          { label: "Error", href: "/pages/error" },
        ],
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        label: "Base UI",
        icon: "ri-pencil-ruler-2-line",
        children: [
          { label: "Accordions", href: "/ui/accordions" },
          { label: "Alert", href: "/ui/alerts" },
          { label: "Avatar", href: "/ui/avatars" },
          { label: "Badge", href: "/ui/badges" },
          { label: "Breadcrumb", href: "/ui/breadcrumbs" },
          { label: "Buttons", href: "/ui/buttons" },
          { label: "Button Group", href: "/ui/button-group" },
          { label: "Cards", href: "/ui/cards" },
          { label: "Cookie", href: "/ui/cookie" },
          { label: "Carousel", href: "/ui/carousel" },
          { label: "Dropdown", href: "/ui/dropdowns" },
          { label: "Images & Figures", href: "/ui/images-figures" },
          { label: "Links", href: "/ui/links" },
          { label: "List Group", href: "/ui/list" },
          { label: "Nav & Tabs", href: "/ui/tabs" },
          { label: "Pagination", href: "/ui/pagination" },
          { label: "Popovers", href: "/ui/popover" },
          { label: "Progress", href: "/ui/progress" },
          { label: "Spinners", href: "/ui/spinner" },
          { label: "Separator", href: "/ui/separator" },
          { label: "Modal", href: "/ui/modal" },
          { label: "Off Canvas", href: "/ui/offcanvas" },
          { label: "Placeholders", href: "/ui/placeholders" },
          { label: "Toasts", href: "/ui/toast" },
          { label: "Tooltips", href: "/ui/tooltips" },
          { label: "Typography", href: "/ui/typography" },
          { label: "Utilities", href: "/ui/utilities" },
        ],
      },
      {
        label: "More",
        icon: "ri-color-filter-ai-line",
        children: [
          {
            label: "Advanced UI",
            children: [
              { label: "Block", href: "/ui/advanced/block" },
              { label: "Count Up", href: "/ui/advanced/countup" },
              { label: "Draggable Cards", href: "/ui/advanced/draggable-cards" },
              { label: "Media Player", href: "/ui/advanced/media-player" },
              { label: "Rating", href: "/ui/advanced/rating" },
              { label: "Ribbons", href: "/ui/advanced/ribbons" },
              { label: "Scroll Spy", href: "/ui/advanced/scrollspy" },
              { label: "Sortable JS", href: "/ui/advanced/sortable-js" },
              { label: "Sweet Alert", href: "/ui/advanced/sweetalert2" },
              { label: "Swiper JS", href: "/ui/advanced/swiper-js" },
              { label: "Tour", href: "/ui/advanced/tour" },
              { label: "Tree View", href: "/ui/advanced/treeview" },
            ],
          },
          {
            label: "Forms",
            children: [
              { label: "Input", href: "/forms/elements" },
              { label: "Checkbox & Radios", href: "/forms/checkboxs-radios" },
              { label: "Input Group", href: "/forms/input-group" },
              { label: "Form Select", href: "/forms/select" },
              { label: "Range Slider", href: "/forms/range" },
              { label: "Input Spin", href: "/forms/input-spin" },
              { label: "Input Masks", href: "/forms/input-masks" },
              { label: "File Uploads", href: "/forms/file-uploads" },
              { label: "Date,Time Picker", href: "/forms/date-time-picker" },
              { label: "Floating Label", href: "/forms/floating-labels" },
              { label: "Form Layout", href: "/forms/layout" },
              { label: "Editor", href: "/forms/editor" },
              { label: "Form Validation", href: "/forms/validation" },
              { label: "Form Wizards", href: "/forms/wizards" },
              { label: "Form Advanced", href: "/forms/advanced" },
            ],
          },
          {
            label: "Tables",
            children: [
              { label: "Basic Tables", href: "/tables/basic" },
              { label: "List JS Table", href: "/tables/listjs" },
              { label: "Grid JS Table", href: "/tables/gridjs" },
              { label: "Datatables", href: "/tables/datatables" },
            ],
          },
          {
            label: "Charts",
            children: [
              { label: "Apex Charts", href: "/charts/apex" },
              { label: "Chartjs Charts", href: "/charts/chartjs" },
              { label: "Echart Charts", href: "/charts/echart" },
            ],
          },
          {
            label: "Icons",
            children: [
              { label: "Remix Icons", href: "/icons/remix" },
              { label: "Bootstrap Icons", href: "/icons/bootstrap" },
            ],
          },
          {
            label: "Maps",
            children: [
              { label: "Google Maps", href: "/maps/google" },
              { label: "Leaflet Maps", href: "/maps/leaflet" },
              { label: "Vector Maps", href: "/maps/vector" },
            ],
          },
          {
            label: "Menu levels",
            children: [
              { label: "Level 1.1", href: "/level-1-1" },
              {
                label: "Level 1.2",
                children: [
                  { label: "Level 2.1", href: "/level-2-1" },
                  { label: "Level 2.2", href: "/level-2-2" },
                  {
                    label: "Level 2.3",
                    children: [
                      { label: "Level 3.1", href: "/level-3-1" },
                      { label: "Level 3.2", href: "/level-3-2" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

interface NavMenuItemProps {
  item: NavItem;
  level?: number;
}

function NavMenuItem({ item, level = 0 }: NavMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className={`pe-slide ${hasChildren ? "pe-has-sub" : ""}`}>
      {item.href && !hasChildren ? (
        <a href={item.href} className="pe-nav-link">
          {item.icon && <i className={`${item.icon} pe-nav-icon`}></i>}
          <span className="pe-nav-content">{item.label}</span>
        </a>
      ) : (
        <a
          href={item.href || "#"}
          className="pe-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
          data-bs-toggle={hasChildren ? "collapse" : undefined}
          aria-expanded={isOpen}
        >
          {item.icon && <i className={`${item.icon} pe-nav-icon`}></i>}
          <span className="pe-nav-content">{item.label}</span>
          {hasChildren && <i className="ri-arrow-down-s-line pe-nav-arrow"></i>}
        </a>
      )}
      {hasChildren && (
        <ul className={`pe-slide-menu collapse ${isOpen ? "show" : ""}`}>
          {item.children!.map((child, index) => (
            <NavMenuItem key={index} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="pe-app-sidebar-menu nav nav-pills">
      <ul className="pe-horizontal-menu mb-0 list-unstyled" id="horizontal-menu">
        {navSections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            <li className="pe-menu-title">{section.title}</li>
            {section.items.map((item, itemIndex) => (
              <NavMenuItem key={itemIndex} item={item} />
            ))}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
