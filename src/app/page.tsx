"use client";
import React from "react";

import "@/dashboard/assets/scss/app.scss";
import "@/dashboard/assets/scss/super_admin/index.scss";
import "./thumbnail.scss";
import "./conversationCard.scss";
import "./chatlist.scss";
//2
import "./conversationPage.scss";
import "./popoverSearch.scss";
import "./conversationBox.scss";
import "./conversation/ConversationHeader/index.modules.scss";
import "./contactPanel.scss";
import "./conversationEmptyState.scss";
import { ConversationList } from "./ConversationList";
import MessagesView from "./Conversation/MessagesView";
import ConversationBox from "./Conversation/ConversationBox/ConversationBox";

// Main App component
const App = () => {
  const [isContactPanelOpen, setIsContactPanelOpen] = React.useState(false);
  const handleContactPanelToggle = () => {
    setIsContactPanelOpen(!isContactPanelOpen);
  };
  return (
    <div className="chat-app">
      <ConversationList activeLabel="" teamId={0} />
      <ConversationBox
        inboxId={1} // Mock inboxId
        isContactPanelOpen={isContactPanelOpen}
        onContactPanelToggle={handleContactPanelToggle}
      />
    </div>
  );
};

export default App;
