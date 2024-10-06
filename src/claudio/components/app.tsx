import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Assuming you're using date-fns for time formatting

// Mock data and helper functions
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
    name: "Paulo Gustavo",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    availability_status: "online",
    lastMessage: "Posso ajudar em mais alguma coisa",
    lastMessageTime: "2m ago",
    unreadMessages: 2,
  },
  102: {
    id: 102,
    name: "Mariana de Azevedo",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Ótimo! Você poderia me contar um pouco mais sobre...",
    lastMessageTime: "1m ago",
    unreadMessages: 0,
  },
  103: {
    id: 103,
    name: "Paula da Silva",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Se preferir, posso transferir você diretamente para...",
    lastMessageTime: "3m ago",
    unreadMessages: 1,
  },
  104: {
    id: 104,
    name: "João Guilherme",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Caso deseje prosseguir com a confirmação...",
    lastMessageTime: "2m ago",
    unreadMessages: 0,
  },
  105: {
    id: 105,
    name: "Ana Vitória",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "1",
    lastMessageTime: null,
    unreadMessages: 0,
  },
  106: {
    id: 106,
    name: "Alinne da Silva",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Oi! Como posso ajudar você hoje?",
    lastMessageTime: "3m ago",
    unreadMessages: 1,
  },
  107: {
    id: 107,
    name: "João da Silva",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Tudo ótimo, obrigada por perguntar!",
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
  108: {
    id: 108,
    name: "Luiz da Silva",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Eu sou apenas uma especialista virtual...",
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
  109: {
    id: 109,
    name: "Carlos da Silva",
    thumbnail:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.pnghttp",
    lastMessage: "Vamos manter o foco em como podemos...",
    lastMessageTime: "3m ago",
    unreadMessages: 0,
  },
};

const mockInboxes = {
  1: { name: "Website", channel_type: "web" },
};

const getInboxClassByType = (type, phoneNumber) => {
  // Mock implementation
  return "inbox-icon-web";
};

const getPlainText = (text) => {
  // Mock implementation for parsing HTML content
  return text;
};

// Thumbnail component
const Thumbnail = ({ src, badge, username, status, size }) => (
  <div className="user-thumbnail-box" style={{ width: size, height: size }}>
    <img src={src} alt={username} className="user-thumbnail" />
    {badge && <span className={`badge badge-${badge}`}>{badge}</span>}
    {status && <span className={`status-${status}`} />}
  </div>
);

// ConversationCard component
const ConversationCard = ({
  chat,
  activeLabel,
  hideInboxName,
  hideThumbnail,
  teamId,
  onSelect,
}) => {
  const contact = mockContacts[chat.meta.sender.id];
  const inbox = mockInboxes[chat.inbox_id];
  const lastMessage = {}; // Mock implementation: fetch last message

  const isActiveChat = false; // Mock implementation: check if this is the active chat
  const unreadCount = chat.unread_count;
  const hasUnread = unreadCount > 0;
  const showInboxName = !hideInboxName && inbox;
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
      {!hideThumbnail && (
        <Thumbnail
          src={contact.thumbnail}
          badge={chat.meta.channel}
          username={contact.name}
          status={contact.availability_status}
          size="40px"
        />
      )}
      <div className="conversation--details columns">
        {showInboxName && (
          <span className="label">
            <i className={getInboxClassByType(inbox.channel_type)} />
            {inboxName}
          </span>
        )}
        <h4 className="conversation--user">{contact.name}</h4>
        <p className="conversation--message">
          {lastMessage.content && getPlainText(lastMessage.content)}
          {!lastMessage.content && "No messages"}
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

// ConversationList component
const ConversationList = ({ activeLabel, teamId }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch conversations
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleConversationSelect = (chat) => {
    // Handle conversation selection
    console.log("Selected conversation:", chat);
  };

  return (
    <div className="conversations-list-wrap">
      <div className="chat-list__top">
        <h1 className="page-title text-truncate">Conversations</h1>
        {/* Add ChatFilter component here */}
      </div>

      {/* Add ChatTypeTabs component here */}

      {loading ? (
        <div className="text-center">
          <span className="spinner"></span>
        </div>
      ) : conversations.length === 0 ? (
        <p className="content-box">No conversations found</p>
      ) : (
        <div className="conversations-list">
          {conversations.map((chat) => (
            <ConversationCard
              key={chat.id}
              chat={chat}
              activeLabel={activeLabel}
              teamId={teamId}
              onSelect={handleConversationSelect}
              hideInboxName={undefined}
              hideThumbnail={undefined}
            />
          ))}
        </div>
      )}

      {/* Add load more button and end of list message here */}
    </div>
  );
};

// Usage example
const App = () => {
  return (
    <div>
      <ConversationList activeLabel="" teamId={0} />
    </div>
  );
};

export default App;
