/**
 * Source unique du menu de navigation.
 * Consommée à la fois par Sidebar (vertical) et HorizontalNav (horizontal).
 *
 * Pour ajouter une entrée : pousser dans le bon NavSection ou créer une nouvelle section.
 */

export interface NavItem {
    label: string;
    href?: string;
    /** Classe d'icône (ex: "ri-dashboard-line"). Seulement aux items de niveau 1. */
    icon?: string;
    /** ID du collapse Bootstrap, si l'item a un sous-menu */
    collapseId?: string;
    children?: NavItem[];
  }
  
  export interface NavSection {
    /** Titre de section affiché en gris au-dessus du groupe */
    title: string;
    items: NavItem[];
  }
  
  export const MENU: NavSection[] = [
    {
      title: "Main",
      items: [
        {
          label: "Dashboards",
          icon: "ri-dashboard-line",
          collapseId: "collapseDashboards",
          children: [
            { label: "E-Commerce", href: "/admin/dashboard" },
            { label: "School", href: "/admin/dashboard/school" },
            { label: "Sales Analytics", href: "/admin/dashboard/analytics" },
            { label: "Social Media", href: "/admin/dashboard/media" },
          ],
        },
        {
          label: "Applications",
          icon: "ri-apps-2-line",
          collapseId: "collapseApplications",
          children: [
            { label: "Calendar", href: "/apps/calendar" },
            { label: "Chat", href: "/apps/chat" },
            { label: "Email", href: "/apps/email" },
            { label: "Kanban", href: "/apps/kanban" },
            {
              label: "E-Commerce",
              collapseId: "collapseEcommerce",
              children: [
                { label: "Products", href: "/apps/ecommerce/products" },
                { label: "Product List", href: "/apps/ecommerce/products-list" },
                { label: "Product Details", href: "/apps/ecommerce/products-details" },
                { label: "Create Product", href: "/apps/ecommerce/create-product" },
                { label: "Customer", href: "/apps/ecommerce/customer" },
                { label: "Orders", href: "/apps/ecommerce/orders" },
                { label: "Cart", href: "/apps/ecommerce/cart" },
                { label: "Checkout", href: "/apps/ecommerce/checkout" },
                { label: "Wishlist", href: "/apps/ecommerce/wishlist" },
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
          collapseId: "collapseAuth",
          children: [
            { label: "Sign in", href: "/login" },
            { label: "Register", href: "/register" },
            { label: "Forgot Password", href: "/forgot-password" },
            { label: "Reset Password", href: "/reset-password" },
            { label: "Log out", href: "/logout" },
          ],
        },
        {
          label: "Pages",
          icon: "ri-pages-line",
          collapseId: "collapsePages",
          children: [
            { label: "Starter Page", href: "/pages/starter" },
            { label: "Profile", href: "/pages/profile" },
            { label: "Pricing", href: "/pages/pricing" },
            { label: "FAQs", href: "/pages/faqs" },
            { label: "Maintenance", href: "/pages/maintenance" },
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
          collapseId: "collapseBaseUI",
          children: [
            { label: "Buttons", href: "/ui/buttons" },
            { label: "Cards", href: "/ui/cards" },
            { label: "Modal", href: "/ui/modal" },
            { label: "Tabs", href: "/ui/tabs" },
          ],
        },
        {
          label: "Forms",
          icon: "ri-list-check-2",
          collapseId: "collapseForms",
          children: [
            { label: "Input", href: "/forms/elements" },
            { label: "Validation", href: "/forms/validation" },
          ],
        },
      ],
    },
  ];