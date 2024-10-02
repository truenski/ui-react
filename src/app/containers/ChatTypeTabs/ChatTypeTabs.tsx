import React from "react";
import { ChatTypeTabsProps } from "./ChatTypeTabs.types";
import Tabs from "@/app/ui/Tabs";
import TabsItem from "@/app/ui/TabsItem";

const ChatTypeTabs = ({
  items,
  activeTab,
  onChatTabChange,
}: ChatTypeTabsProps) => {
  const activeTabIndex = items.findIndex((item) => item.key === activeTab);

  const handleTabChange = (selectedTabIndex: number) => {
    if (items[selectedTabIndex].key !== activeTab) {
      onChatTabChange(items[selectedTabIndex].key);
    }
  };

  return (
    <Tabs index={activeTabIndex} onChange={handleTabChange}>
      {items.map((item) => (
        <TabsItem
          key={item.key}
          name={item.name}
          count={item.count}
          showBadge={true}
        />
      ))}
    </Tabs>
  );
};

export default ChatTypeTabs;
