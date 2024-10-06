import React from "react";
import { format } from "date-fns";

// Mock data and helper functions
const mockTranslations = {
  "CHAT_LIST.CHAT_STATUS_ITEMS": [
    { VALUE: "open", TEXT: "Open" },
    { VALUE: "resolved", TEXT: "Resolved" },
    { VALUE: "pending", TEXT: "Pending" },
  ],
  "CHAT_LIST.LIST.404": "No conversations found",
  "CHAT_LIST.LOAD_MORE_CONVERSATIONS": "Load More Conversations",
  "CHAT_LIST.EOF": "End of list",
  "CHAT_LIST.NO_CONTENT": "No messages",
  "CHAT_LIST.ATTACHMENTS.image.ICON": "icon-image",
  "CHAT_LIST.ATTACHMENTS.image.CONTENT": "Image",
};

const mockConstants = {
  STATUS_TYPE: {
    OPEN: "open",
  },
  ASSIGNEE_TYPE: {
    ME: "me",
  },
};

const mockConversations = [
  {
    id: 1,
    meta: {
      sender: { id: 101 },
      channel: "web",
    },
    inbox_id: 1,
    timestamp: new Date().toISOString(),
    unread_count: 3,
  },
  // Add more mock conversations as needed
];

const mockContacts = {
  101: {
    id: 101,
    name: "John Doe",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    availability_status: "online",
  },
};

const mockInboxes = {
  1: { name: "Website", channel_type: "web" },
};

const getInboxClassByType = (type) => {
  // Mock implementation
  return "inbox-icon-web";
};

const getPlainText = (text) => {
  // Mock implementation for parsing HTML content
  return text;
};

// Thumbnail component
const Thumbnail = ({ src, badge, username, status, size }) => (
  <div
    className="user-thumbnail-box columns"
    style={{ width: size, height: size }}
  >
    <img src={src} alt={username} className="user-thumbnail" />
    {badge && <span className={`badge badge-${badge}`}>{badge}</span>}
    {status && <span className={`status-${status}`} />}
  </div>
);

// ConversationCard component
const ConversationCard = ({ chat, activeLabel, teamId, onSelect }) => {
  const contact = mockContacts[chat.meta.sender.id];
  const inbox = mockInboxes[chat.inbox_id];
  const lastMessage = {}; // Mock implementation: fetch last message

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
          ) : lastMessage.attachments ? (
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

// ChatFilter component
const ChatFilter = ({ activeStatus, onStatusChange }) => (
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

// ChatTypeTabs component
const ChatTypeTabs = ({ activeTab, onTabChange }) => {
  const tabItems = [
    { key: "me", name: "My Chats", count: 5 },
    { key: "unassigned", name: "Unassigned", count: 3 },
    { key: "all", name: "All", count: 10 },
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

// ConversationList component
const ConversationList = ({ activeLabel, teamId }) => {
  const [conversations, setConversations] = React.useState(mockConversations);
  const [activeTab, setActiveTab] = React.useState(
    mockConstants.ASSIGNEE_TYPE.ME
  );
  const [activeStatus, setActiveStatus] = React.useState(
    mockConstants.STATUS_TYPE.OPEN
  );
  const [loading, setLoading] = React.useState(false);
  const [hasCurrentPageEndReached, setHasCurrentPageEndReached] =
    React.useState(true);

  const handleConversationSelect = (chat) => {
    console.log("Selected conversation:", chat);
  };

  const handleStatusChange = (event) => {
    setActiveStatus(event.target.value);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="conversations-list-wrap">
      <div className="chat-list__top">
        <h1 className="page-title text-truncate">Conversations</h1>
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
        <button className="button clear expanded" onClick={() => {}}>
          {mockTranslations["CHAT_LIST.LOAD_MORE_CONVERSATIONS"]}
        </button>
      )}

      {conversations.length > 0 && hasCurrentPageEndReached && !loading && (
        <p className="text-center text-muted end-of-list-text">
          {mockTranslations["CHAT_LIST.EOF"]}
        </p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="chat-app">
      <ConversationList activeLabel="" teamId={0} />
    </div>
  );
};

export default App;
