import React from "react";

const EmojiOrIcon = ({ icon, emoji }) => (
  <span>{icon ? <i className={icon}></i> : emoji}</span>
);

export default EmojiOrIcon;
