import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ReplyBox from "./ReplyBox/ReplyBox";
import { calculateScrollTop } from "./helpers/scrollTopCalculationHelper.js";
import { REPLY_POLICY } from "../Conversation/constants/links.js";
import { mockCurrentChat, mockMessages, mockTypingUsers } from "./mockData.ts";
import { getTypingUsersText } from "@/dashboard/helper/commons";
import Image from "next/image";

interface MessagesViewProps {
  inboxId?: number | string;
  isContactPanelOpen: boolean;
  onContactPanelToggle: () => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({
  inboxId,
  isContactPanelOpen,
  onContactPanelToggle,
}) => {
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(true);
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [currentChat, setCurrentChat] = useState(mockCurrentChat);
  const [messages, setMessages] = useState(mockMessages);
  const [typingUsers, setTypingUsers] = useState(mockTypingUsers);
  const conversationPanelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll logic here
    };

    const conversationPanel = conversationPanelRef.current;
    conversationPanel.addEventListener("scroll", handleScroll);

    return () => {
      conversationPanel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    const conversationPanel = conversationPanelRef.current;
    conversationPanel.scrollTop = calculateScrollTop(
      conversationPanel.scrollHeight,
      conversationPanel.clientHeight,
      conversationPanel.querySelectorAll(".message--read")
    );
  };

  const removeTweetSelection = () => {
    setSelectedTweetId(null);
  };

  const getReadMessages = () => {
    return messages.filter((message) => message.read);
  };

  const getUnReadMessages = () => {
    return messages.filter((message) => !message.read);
  };

  const typingUserNames = () => {
    return getTypingUsersText(typingUsers);
  };

  return (
    <div className="view-box fill-height">
      {!currentChat.can_reply && !currentChat.isATwilioWhatsappChannel && (
        <div className="banner messenger-policy--banner">
          <span>
            {`Cannot reply. `}
            <a
              href={REPLY_POLICY.FACEBOOK}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {`24 hours window`}
            </a>
          </span>
        </div>
      )}
      {!currentChat.can_reply && currentChat.isATwilioWhatsappChannel && (
        <div className="banner messenger-policy--banner">
          <span>
            {`Twilio WhatsApp can reply. `}
            <a
              href={REPLY_POLICY.TWILIO_WHATSAPP}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {`24 hours window`}
            </a>
          </span>
        </div>
      )}
      <div className="banner">
        {!selectedTweetId ? (
          <span>{`Last incoming tweet`}</span>
        ) : (
          <span>
            {`Replying to ${selectedTweetId}`}
            <button
              className="banner-close-button"
              onClick={removeTweetSelection}
            >
              <i className="ion-close" />
            </button>
          </span>
        )}
      </div>
      <ul className="conversation-panel" ref={conversationPanelRef}>
        <li className="spinner--container">
          {isLoadingPrevious && <span className="spinner message" />}
        </li>
        {getReadMessages().map((message) => (
          <Message
            key={message.id}
            data={message}
            isATweet={currentChat.isATweet}
          />
        ))}
        <li className="unread--toast">
          <span className="text-uppercase">
            {`${
              messages.filter((message) => !message.read).length
            } unread messages`}
          </span>
        </li>
        {getUnReadMessages().map((message) => (
          <Message
            key={message.id}
            data={message}
            isATweet={currentChat.isATweet}
          />
        ))}
      </ul>
      <div className="conversation-footer">
        {typingUsers.length > 0 && (
          <div className="typing-indicator-wrap">
            <div className="typing-indicator">
              {typingUserNames()}
              <Image
                unoptimized
                className="gif"
                src="/images/typing.gif"
                alt="Someone is typing"
                width={24} // specify the width
                height={24} // specify the height
              />
            </div>
          </div>
        )}
        <ReplyBox conversationId={currentChat.id} inReplyTo={selectedTweetId} />
      </div>
    </div>
  );
};

export default MessagesView;
