import React from "react";

type SocialNetwork = "facebook" | "google" | "twitter" | "instagram" | "youtube" | "linkedin";
type SocialStyle = "solid" | "light" | "outline";

const SOCIAL_ICONS: Record<SocialNetwork, string> = {
  facebook:  "ri-facebook-fill",
  google:    "ri-google-fill",
  twitter:   "ri-twitter-fill",
  instagram: "ri-instagram-fill",
  youtube:   "ri-youtube-fill",
  linkedin:  "ri-linkedin-box-fill",
};

function buildBtnClass(network: SocialNetwork, style: SocialStyle): string {
  if (style === "solid")   return `btn-${network}`;
  if (style === "light")   return `btn-light-${network}`;
  if (style === "outline") return `btn-outline-${network}`;
  return `btn-${network}`;
}

interface SocialButtonProps {
  network: SocialNetwork;
  style?: SocialStyle;
  icon?: string;        // surcharge l'icône par défaut
  label?: string;       // texte optionnel à côté de l'icône
  iconOnly?: boolean;   // force la classe icon-btn (défaut: true si pas de label)
  onClick?: () => void;
  className?: string;
}

export default function SocialButton({
  network,
  style = "solid",
  icon,
  label,
  iconOnly,
  onClick,
  className = "",
}: SocialButtonProps) {
  const showIconOnly = iconOnly ?? !label;
  const iconClass = icon ?? SOCIAL_ICONS[network];

  return (
    <button
      type="button"
      className={[
        "btn",
        buildBtnClass(network, style),
        showIconOnly ? "icon-btn" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      aria-label={label ?? network}
    >
      <i className={iconClass} aria-hidden="true" />
      {label && <span className="ms-2">{label}</span>}
    </button>
  );
}