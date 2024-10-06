import React from "react";

const BubbleText = ({ message, readableTime, isEmail }) => (
  <div className="message-text__wrap">
    <div
      className="text-content"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  </div>
);

export default BubbleText;
