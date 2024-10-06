import React from "react";

interface DropdownMenuProps {
  placement?: string;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  placement = "top",
  children,
}) => {
  return (
    <ul className={`dropdown menu vertical dropdown--${placement}`}>
      {children}
    </ul>
  );
};

export default DropdownMenu;
