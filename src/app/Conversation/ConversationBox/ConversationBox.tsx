import React, { useState, useEffect } from "react";
// import EmptyState from "./EmptyState";

import MessagesView from "../MessagesView";
import ConversationHeader from "../ConversationHeader/ConversationHeader";
import { mockAgentsList, mockCurrentChat, TCurrentChat } from "../mockData";

interface ConversationBoxProps {
  inboxId?: number | string;
  isContactPanelOpen: boolean;
  onContactPanelToggle: () => void;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  inboxId,
  isContactPanelOpen,
  onContactPanelToggle,
}) => {
  const [currentChat, setCurrentChat] = useState<TCurrentChat>(mockCurrentChat);
  const [agentsList, setAgentsList] = useState(mockAgentsList);
  const showContactPanel = isContactPanelOpen && currentChat.id;

  useEffect(() => {
    if (inboxId) {
      // Mock fetching inbox assignable agents
      setAgentsList(mockAgentsList);
    }
  }, [inboxId]);

  return (
    <div className="conversation-details-wrap">
      {currentChat.id && (
        <ConversationHeader
          chat={currentChat}
          isContactPanelOpen={isContactPanelOpen}
          onContactPanelToggle={onContactPanelToggle}
        />
      )}
      <div className="messages-and-sidebar">
        {currentChat.id ? (
          <MessagesView
            inboxId={inboxId}
            isContactPanelOpen={isContactPanelOpen}
            onContactPanelToggle={onContactPanelToggle}
          />
        ) : (
          <div>emptystate</div>
          //   <EmptyState />
        )}
        {showContactPanel && (
          <div className="conversation-sidebar-wrap">
            {/* <ContactPanel
              conversationId={currentChat.id}
              inboxId={currentChat.inbox_id}
              onToggle={onContactPanelToggle}
            /> */}
            <div>contact panel</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationBox;
