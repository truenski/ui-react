import React from "react";
import copy from "copy-text-to-clipboard";
import styles from "./index.module.scss";
import EmojiOrIcon from "@/app/Conversation/ReplyBox/EmojiOrIcon";

interface ContactInfoRowProps {
  href?: string;
  icon: string;
  emoji: string;
  value?: string;
  showCopy?: boolean;
}

const ContactInfoRow: React.FC<ContactInfoRowProps> = ({
  href = "",
  icon,
  emoji,
  value = "",
  showCopy = false,
}) => {
  const onCopy = (e) => {
    e.preventDefault();
    copy(value);
    alert("Copy successful");
  };

  return (
    <div className={styles.contactInfoRow}>
      {href ? (
        <a href={href} className={styles.contactInfoDetails}>
          <EmojiOrIcon icon={icon} emoji={emoji} />
          <span className={styles.textTruncate} title={value}>
            {value || "Not available"}
          </span>
          {showCopy && (
            <button
              type="button"
              className={`icon ${styles.copyIcon}`}
              onClick={onCopy}
            >
              <i className="ion-clipboard" />
            </button>
          )}
        </a>
      ) : (
        <div className={styles.contactInfoDetails}>
          <EmojiOrIcon icon={icon} emoji={emoji} />
          <span className={styles.textTruncate}>
            {value || "Not available"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ContactInfoRow;
