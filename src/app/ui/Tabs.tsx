import React from "react";

const Tabs = ({ index, onChange, children }) => {
  const handleTabClick = (selectedIndex) => {
    if (onChange) {
      onChange(selectedIndex);
    }
  };

  return (
    <ul className="tabs">
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          index: idx,
          isActive: idx === index,
          onClick: () => handleTabClick(idx),
        })
      )}
    </ul>
  );
};

export default Tabs;
