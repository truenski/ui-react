import React from "react";
import "./WootSidemenuIcon.scss";
const WootSidemenuIcon = () => {
  const onMenuItemClick = () => {
    console.log("Sidemenu icon clicked");
  };

  return (
    <i className="ion-android-menu hamburger--menu" onClick={onMenuItemClick} />
  );
};

export default WootSidemenuIcon;
