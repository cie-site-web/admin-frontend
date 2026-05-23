/**
 * Types métier du header (notifications, panier, profil utilisateur).
 */

export type NotificationKind = "stock" | "like" | "birthday" | "share" | "file";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: React.ReactNode;
  date: string;
  /** Description supplémentaire dans un encart gris */
  detail?: string;
  /** Soit une URL d'avatar, soit une icône bootstrap */
  avatarUrl?: string;
  icon?: string;
  iconBg?: string;
  /** Fichier joint éventuel */
  attachment?: {
    name: string;
    size: string;
    icon: string;
  };
}

export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  href?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

import type React from "react";