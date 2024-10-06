import React from "react";
import EmojiOrIcon from "../../ReplyBox/EmojiOrIcon";
import "./index.module.scss";

interface ContactDetailsItemProps {
  title: string;
  icon?: string;
  emoji?: string;
  value?: string | number;
  children?: React.ReactNode;
  buttonSlot?: React.ReactNode;
}

const ContactDetailsItem: React.FC<ContactDetailsItemProps> = ({
  title,
  icon = "",
  emoji = "",
  value = "",
  children,
  buttonSlot,
}) => {
  return (
    <div className="conv-details--item">
      <h4 className="conv-details--item__label text-block-title">
        <span className="title--icon">
          <EmojiOrIcon icon={icon} emoji={emoji} />
          <span>{title}</span>
        </span>
        {buttonSlot}
      </h4>
      {value && (
        <div className="conv-details--item__value">{children || value}</div>
      )}
    </div>
  );
};

export default ContactDetailsItem;
