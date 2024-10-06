import React, { createContext, useContext, useReducer, useEffect } from "react";
import { format } from "date-fns";

// ... (Context, reducer, and provider code remains the same)

// ChatFilter component (adjusted classes)
const ChatFilter = () => {
  const { state, dispatch } = useConversation();

  const handleStatusChange = (event) => {
    dispatch({ type: SET_ACTIVE_STATUS, payload: event.target.value });
  };

  return (
    <select
      className="status--filter"
      value={state.activeStatus}
      onChange={handleStatusChange}
    >
      {mockTranslations["CHAT_LIST.CHAT_STATUS_ITEMS"].map((item) => (
        <option key={item.VALUE} value={item.VALUE}>
          {item.TEXT}
        </option>
      ))}
    </select>
  );
};

// ChatTypeTabs component (adjusted classes)
const ChatTypeTabs = () => {
  const { state, dispatch } = useConversation();

  const handleTabChange = (tabKey) => {
    dispatch({ type: SET_ACTIVE_TAB, payload: tabKey });
  };

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
          className={`tabs-title ${
            state.activeTab === item.key ? "is-active" : ""
          }`}
          onClick={() => handleTabChange(item.key)}
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

// Updated ConversationList component (adjusted classes)
const ConversationList = ({ activeLabel, teamId }) => {
  const { state } = useConversation();

  const handleConversationSelect = (chat) => {
    console.log("Selected conversation:", chat);
  };

  return (
    <div className="conversations-list-wrap">
      <div className="chat-list__top">
        <h1 className="page-title text-truncate">Conversations</h1>
        <ChatFilter />
      </div>

      <ChatTypeTabs />

      {state.conversations.length === 0 ? (
        <p className="content-box">{mockTranslations["CHAT_LIST.LIST.404"]}</p>
      ) : (
        <div className="conversations-list">
          {state.conversations.map((chat) => (
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

      {/* Load more button */}
      {!state.hasCurrentPageEndReached && !state.chatListLoading && (
        <button className="button clear expanded" onClick={() => {}}>
          {mockTranslations["CHAT_LIST.LOAD_MORE_CONVERSATIONS"]}
        </button>
      )}

      {/* End of list message */}
      {state.conversationList.length > 0 &&
        state.hasCurrentPageEndReached &&
        !state.chatListLoading && (
          <p className="text-center text-muted end-of-list-text">
            {mockTranslations["CHAT_LIST.EOF"]}
          </p>
        )}
    </div>
  );
};

// ConversationCard component (adjusted classes)
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

// Thumbnail component (adjusted classes)
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

// ... (Mock data and helper functions remain the same)

// Main App component
const App = () => {
  return (
    <ConversationProvider>
      <div className="chat-app">
        <ConversationList activeLabel="" teamId={0} />
      </div>
    </ConversationProvider>
  );
};

export default App;
