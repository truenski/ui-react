import React from "react";

const MentionBox = ({ items, onMentionSelect }) => {
  return (
    <div className="mention-box">
      {items.map((item) => (
        <div
          key={item.key}
          className="mention-item"
          onClick={() => onMentionSelect(item)}
        >
          <div className="mention-label">{item.label}</div>
          <div className="mention-description">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MentionBox;
