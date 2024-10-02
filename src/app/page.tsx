"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer";
import ChatFilter from "./containers/ChatFilter/ChatFilter";
import ChatTypeTabs from "./containers/ChatTypeTabs/ChatTypeTabs";
import constants from "@/dashboard/constants";
import "./page.module.scss";
import ConversationCard from "./containers/ConversationCard/ConversationCard";
import ChatList from "./containers/ChatList/ChatList";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState(constants.STATUS_TYPE.OPEN);
  const [activeTab, setActiveTab] = useState(constants.ASSIGNEE_TYPE.ME);
  const [conversations, setConversations] = useState([]);

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
  };

  const handleChatTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleCardClick = (chat) => {
    console.log("Card clicked:", chat);
  };
  return (
    <>
      <div className="row app-wrapper">
        <Sidebar />
        <section className="app-content columns">
          {/* <div className="router-view">
            <ChatList conversationInbox={1} teamId={2} label="support" />
          </div> */}
        </section>

        {/* <ChatFilter onStatusFilterChange={handleStatusFilterChange} />
            <ChatTypeTabs
              items={[
                { key: "me", name: "My Chats", count: 10 },
                { key: "unassigned", name: "Unassigned", count: 5 },
                { key: "all", name: "All Chats", count: 20 },
              ]}
              activeTab={activeTab}
              onChatTabChange={handleChatTabChange}
            />
            <div>
              {conversations.map((chat) => (
                <ConversationCard
                  key={chat.id}
                  chat={chat}
                  onCardClick={handleCardClick}
                />
              ))}
            </div> */}
      </div>
      <SnackbarContainer />
    </>
  );
}
