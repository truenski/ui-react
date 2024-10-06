import React, { createContext, useContext, useReducer, useEffect } from "react";
import { format } from "date-fns";

// Context
const ConversationContext = createContext();

// Action Types
const SET_CONVERSATIONS = "SET_CONVERSATIONS";
const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
const SET_ACTIVE_STATUS = "SET_ACTIVE_STATUS";

// Reducer
const conversationReducer = (state, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case SET_ACTIVE_STATUS:
      return { ...state, activeStatus: action.payload };
    default:
      return state;
  }
};

// Provider Component
const ConversationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(conversationReducer, {
    conversations: [],
    activeTab: "me",
    activeStatus: "open",
  });

  useEffect(() => {
    // Mock API call to fetch conversations
    setTimeout(() => {
      dispatch({ type: SET_CONVERSATIONS, payload: mockConversations });
    }, 1000);
  }, []);

  return (
    <ConversationContext.Provider value={{ state, dispatch }}>
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to use the conversation context
const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};

// ChatFilter component
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

// ChatTypeTabs component
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
    <ul className="chat-tabs">
      {tabItems.map((item) => (
        <li
          key={item.key}
          className={`chat-tab ${state.activeTab === item.key ? "active" : ""}`}
          onClick={() => handleTabChange(item.key)}
        >
          {item.name} <span className="count">{item.count}</span>
        </li>
      ))}
    </ul>
  );
};

// Updated ConversationList component
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
        <p className="content-box">No conversations found</p>
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
    </div>
  );
};

// ConversationCard component (unchanged from previous example)
const ConversationCard = ({ chat, activeLabel, teamId, onSelect }) => {
  // ... (same implementation as before)
};

// Thumbnail component (unchanged from previous example)
const Thumbnail = ({ src, badge, username, status, size }) => {
  // ... (same implementation as before)
};

// Mock data (unchanged from previous example)
const mockConversations = [
  // ... (same mock data as before)
];

const mockContacts = {
  // ... (same mock data as before)
};

const mockInboxes = {
  // ... (same mock data as before)
};

const mockTranslations = {
  "CHAT_LIST.CHAT_STATUS_ITEMS": [
    { VALUE: "open", TEXT: "Open" },
    { VALUE: "resolved", TEXT: "Resolved" },
    { VALUE: "pending", TEXT: "Pending" },
  ],
};

// Helper functions (unchanged from previous example)
const getInboxClassByType = (type, phoneNumber) => {
  // ... (same implementation as before)
};

const getPlainText = (text) => {
  // ... (same implementation as before)
};

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
