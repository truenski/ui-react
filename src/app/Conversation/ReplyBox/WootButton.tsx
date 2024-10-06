import React from "react";
import Spinner from "../Spinner";
import EmojiOrIcon from "./EmojiOrIcon";

interface WootButtonProps {
  variant?: string;
  size?: string;
  icon?: string;
  emoji?: string;
  colorScheme?: string;
  classNames?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isExpanded?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const WootButton: React.FC<WootButtonProps> = ({
  variant = "",
  size = "",
  icon = "",
  emoji = "",
  colorScheme = "primary",
  classNames = "",
  isDisabled = false,
  isLoading = false,
  isExpanded = false,
  onClick,
  children,
}) => {
  const variantClasses = variant.includes("link")
    ? `clear ${variant}`
    : variant;
  const hasOnlyIconClasses =
    !children && (emoji || icon) ? "button--only-icon" : "";
  const buttonClasses = [
    "button",
    variantClasses,
    hasOnlyIconClasses,
    size,
    colorScheme,
    classNames,
    isDisabled ? "disabled" : "",
    isExpanded ? "expanded" : "",
  ].join(" ");

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && !isLoading) {
      onClick(evt);
    }
  };

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <>
          {(icon || emoji) && <EmojiOrIcon emoji={emoji} icon={icon} />}
          {children && <span className="button__content">{children}</span>}
        </>
      )}
    </button>
  );
};

export default WootButton;
