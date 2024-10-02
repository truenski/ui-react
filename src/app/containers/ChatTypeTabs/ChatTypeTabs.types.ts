export interface ChatTypeTabsProps {
  items: { key: string; name: string; count: number }[];
  activeTab: string;
  onChatTabChange: (tab: string) => void;
}
