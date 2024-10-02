import React from "react";

const SideMenuIcon = () => {
  const onMenuItemClick = () => {
    const event = new CustomEvent("sidemenu_icon_click");
    window.dispatchEvent(event);
  };

  return (
    <i className="ion-android-menu hamburger--menu" onClick={onMenuItemClick} />
  );
};

export default SideMenuIcon;
