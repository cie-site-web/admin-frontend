export { default as Header } from "./Header";
export { default as NotificationsDropdown } from "./NotificationsDropdown";
export { default as CartDropdown } from "./CartDropdown";
export { default as ProfileMenu } from "./ProfileMenu";
export { default as SearchModal } from "./SearchModal";
export { default as DarkModeToggle } from "./DarkModeToggle";

export { CURRENT_USER, NOTIFICATIONS, CART_ITEMS } from "./mockData";
export type {
  NotificationItem,
  NotificationKind,
  CartItem,
  UserProfile,
} from "./types";