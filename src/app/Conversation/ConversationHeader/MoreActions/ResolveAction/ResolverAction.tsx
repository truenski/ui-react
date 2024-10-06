import React, { useState } from "react";
import WootButton from "@/app/Conversation/ReplyBox/WootButton";
import DropdownMenu from "../WootDropdown/WootDropdownMenu";
import DropdownItem from "../WootDropdown/WootDropdownItem";
import { mockCurrentChat } from "@/app/Conversation/mockData";

interface ResolveActionProps {
  conversationId: number | string;
  status: string;
}

const ResolveAction: React.FC<ResolveActionProps> = ({
  conversationId,
  status,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const STATUS_TYPE = {
    OPEN: "open",
    RESOLVED: "resolved",
    BOT: "bot",
  };

  const currentChat = mockCurrentChat; // Replace with actual data fetching logic

  const isOpen = status === STATUS_TYPE.OPEN;
  const isBot = status === STATUS_TYPE.BOT;
  const isResolved = status === STATUS_TYPE.RESOLVED;

  const buttonClass = isBot
    ? "primary"
    : isOpen
    ? "success"
    : isResolved
    ? "warning"
    : "";

  const toggleStatus = (newStatus: string) => {
    setShowDropdown(false);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Status changed to ${newStatus}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="resolve-actions">
      <div className="button-group">
        {isOpen && (
          <WootButton
            classNames="resolve"
            colorScheme="success"
            icon="ion-checkmark"
            emoji="✅"
            isLoading={isLoading}
            onClick={() => toggleStatus(STATUS_TYPE.RESOLVED)}
          >
            Resolve
          </WootButton>
        )}
        {isResolved && (
          <WootButton
            classNames="resolve"
            colorScheme="warning"
            icon="ion-refresh"
            emoji="👀"
            isLoading={isLoading}
            onClick={() => toggleStatus(STATUS_TYPE.OPEN)}
          >
            Reopen
          </WootButton>
        )}
        {isBot && (
          <WootButton
            classNames="resolve"
            colorScheme="primary"
            icon="ion-person"
            isLoading={isLoading}
            onClick={() => toggleStatus(STATUS_TYPE.OPEN)}
          >
            Open
          </WootButton>
        )}
        {showDropdown && (
          <DropdownMenu>
            {!isBot && (
              <DropdownItem>
                <WootButton
                  variant="clear"
                  onClick={() => toggleStatus(STATUS_TYPE.BOT)}
                >
                  Open Bot
                </WootButton>
              </DropdownItem>
            )}
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default ResolveAction;
