import React from "react";
// import { useRouter } from "next/router";
import { getInboxClassByType } from "@/dashboard/helper/inbox";
import styles from "./index.module.scss";
import { MESSAGE_TYPE } from "@/shared/constants/messages";
import { formatDistanceToNow, fromUnixTime } from "date-fns";

import Thumbnail from "@/app/containers/Thumbnail/Thumbnail";
import {
  mockAccountId,
  mockActiveInbox,
  mockCurrentChat,
  mockInboxesList,
  TChat,
} from "../../mockData";

interface ConversationCardProps {
  activeLabel?: string;
  chat: TChat;
  hideInboxName?: boolean;
  hideThumbnail?: boolean;
  teamId?: string | number;
}

// Mock data
const ConversationCard: React.FC<ConversationCardProps> = ({
  activeLabel = "",
  chat,
  hideInboxName = false,
  hideThumbnail = false,
  teamId = 0,
}) => {
  //   const router = useRouter();

  const chatMetadata = chat.meta;
  const currentContact = {
    id: 1,
    name: "Contact Name",
    thumbnail: "",
    availability_status: "online",
  };
  const lastMessageInChat = chat?.messages?.[chat.messages.length - 1] || {
    content: "",
    message_type: MESSAGE_TYPE.INCOMING,
  };
  const messageByAgent =
    lastMessageInChat?.message_type === MESSAGE_TYPE.OUTGOING;
  const parsedLastMessage =
    lastMessageInChat.content_attributes?.email?.subject ||
    lastMessageInChat.content;
  const chatInbox = mockInboxesList.find((inbox) => inbox.id === chat.inbox_id);
  const computedInboxClass = getInboxClassByType(
    chatInbox?.channel_type,
    chatInbox?.phone_number
  );
  const showInboxName =
    !hideInboxName && !mockActiveInbox && mockInboxesList.length > 1;
  const inboxName = chatInbox?.name || "";
  const isActiveChat = mockCurrentChat.id === chat.id;
  const unreadCount = chat.unread_count;
  const hasUnread = unreadCount > 0;

  const cardClick = (chat) => {
    const path = `/conversations/${mockAccountId}/${chat.id}`;
    // router.push(path);
  };

  return (
    <div
      className={`${styles.conversation} ${isActiveChat ? styles.active : ""} ${
        hasUnread ? styles.unreadChat : ""
      } ${showInboxName ? styles.hasInboxName : ""}`}
      onClick={() => cardClick(chat)}
    >
      {!hideThumbnail && (
        <Thumbnail
          src={currentContact.thumbnail}
          badge={chatMetadata.channel}
          className="columns"
          username={currentContact.name}
          status={currentContact.availability_status}
          size="40px"
        />
      )}
      <div className="conversation--details columns">
        {showInboxName && (
          <span className="label">
            <i className={computedInboxClass} />
            {inboxName}
          </span>
        )}
        <h4 className="conversation--user">{currentContact.name}</h4>
        {lastMessageInChat ? (
          <p className="conversation--message">
            {messageByAgent && (
              <i className="ion-ios-undo message-from-agent"></i>
            )}
            {lastMessageInChat.content ? (
              <span>{parsedLastMessage}</span>
            ) : lastMessageInChat.attachments ? (
              <span>
                <i className={`small-icon ${attachmentIconKey}.ICON`}></i>
                {`${attachmentIconKey}.CONTENT`}
              </span>
            ) : (
              <span>{"No content"}</span>
            )}
          </p>
        ) : (
          <p className="conversation--message">
            <i className="ion-android-alert"></i>
            <span>{"No messages"}</span>
          </p>
        )}
        <div className="conversation--meta">
          <span className="timestamp">
            {new Date(chat.timestamp).toLocaleString()}
          </span>
          <span className="unread">{unreadCount > 9 ? "9+" : unreadCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
