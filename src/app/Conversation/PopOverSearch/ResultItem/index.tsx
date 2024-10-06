import React from "react";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import SearchMessageItem from "./SearchMessageItem";
import "./ResultItem.module.scss";

interface Message {
  created_at: number;
  sender_name: string;
  message_type: number;
  content: string;
}

interface ResultItemProps {
  conversationId: number;
  userName: string;
  inboxName: string;
  timestamp: number;
  messages: Message[];
  searchTerm: string;
}

const ResultItem: React.FC<ResultItemProps> = ({
  conversationId,
  userName,
  inboxName,
  timestamp,
  messages,
  searchTerm,
}) => {
  const onClick = () => {
    const path = `/conversations/${conversationId}`;
    window.location.href = path;
  };

  const readableTime = timestamp
    ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true })
    : "";

  return (
    <div className="search-result" onClick={onClick}>
      <div className="result-header">
        <div className="message">
          <i className="ion-ios-chatboxes-outline" />
          <div className="conversation">
            <div className="user-wrap">
              <div className="name-wrap">
                <span className="sub-block-title">{userName}</span>
              </div>
              <span className="conversation-id"># {conversationId}</span>
            </div>
            <span className="inbox-name">{inboxName}</span>
          </div>
        </div>
        <span className="timestamp">{readableTime}</span>
      </div>
      {messages.map((message) => (
        <SearchMessageItem
          key={message.created_at}
          userName={message.sender_name}
          timestamp={message.created_at}
          messageType={message.message_type}
          content={message.content}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default ResultItem;
