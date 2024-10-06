import React, { useEffect, useState } from "react";
import "./index.module.scss";
import ContactDetailsItem from "../ContactDetailsItem/ContactDetailsItem";
import ConversationCard from "./ConversationCard";
import Spinner from "../../Spinner";

interface ContactConversationsProps {
  contactId: string | number;
  conversationId: string | number;
}

const mockConversations = [
  {
    id: 1,
    meta: {
      sender: {
        name: "John Doe",
        thumbnail: "https://via.placeholder.com/40",
        availability_status: "available",
      },
      channel: "web",
    },
    messages: [
      {
        id: 1,
        content: "Hello, how can I help you?",
        created_at: 1633024800,
        message_type: 0,
        private: false,
      },
    ],
    agent_last_seen_at: 1633024800,
    timestamp: 1633024800,
  },
  {
    id: 2,
    meta: {
      sender: {
        name: "Jane Smith",
        thumbnail: "https://via.placeholder.com/40",
        availability_status: "busy",
      },
      channel: "email",
    },
    messages: [
      {
        id: 2,
        content: "I need assistance with my order.",
        created_at: 1633111200,
        message_type: 0,
        private: false,
      },
    ],
    agent_last_seen_at: 1633111200,
    timestamp: 1633111200,
  },
  {
    id: 3,
    meta: {
      sender: {
        name: "Alice Johnson",
        thumbnail: "https://via.placeholder.com/40",
        availability_status: "offline",
      },
      channel: "chat",
    },
    messages: [
      {
        id: 3,
        content: "Sure, let me check that for you.",
        created_at: 1633197600,
        message_type: 0,
        private: false,
      },
    ],
    agent_last_seen_at: 1633197600,
    timestamp: 1633197600,
  },
];

const ContactConversations: React.FC<ContactConversationsProps> = ({
  contactId,
  conversationId,
}) => {
  const [conversations, setConversations] = useState(mockConversations);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  }, [contactId]);

  const previousConversations = conversations.filter(
    (conversation) => conversation.id !== Number(conversationId)
  );

  return (
    <div className="contact-conversation--panel">
      <ContactDetailsItem
        title={"CONTACT_PANEL.CONVERSATIONS.TITLE"}
        icon="ion-chatboxes"
        emoji="💬"
      />
      {!isFetching ? (
        <div className="contact-conversation__wrap">
          {!previousConversations.length ? (
            <div className="no-label-message">
              <span>{"CONTACT_PANEL.CONVERSATIONS.NO_RECORDS_FOUND"}</span>
            </div>
          ) : (
            <div className="contact-conversation--list">
              {previousConversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  chat={conversation}
                  hideInboxName={false}
                  hideThumbnail={true}
                  className="compact"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ContactConversations;
