// components/Thumbnail.js
import React, { useState, useEffect } from "react";
import Avatar from "@/app/components/Avatar/Avatar";
import { ThumbnailProps } from "./Thumbnail.types";
import Image from "next/image";

const Thumbnail = ({
  src,
  size,
  badge,
  username,
  status,
  hasBorder,
}: ThumbnailProps) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const onImgError = () => {
    setImgError(true);
  };

  const avatarSize = Number(size.replace(/\D+/g, ""));
  const badgeStyle = {
    width: `${avatarSize / 3}px`,
    height: `${avatarSize / 3}px`,
  };
  const statusStyle = {
    width: `${avatarSize / 4}px`,
    height: `${avatarSize / 4}px`,
  };
  const thumbnailClass = `user-thumbnail ${hasBorder ? "border" : ""}`;

  return (
    <div className="user-thumbnail-box" style={{ height: size, width: size }}>
      {!imgError && Boolean(src) ? (
        <Image
          alt="image"
          id="image"
          src={src}
          className={thumbnailClass}
          onError={onImgError}
        />
      ) : (
        <Avatar username={username} color="white" size={avatarSize} />
      )}
      {badge === "Channel::FacebookPage" && (
        <Image
          alt="image"
          id="badge"
          className="source-badge"
          style={badgeStyle}
          src="/images/fb-badge.png"
        />
      )}
      {badge === "Channel::TwitterProfile" && (
        <Image
          alt="image"
          id="badge"
          className="source-badge"
          style={badgeStyle}
          src="/images/twitter-badge.png"
        />
      )}
      {badge === "Channel::TwilioSms" && (
        <Image
          alt="image"
          id="badge"
          className="source-badge"
          style={badgeStyle}
          src="/images/channels/whatsapp.png"
        />
      )}
      {(status === "online" || status === "busy") && (
        <div
          className={`source-badge user-online-status user-online-status--${status}`}
          style={statusStyle}
        />
      )}
    </div>
  );
};

export default Thumbnail;
