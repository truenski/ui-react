import React, { useState } from "react";
import emojis from "../constants/emojis.json";
import "../style/EmojiInput.scss"; // Assuming the SCSS is in the same directory

const EmojiInput = ({ onClick }) => {
  const [selectedKey, setSelectedKey] = useState("Smileys & Emotion");

  const changeCategory = (category) => {
    setSelectedKey(category);
  };

  return (
    <div role="dialog" className="emoji-dialog">
      <header className="emoji-dialog--header" role="menu">
        <ul>
          {Object.keys(emojis).map((category) => (
            <li
              key={category}
              className={selectedKey === category ? "active" : ""}
              onClick={() => changeCategory(category)}
            >
              <button
                className="emoji--item"
                onClick={() => changeCategory(category)}
                dangerouslySetInnerHTML={{ __html: emojis[category][0] }}
              />
            </li>
          ))}
        </ul>
      </header>
      <div className="emoji--row">
        <h5 className="emoji-category--title">{selectedKey}</h5>
        {emojis[selectedKey].map((emoji) => (
          <button
            key={emoji}
            className="emoji--item"
            onClick={() => onClick(emoji)}
            dangerouslySetInnerHTML={{ __html: emoji }}
          />
        ))}
      </div>
    </div>
  );
};

export default EmojiInput;
