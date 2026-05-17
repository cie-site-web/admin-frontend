/**
 * Données mock pour le dashboard. À remplacer par des appels API
 * (Server Component fetch ou Client Component avec SWR/React Query).
 *
 * Fichier .ts (pas .tsx) : aucune logique de rendu ici, uniquement des données.
 */

import type {
    Order,
    ProductCategory,
    CountryGrowth,
    CountryBubble,
    StatItem,
  } from "@/types/dashboard";
  
  export const STATS: StatItem[] = [
    {
      icon: "bi bi-folder2-open",
      value: "$2,647",
      label: "Today's Sales",
      caption: "Sales Increment Rate",
      trend: "up",
    },
    {
      icon: "bi bi-bookmark",
      value: "$24,057",
      label: "Total Purchase",
      captionHighlight: "+8%",
      caption: "Completion Rate",
      highlightColor: "success",
      trend: "up",
    },
    {
      icon: "bi bi-bookmark",
      value: "47%",
      label: "Overall Performance",
      captionHighlight: "+12%",
      caption: "Completion Rate",
      highlightColor: "success",
      trend: "up",
    },
  ];
  
  export const ORDERS: Order[] = [
    {
      id: "#0051134",
      email: "ela@septi.gmail.com",
      product: "MacBook Air",
      status: "On Way",
      tracking: "PQ1132G",
      avatarUrl: "/assets/images/avatar/avatar-1.jpg",
    },
    {
      id: "#0021598",
      email: "te@shroff.gmail.com",
      product: "Magical Pen",
      status: "Waiting",
      tracking: "CF0568B",
      avatarUrl: "/assets/images/avatar/avatar-2.jpg",
      checked: true,
    },
    {
      id: "#0045976",
      email: "te@shroff.gmail.com",
      product: "Secret Diary",
      status: "Pending",
      tracking: "RY4578K",
      avatarUrl: "/assets/images/avatar/avatar-3.jpg",
    },
    {
      id: "#0074564",
      email: "te@shroff.gmail.com",
      product: "IdeaPad Azure",
      status: "Delivered",
      tracking: "ST9856H",
      avatarUrl: "/assets/images/avatar/avatar-4.jpg",
    },
    {
      id: "#0098546",
      email: "te@shroff.gmail.com",
      product: "Laxmi Electric Stove",
      status: "Delivered",
      tracking: "KI1256G",
      avatarUrl: "/assets/images/avatar/avatar-5.jpg",
    },
  ];
  
  export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
      name: "Electronic",
      icon: "ri-ram-line",
      count: 2482,
      change: "+5.34%",
      variant: "primary",
    },
    {
      name: "Games",
      icon: "bi bi-controller",
      count: 1828,
      change: "+5.34%",
      variant: "warning",
    },
    {
      name: "Furniture",
      icon: "bi bi-lamp",
      count: 1463,
      change: "+5.34%",
      variant: "danger",
    },
  ];
  
  export const COUNTRY_BUBBLES: CountryBubble[] = [
    { value: "2,489", index: 1 },
    { value: "1,756", index: 2 },
    { value: "285", index: 3 },
    { value: "812", index: 4 },
  ];
  
  export const COUNTRIES: CountryGrowth[] = [
    { name: "United States", flagUrl: "/assets/images/flag/us.svg", percent: 90 },
    { name: "Andorra", flagUrl: "/assets/images/flag/de.svg", percent: 70 },
    { name: "French", flagUrl: "/assets/images/flag/ru.svg", percent: 70 },
    { name: "Chinese", flagUrl: "/assets/images/flag/cn.svg", percent: 25 },
  ];