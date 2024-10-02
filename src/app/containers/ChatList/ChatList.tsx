import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import constants from "@/dashboard/constants";
import {
  fetchAllConversations,
  setChatFilter,
  resetConversationPage,
  emptyAllConversations,
} from "@/app/store/conversationActions";
import { RootState } from "@/app/store";
import "./ChatList.modules.scss";
import ChatTypeTabs from "../ChatTypeTabs/ChatTypeTabs";
import ConversationCard from "../ConversationCard/ConversationCard";
import ChatFilter from "../ChatFilter/ChatFilter";

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
  const dispatch = useDispatch();
  const [activeAssigneeTab, setActiveAssigneeTab] = useState(
    constants.ASSIGNEE_TYPE.ME
  );
  const [activeStatus, setActiveStatus] = useState(constants.STATUS_TYPE.OPEN);
  const mockState = {
    chatLists: [{ id: 1, message: "Test conversation" }],
    mineChatsList: () => [{ id: 1, message: "My chat" }],
    allChatList: () => [{ id: 1, message: "All chat" }],
    unAssignedChatsList: () => [{ id: 1, message: "Unassigned chat" }],
    chatListLoading: false,
    currentUserID: 123,
    activeInbox: { id: 1, name: "Inbox 1" },
    conversationStats: { me: 1, unassigned: 1, all: 1 },
    currentPage: 1,
    hasCurrentPageEndReached: true,
  };

  const {
    // chatLists,
    mineChatsList,
    allChatList,
    unAssignedChatsList,
    chatListLoading,
    // currentUserID,
    activeInbox,
    conversationStats,
    currentPage,
    hasCurrentPageEndReached,
  } = mockState;

  // const {
  //   // chatLists,
  //   mineChatsList,
  //   allChatList,
  //   unAssignedChatsList,
  //   chatListLoading,
  //   // currentUserID,
  //   activeInbox,
  //   conversationStats,
  //   currentPage,
  //   hasCurrentPageEndReached,
  // } = useSelector((state: RootState) => ({
  //   chatLists: state.conversation.conversations,
  //   mineChatsList: state.conversation.mineChatsList,
  //   allChatList: state.conversation.allChatList,
  //   unAssignedChatsList: state.conversation.unAssignedChatsList,
  //   chatListLoading: state.conversation.loading,
  //   currentUserID: state.auth.currentUserID,
  //   activeInbox: state.inbox.activeInbox,
  //   conversationStats: state.conversationStats.stats,
  //   currentPage: state.conversationPage.currentPage,
  //   hasCurrentPageEndReached: state.conversationPage.hasEndReached,
  // }));

  useEffect(() => {
    dispatch(setChatFilter(activeStatus));
    resetAndFetchData();

    const fetchConversationStats = () => {
      dispatch(fetchAllConversations(conversationFilters));
    };

    window.addEventListener("fetch_conversation_stats", fetchConversationStats);

    return () => {
      window.removeEventListener(
        "fetch_conversation_stats",
        fetchConversationStats
      );
    };
  }, [activeStatus, activeAssigneeTab, conversationInbox, label, teamId]);

  const resetAndFetchData = () => {
    dispatch(resetConversationPage());
    dispatch(emptyAllConversations());
    fetchConversations();
  };

  const fetchConversations = () => {
    dispatch(fetchAllConversations(conversationFilters)).then(() => {
      // Emit event for conversation load
    });
  };

  const updateAssigneeTab = (selectedTab: string) => {
    if (activeAssigneeTab !== selectedTab) {
      setActiveAssigneeTab(selectedTab);
      if (!currentPage) {
        fetchConversations();
      }
    }
  };

  const updateStatusType = (index: string) => {
    if (activeStatus !== index) {
      setActiveStatus(index);
      resetAndFetchData();
    }
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
      list = [...mineChatsList(conversationFilters)];
    } else if (activeAssigneeTab === "unassigned") {
      list = [...unAssignedChatsList(conversationFilters)];
    } else {
      list = [...allChatList(conversationFilters)];
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
          <button
            className="woot-button clear expanded"
            onClick={fetchConversations}
          >
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
