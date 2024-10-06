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
import ConversationView from "./Conversation/ConversationView";

// Main App component
const App = () => {
  return (
    <div className="chat-app">
      <ConversationView inboxId={1} conversationId={1} label="" teamId={0} />
    </div>
  );
};

export default App;
