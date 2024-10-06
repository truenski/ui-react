import { ConversationList } from "@/app/ConversationList";
import React, { useEffect, useState } from "react";
import PopOverSearch from "../PopOverSearch/PopOverSearch";
import ConversationBox from "../ConversationBox/ConversationBox";
import "./ConversationView.module.scss";

interface ConversationViewProps {
  inboxId: number | string;
  conversationId: number | string;
  label: string;
  teamId: number | string;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  inboxId,
  conversationId,
  label,
  teamId,
}) => {
  const [showSearchModal, setShowSearchModal] = useState(true);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(true);
  const [chatList, setChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    // Fetch agents and initialize the component
    fetchAgents();
    initialize();
  }, []);

  useEffect(() => {
    // Watch for changes in chatList length and set active chat
    setActiveChat();
  }, [chatList.length]);

  const fetchAgents = async () => {
    // Fetch agents logic here
  };

  const initialize = () => {
    setActiveInbox(inboxId);
    setActiveChat();
  };

  const fetchConversationIfUnavailable = () => {
    if (!conversationId) return;
    const chat = findConversation();
    if (!chat) {
      // Fetch conversation logic here
    }
  };

  const findConversation = () => {
    const conversationIdInt = parseInt(conversationId as string, 10);
    const chat = chatList.find((c) => c.id === conversationIdInt);
    return chat;
  };

  const setActiveChat = () => {
    if (conversationId) {
      const chat = findConversation();
      if (!chat) return;
      setCurrentChat(chat);
      // Scroll to message logic here
    } else {
      clearSelectedState();
    }
  };

  const clearSelectedState = () => {
    setCurrentChat(null);
  };

  const onToggleContactPanel = () => {
    setIsContactPanelOpen(!isContactPanelOpen);
  };

  const onSearch = () => {
    setShowSearchModal(true);
  };

  const closeSearch = () => {
    setShowSearchModal(false);
  };

  return (
    <section className="conversation-page">
      <ConversationList
        activeLabel={label}
        teamId={parseInt(teamId as string, 10)}
        onConversationLoad={fetchConversationIfUnavailable}
      >
        <PopOverSearch currentPage={1} />
      </ConversationList>
      <ConversationBox
        inboxId={inboxId}
        isContactPanelOpen={isContactPanelOpen}
        onContactPanelToggle={onToggleContactPanel}
      />
    </section>
  );
};

export default ConversationView;
