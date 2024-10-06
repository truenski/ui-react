// components/ConversationCard.tsx
import React from "react";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import Thumbnail from "../Thumbnail/Thumbnail";

interface ConversationCardProps {
  chat: {
    id: number;
    meta: {
      sender: {
        name: string;
        thumbnail: string;
        availability_status: string;
      };
      channel: string;
    };
    messages: {
      id: number;
      content: string;
      created_at: number;
      message_type: number;
      private: boolean;
    }[];
    agent_last_seen_at: number;
    timestamp: number;
  };
  activeLabel?: string;
  hideInboxName?: boolean;
  hideThumbnail?: boolean;
  teamId?: number;
  onCardClick?: (chat: any) => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  chat,
  hideThumbnail,
  onCardClick,
}) => {
  const currentContact = chat.meta.sender;
  const lastMessageInChat = chat.messages[chat.messages.length - 1];
  const unreadCount = chat.messages.filter(
    (message) =>
      message.created_at * 1000 > chat.agent_last_seen_at * 1000 &&
      message.message_type === 0 &&
      !message.private
  ).length;
  const hasUnread = unreadCount > 0;
  const dynamicTime = (time: number) =>
    formatDistanceToNow(fromUnixTime(time), { addSuffix: true });

  return (
    <div
      className={`conversation ${hasUnread ? "unread-chat" : ""}`}
      onClick={() => onCardClick && onCardClick(chat)}
    >
      {!hideThumbnail && (
        <Thumbnail
          hasBorder
          src={currentContact.thumbnail}
          badge={chat.meta.channel}
          username={currentContact.name}
          status={currentContact.availability_status}
          size="40px"
        />
      )}
      <div className="conversation--details">
        <h4 className="conversation--user">{currentContact.name}</h4>
        <p className="conversation--message">
          {lastMessageInChat.content || "No content"}
        </p>
        <div className="conversation--meta">
          <span className="timestamp">{dynamicTime(chat.timestamp)}</span>
          <span className="unread">{unreadCount > 9 ? "9+" : unreadCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
