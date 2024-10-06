import React, { useState } from "react";

// Mock data
const mockTranslations = {
  "CHAT_LIST.CHAT_STATUS_ITEMS": [
    { VALUE: "open", TEXT: "Open" },
    { VALUE: "resolved", TEXT: "Resolved" },
    { VALUE: "pending", TEXT: "Pending" },
  ],
};

const mockConstants = {
  STATUS_TYPE: {
    OPEN: "open",
  },
  ASSIGNEE_TYPE: {
    ME: "me",
  },
};

// StatusFilter component
const StatusFilter = ({ onStatusFilterChange }) => {
  const [activeStatus, setActiveStatus] = useState(
    mockConstants.STATUS_TYPE.OPEN
  );

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setActiveStatus(newStatus);
    onStatusFilterChange(newStatus);
  };

  return (
    <select
      className="status--filter"
      value={activeStatus}
      onChange={handleChange}
    >
      {mockTranslations["CHAT_LIST.CHAT_STATUS_ITEMS"].map((item) => (
        <option key={item.VALUE} value={item.VALUE}>
          {item.TEXT}
        </option>
      ))}
    </select>
  );
};

// ChatTypeTabs component
const ChatTypeTabs = ({ items, activeTab, onChatTabChange }) => {
  const activeTabIndex = items.findIndex((item) => item.key === activeTab);

  const handleTabChange = (selectedTabIndex) => {
    if (items[selectedTabIndex].key !== activeTab) {
      onChatTabChange(items[selectedTabIndex].key);
    }
  };

  return (
    <WootTabs index={activeTabIndex} onChange={handleTabChange}>
      {items.map((item) => (
        <WootTabsItem key={item.key} name={item.name} count={item.count} />
      ))}
    </WootTabs>
  );
};

// WootButton component
const WootButton = ({
  variant = "",
  size = "",
  icon = "",
  emoji = "",
  colorScheme = "primary",
  classNames = "",
  isDisabled = false,
  isLoading = false,
  isExpanded = false,
  children,
  onClick,
}) => {
  const getButtonClasses = () => {
    const classes = [
      variant.includes("link") ? `clear ${variant}` : variant,
      !children && (emoji || icon) ? "button--only-icon" : "",
      size,
      colorScheme,
      classNames,
      isDisabled ? "disabled" : "",
      isExpanded ? "expanded" : "",
    ];
    return classes.filter(Boolean).join(" ");
  };

  return (
    <button
      className={`button ${getButtonClasses()}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        (icon || emoji) && (
          <EmojiOrIcon emoji={emoji} icon={icon} className="icon" />
        )
      )}
      {children && <span className="button__content">{children}</span>}
    </button>
  );
};

// WootTabsItem component
const WootTabsItem = ({
  index,
  name,
  disabled = false,
  count = 0,
  showBadge = true,
}) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  React.useEffect(() => {
    // Animation logic for count changes would go here
    setAnimatedNumber(count);
  }, [count]);

  const handleClick = (event) => {
    event.preventDefault();
    if (!disabled) {
      // Assuming parent component passes down an onTabClick prop
      onTabClick(index);
    }
  };

  return (
    <li className={`tabs-title ${active ? "is-active" : ""}`}>
      <a onClick={handleClick}>
        {name}
        {showBadge && <span className="badge">{animatedNumber || count}</span>}
      </a>
    </li>
  );
};

// WootTabs component
const WootTabs = ({ index, children, onChange }) => {
  const tabs = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child) && child.type === WootTabsItem) {
      return React.cloneElement(child, { index: i, active: i === index });
    }
    return null;
  });

  return <ul className="tabs">{tabs}</ul>;
};

// Usage example
const App = () => {
  const [activeTab, setActiveTab] = useState(mockConstants.ASSIGNEE_TYPE.ME);
  const [activeStatus, setActiveStatus] = useState(
    mockConstants.STATUS_TYPE.OPEN
  );

  const handleStatusFilterChange = (newStatus) => {
    setActiveStatus(newStatus);
    // Additional logic here if needed
  };

  const handleChatTabChange = (newTab) => {
    setActiveTab(newTab);
    // Additional logic here if needed
  };

  const tabItems = [
    { key: "me", name: "My Chats", count: 5 },
    { key: "unassigned", name: "Unassigned", count: 3 },
    { key: "all", name: "All", count: 10 },
  ];

  return (
    <div>
      <StatusFilter onStatusFilterChange={handleStatusFilterChange} />
      <ChatTypeTabs
        items={tabItems}
        activeTab={activeTab}
        onChatTabChange={handleChatTabChange}
      />
      <WootButton
        variant="primary"
        size="medium"
        icon="chat"
        onClick={() => console.log("Button clicked")}
      >
        Start Chat
      </WootButton>
    </div>
  );
};

export default App;
