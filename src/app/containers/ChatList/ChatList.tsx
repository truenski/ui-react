import React, { useState } from "react";
import constants from "@/dashboard/constants";
import "./ChatList.modules.scss";
import ChatTypeTabs from "../ChatTypeTabs/ChatTypeTabs";
import ChatFilter from "../ChatFilter/ChatFilter";
import ConversationCard from "@/app/Conversation/ContactPanel/ContactConversations/ConversationCard";

interface ChatListProps {
  conversationInbox?: number;
  teamId?: number;
  label?: string;
}

const ChatList: React.FC<ChatListProps> = ({
  conversationInbox = 0,
  teamId = 0,
  label = "",
}) => {
  const [activeAssigneeTab, setActiveAssigneeTab] = useState(
    constants.ASSIGNEE_TYPE.ME
  );
  const [activeStatus, setActiveStatus] = useState(constants.STATUS_TYPE.OPEN);

  const mockState = {
    chatLists: [
      {
        id: 1,
        meta: {
          sender: {
            name: "John Doe",
            thumbnail: "/images/user-thumbnail.png",
            availability_status: "online",
          },
          channel: "Channel::FacebookPage",
        },
        messages: [
          {
            id: 1,
            content: "Hello, how can I help you?",
            created_at: 1625247600,
            message_type: 0,
            private: false,
          },
        ],
        agent_last_seen_at: 1625247600,
        timestamp: 1625247600,
      },
    ],
    mineChatsList: [
      {
        id: 1,
        meta: {
          sender: {
            name: "John Doe",
            thumbnail: "/images/user-thumbnail.png",
            availability_status: "online",
          },
          channel: "Channel::FacebookPage",
        },
        messages: [
          {
            id: 1,
            content: "Hello, how can I help you?",
            created_at: 1625247600,
            message_type: 0,
            private: false,
          },
        ],
        agent_last_seen_at: 1625247600,
        timestamp: 1625247600,
      },
    ],
    allChatList: [
      {
        id: 1,
        meta: {
          sender: {
            name: "John Doe",
            thumbnail: "/images/user-thumbnail.png",
            availability_status: "online",
          },
          channel: "Channel::FacebookPage",
        },
        messages: [
          {
            id: 1,
            content: "Hello, how can I help you?",
            created_at: 1625247600,
            message_type: 0,
            private: false,
          },
        ],
        agent_last_seen_at: 1625247600,
        timestamp: 1625247600,
      },
    ],
    unAssignedChatsList: [
      {
        id: 1,
        meta: {
          sender: {
            name: "John Doe",
            thumbnail: "/images/user-thumbnail.png",
            availability_status: "online",
          },
          channel: "Channel::FacebookPage",
        },
        messages: [
          {
            id: 1,
            content: "Hello, how can I help you?",
            created_at: 1625247600,
            message_type: 0,
            private: false,
          },
        ],
        agent_last_seen_at: 1625247600,
        timestamp: 1625247600,
      },
    ],
    chatListLoading: false,
    currentUserID: 123,
    activeInbox: { id: 1, name: "Inbox 1" },
    conversationStats: { me: 1, unassigned: 1, all: 1 },
    currentPage: 1,
    hasCurrentPageEndReached: true,
  };

  const {
    mineChatsList,
    allChatList,
    unAssignedChatsList,
    chatListLoading,
    activeInbox,
    conversationStats,
    currentPage,
    hasCurrentPageEndReached,
  } = mockState;

  const updateAssigneeTab = (selectedTab: string) => {
    setActiveAssigneeTab(selectedTab);
  };

  const updateStatusType = (index: string) => {
    setActiveStatus(index);
  };

  const conversationFilters = {
    inboxId: conversationInbox ? conversationInbox : undefined,
    assigneeType: activeAssigneeTab,
    status: activeStatus,
    page: currentPage + 1,
    labels: label ? [label] : undefined,
    teamId: teamId ? teamId : undefined,
  };

  const assigneeTabItems = [
    { key: "me", name: "My Chats", count: conversationStats["me"] || 0 },
    {
      key: "unassigned",
      name: "Unassigned",
      count: conversationStats["unassigned"] || 0,
    },
    { key: "all", name: "All Chats", count: conversationStats["all"] || 0 },
  ];

  const conversationList = (() => {
    let list = [];
    if (activeAssigneeTab === "me") {
      list = [...mineChatsList];
    } else if (activeAssigneeTab === "unassigned") {
      list = [...unAssignedChatsList];
    } else {
      list = [...allChatList];
    }
    return list;
  })();

  const pageTitle = (() => {
    if (activeInbox.name) {
      return activeInbox.name;
    }
    if (teamId) {
      return teamId;
    }
    if (label) {
      return `#${label}`;
    }
    return "Chat List";
  })();

  return (
    <div className="conversations-list-wrap">
      <div className="chat-list__top">
        <h1 className="page-title text-truncate">{pageTitle}</h1>
        <ChatFilter onStatusFilterChange={updateStatusType} />
      </div>

      <ChatTypeTabs
        items={assigneeTabItems}
        activeTab={activeAssigneeTab}
        className="tab--chat-type"
        onChatTabChange={updateAssigneeTab}
      />

      {!chatListLoading && !conversationList.length && (
        <p className="content-box">No conversations found</p>
      )}

      <div className="conversations-list">
        {conversationList.map((chat) => (
          <ConversationCard
            key={chat.id}
            activeLabel={label}
            teamId={teamId}
            chat={chat}
          />
        ))}

        {chatListLoading && (
          <div className="text-center">
            <span className="spinner"></span>
          </div>
        )}

        {!hasCurrentPageEndReached && !chatListLoading && (
          <button className="woot-button clear expanded">
            Load More Conversations
          </button>
        )}

        {conversationList.length &&
          hasCurrentPageEndReached &&
          !chatListLoading && (
            <p className="text-center text-muted end-of-list-text">
              End of list
            </p>
          )}
      </div>
    </div>
  );
};

export default ChatList;
