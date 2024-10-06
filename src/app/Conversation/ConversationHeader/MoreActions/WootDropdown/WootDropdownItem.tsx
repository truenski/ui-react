import React from "react";

interface DropdownItemProps {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <li
      className={`dropdown-menu__item ${className} ${
        disabled ? "is-disabled" : ""
      }`}
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
