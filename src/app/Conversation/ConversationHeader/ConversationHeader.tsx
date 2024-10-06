import React, { useState, useEffect } from "react";
import AvailabilityStatusBadge from "./MoreActions/AvailabilityStatusBadge/AvailabilityStatusBadge";
import WootButton from "../ReplyBox/WootButton";
import Thumbnail from "@/app/containers/Thumbnail/Thumbnail";
import MoreActions from "./MoreActions/MoreActions";
import {
  mockAgentsList,
  mockContacts,
  mockCurrentChat,
  mockUIFlags,
} from "../mockData.ts";

interface ConversationHeaderProps {
  chat: any; // Define a proper type for chat
  isContactPanelOpen: boolean;
  onContactPanelToggle: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  chat,
  isContactPanelOpen,
  onContactPanelToggle,
}) => {
  const [currentChatAssignee, setCurrentChatAssignee] = useState(null);
  const [inboxId, setInboxId] = useState(null);
  const [currentChat, setCurrentChat] = useState(mockCurrentChat); // Replace with actual data fetching logic
  const [agentsList, setAgentsList] = useState(mockAgentsList); // Replace with actual data fetching logic
  const [uiFlags, setUIFlags] = useState(mockUIFlags); // Replace with actual data fetching logic

  useEffect(() => {
    const { inbox_id: inboxId } = chat;
    setInboxId(inboxId);
  }, [chat]);

  const assignAgent = (agent: any) => {
    // Simulate API call
    setTimeout(() => {
      alert(`Agent ${agent.name} assigned`);
    }, 1000);
  };

  const removeAgent = () => {
    // Simulate API call
    setTimeout(() => {
      alert("Agent removed");
    }, 1000);
  };

  const currentContact = mockContacts[101]; // Replace with actual data fetching logic

  const chatMetadata = chat.meta;

  return (
    <div className="conv-header">
      <div className="user">
        <Thumbnail
          hasBorder={false}
          src={currentContact.thumbnail}
          size="40px"
          badge={chatMetadata.channel}
          username={currentContact.name}
          status={currentContact.availability_status}
        />
        <div className="user--profile__meta">
          <h3 className="user--name text-truncate">{currentContact.name}</h3>
          <WootButton
            classNames="user--profile__button"
            size="small"
            variant="link"
            onClick={onContactPanelToggle}
          >
            {`${isContactPanelOpen ? "Close" : "Open"} Details`}
          </WootButton>
        </div>
      </div>
      <div
        className={`header-actions-wrap ${
          isContactPanelOpen ? "has-open-sidebar" : ""
        }`}
      >
        <div className="multiselect-box multiselect-wrap--small">
          <i className="icon ion-headphone" />
          <select
            value={currentChat.meta.assignee?.id || ""}
            onChange={(e) =>
              assignAgent(
                agentsList.find((agent) => agent.id === e.target.value)
              )
            }
            disabled={uiFlags.isFetching}
          >
            <option value="">{"Select Agent"}</option>
            {agentsList.map((agent) => (
              <option key={agent.id} value={agent.id}>
                <AvailabilityStatusBadge status={agent.availability_status} />
                {agent.name}
              </option>
            ))}
          </select>
        </div>
        <MoreActions currentChat={currentChat} />
      </div>
    </div>
  );
};

export default ConversationHeader;
