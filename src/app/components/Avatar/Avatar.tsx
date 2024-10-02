// components/Avatar.js
import React from "react";
import { AvatarProps } from "./Avatar.types";

const Avatar = ({
  username,
  backgroundColor,
  className,
  color,
  customStyle,
  size,
  rounded,
}: AvatarProps) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: rounded ? "50%" : 0,
    lineHeight: size && `${size + Math.floor(size / 20)}px`,
    backgroundColor,
    fontSize: size && `${Math.floor(size / 2.5)}px`,
    color,
    ...customStyle,
  };

  const initial = (username: string) => {
    const parts = username ? username.split(/[ -]/) : [];
    let initials = "";
    for (let i = 0; i < parts.length; i += 1) {
      initials += parts[i].charAt(0);
    }
    if (initials.length > 2 && initials.search(/[A-Z]/) !== -1) {
      initials = initials.replace(/[a-z]+/g, "");
    }
    initials = initials.substr(0, 2).toUpperCase();
    return initials;
  };

  const userInitial = initial(String(username));

  return (
    <div
      className={className || "avatar-container"}
      style={style}
      aria-hidden="true"
    >
      <span>{userInitial}</span>
    </div>
  );
};

export default Avatar;
