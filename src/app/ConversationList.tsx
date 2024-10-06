// import '../dashboard/assets/scss/super_admin/index.scss';
"use client";
import React, { ChangeEvent } from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  mockContacts,
  mockInboxes,
  mockTranslations,
  mockConstants,
  mockConversations,
  Conversation,
} from "./Conversation/mockData";
import WootButton from "./Conversation/ReplyBox/WootButton";

const getInboxClassByType = (type: string): string => {
  // Mock implementation
  return "inbox-icon-web";
};

const getPlainText = (text: string): string => {
  // Mock implementation for parsing HTML content
  return text;
};

interface ThumbnailProps {
  src: string;
  badge?: string;
  username: string;
  status?: string;
  size: string;
}

// Thumbnail component
const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  badge,
  username,
  status,
  size,
}) => (
  <div className="user-thumbnail-box " style={{ width: size, height: size }}>
    <Image
      src={src}
      alt={username}
      className="user-thumbnail rounded-md" // Tailwind class for border radius
      width={40}
      height={40}
    />
    {/* {badge && <span className={`badge badge-${badge}`}>{badge}</span>} */}
    {status && <span className={`status--${status}`} />}
  </div>
);

interface ConversationCardProps {
  chat: Conversation;
  activeLabel: string;
  teamId: number;
  onSelect: (chat: Conversation) => void;
}

// ConversationCard component
const ConversationCard: React.FC<ConversationCardProps> = ({
  chat,
  activeLabel,
  teamId,
  onSelect,
}) => {
  const contact = mockContacts[chat.meta.sender.id];
  const inbox = mockInboxes[chat.inbox_id];

  // Get the last message from the contact
  const lastMessage = contact.lastMessage;

  const isActiveChat = false; // Mock implementation: check if this is the active chat
  const unreadCount = chat.unread_count;
  const hasUnread = unreadCount > 0;
  const showInboxName = inbox;
  const inboxName = inbox ? inbox.name : "";

  const handleClick = () => {
    onSelect(chat);
  };

  return (
    <div
      className={`conversation ${isActiveChat ? "active" : ""} ${
        hasUnread ? "unread-chat" : ""
      } ${showInboxName ? "has-inbox-name" : ""}`}
      onClick={handleClick}
    >
      <Thumbnail
        src={contact.thumbnail}
        badge={chat.meta.channel}
        username={contact.name}
        status={contact.availability_status}
        size="40px"
      />
      <div className="conversation--details columns">
        {showInboxName && (
          <span className="label">
            <i className={getInboxClassByType(inbox.channel_type)} />
            {inboxName}
          </span>
        )}
        <h4 className="conversation--user">{contact.name}</h4>
        <p className="conversation--message">
          {lastMessage.content ? (
            <span>
              {lastMessage.message_type === "outgoing" && (
                <i className="ion-ios-undo message-from-agent" />
              )}
              {getPlainText(lastMessage.content)}
            </span>
          ) : lastMessage.attachments?.length > 0 ? (
            <span>
              <i
                className={`small-icon ${
                  mockTranslations[
                    `CHAT_LIST.ATTACHMENTS.${lastMessage.attachments[0].file_type}.ICON`
                  ]
                }`}
              />
              {
                mockTranslations[
                  `CHAT_LIST.ATTACHMENTS.${lastMessage.attachments[0].file_type}.CONTENT`
                ]
              }
            </span>
          ) : (
            <span>{mockTranslations["CHAT_LIST.NO_CONTENT"]}</span>
          )}
        </p>
        <div className="conversation--meta">
          <span className="timestamp">
            {format(new Date(chat.timestamp), "p")}
          </span>
          <span className="unread">{unreadCount > 9 ? "9+" : unreadCount}</span>
        </div>
      </div>
    </div>
  );
};

interface ChatFilterProps {
  activeStatus: string;
  onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

// ChatFilter component
const ChatFilter: React.FC<ChatFilterProps> = ({
  activeStatus,
  onStatusChange,
}) => (
  <select
    className="status--filter"
    value={activeStatus}
    onChange={onStatusChange}
  >
    {mockTranslations["CHAT_LIST.CHAT_STATUS_ITEMS"].map((item) => (
      <option key={item.VALUE} value={item.VALUE}>
        {item.TEXT}
      </option>
    ))}
  </select>
);

interface ChatTypeTabsProps {
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

// ChatTypeTabs component
const ChatTypeTabs: React.FC<ChatTypeTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabItems = [
    { key: "me", name: "Minha", count: 5 },
    { key: "unassigned", name: "Não atribuída", count: 3 },
    { key: "all", name: "Todos", count: 10 },
  ];

  return (
    <div className="tab--chat-type">
      {tabItems.map((item) => (
        <div
          key={item.key}
          className={`tabs-title ${activeTab === item.key ? "is-active" : ""}`}
          onClick={() => onTabChange(item.key)}
        >
          <a>
            {item.name}
            <span className="badge">{item.count}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

interface ConversationListProps {
  activeLabel: string;
  teamId: number;
  children?: React.ReactNode;
}

// ConversationList component
export const ConversationList: React.FC<ConversationListProps> = ({
  activeLabel,
  teamId,
  children,
}) => {
  const [conversations, setConversations] =
    React.useState<Conversation[]>(mockConversations);
  const [activeTab, setActiveTab] = React.useState<string>(
    mockConstants.ASSIGNEE_TYPE.ME
  );
  const [activeStatus, setActiveStatus] = React.useState<string>(
    mockConstants.STATUS_TYPE.OPEN
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hasCurrentPageEndReached, setHasCurrentPageEndReached] =
    React.useState<boolean>(true);

  const handleConversationSelect = (chat: Conversation) => {
    console.log("Selected conversation:", chat);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveStatus(event.target.value);
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="conversations-list-wrap">
      {children}
      <div className="chat-list__top">
        <h1 className="page-title text-truncate">Conversas</h1>
        <ChatFilter
          activeStatus={activeStatus}
          onStatusChange={handleStatusChange}
        />
      </div>

      <ChatTypeTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {loading ? (
        <div className="text-center">
          <span className="spinner"></span>
        </div>
      ) : conversations.length === 0 ? (
        <p className="content-box">{mockTranslations["CHAT_LIST.LIST.404"]}</p>
      ) : (
        <div className="conversations-list">
          {conversations.map((chat) => (
            <ConversationCard
              key={chat.id}
              chat={chat}
              activeLabel={activeLabel}
              teamId={teamId}
              onSelect={handleConversationSelect}
            />
          ))}
        </div>
      )}

      {!hasCurrentPageEndReached && !loading && (
        <WootButton classNames="button clear expanded" onClick={() => {}}>
          {mockTranslations["CHAT_LIST.LOAD_MORE_CONVERSATIONS"]}
        </WootButton>
      )}

      {conversations.length > 0 && hasCurrentPageEndReached && !loading && (
        <p className="text-center text-muted end-of-list-text">
          {mockTranslations["CHAT_LIST.EOF"]}
        </p>
      )}
    </div>
  );
};
