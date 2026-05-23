import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type AvatarColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface AvatarBaseProps {
  size?: AvatarSize;
  className?: string;
}

interface AvatarImageProps extends AvatarBaseProps {
  type: "image";
  src: string;
  alt?: string;
}

interface AvatarTextProps extends AvatarBaseProps {
  type: "text";
  initials: string;
  bg?: AvatarColor;
  textColor?: string; // ex: "text-white", "text-dark"
}

type AvatarProps = AvatarImageProps | AvatarTextProps;

export default function Avatar(props: AvatarProps) {
  const { size = "md", className = "" } = props;

  if (props.type === "image") {
    return (
      <div className={`avatar-item ${className}`.trim()}>
        <img
          className={`img-fluid avatar-${size}`}
          src={props.src}
          alt={props.alt ?? "avatar image"}
        />
      </div>
    );
  }

  const { initials, bg = "primary", textColor = "text-white" } = props;

  return (
    <div
      className={`avatar-item avatar-${size} avatar-title ${textColor} bg-${bg} ${className}`.trim()}
    >
      {initials}
    </div>
  );
}