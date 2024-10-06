import React, { useState } from "react";
import ResolveAction from "./ResolveAction/ResolverAction";
import WootButton from "../../ReplyBox/WootButton";
import DropdownMenu from "./WootDropdown/WootDropdownMenu";
import DropdownItem from "./WootDropdown/WootDropdownItem";
import EmailTranscriptModal from "./EmailTranscriptModal/EmailTranscriptModal";
import { TCurrentChat } from "../../mockData.ts";

interface MoreActionsProps {
  currentChat: TCurrentChat;
}

const MoreActions: React.FC<MoreActionsProps> = ({ currentChat }) => {
  const [showConversationActions, setShowConversationActions] = useState(false);
  const [showEmailActionsModal, setShowEmailActionsModal] = useState(false);

  const toggleEmailActionsModal = () => {
    setShowEmailActionsModal(!showEmailActionsModal);
    setShowConversationActions(false);
  };

  const toggleConversationActions = () => {
    setShowConversationActions(!showConversationActions);
  };

  const hideConversationActions = () => {
    setShowConversationActions(false);
  };

  const mute = () => {
    alert("Muted successfully");
    toggleConversationActions();
  };

  const unmute = () => {
    alert("Unmuted successfully");
    toggleConversationActions();
  };

  return (
    <div className="flex-container actions--container">
      <ResolveAction
        conversationId={currentChat.id}
        status={currentChat.status}
      />
      <WootButton
        classNames="more--button"
        variant="clear"
        size="large"
        colorScheme="secondary"
        icon="ion-android-more-vertical"
        onClick={toggleConversationActions}
      />
      {showConversationActions && (
        <div
          className={`dropdown-pane dropdown--bottom ${
            showConversationActions ? "dropdown-pane--open" : ""
          }`}
        >
          <DropdownMenu>
            {!currentChat.muted ? (
              <DropdownItem>
                <button className="button clear alert" onClick={mute}>
                  <span>Mute Contact</span>
                </button>
              </DropdownItem>
            ) : (
              <DropdownItem>
                <button className="button clear alert" onClick={unmute}>
                  <span>Unmute Contact</span>
                </button>
              </DropdownItem>
            )}
            <DropdownItem>
              <button
                className="button clear"
                onClick={toggleEmailActionsModal}
              >
                Send Transcript
              </button>
            </DropdownItem>
          </DropdownMenu>
        </div>
      )}
      {showEmailActionsModal && (
        <EmailTranscriptModal
          show={showEmailActionsModal}
          currentChat={currentChat}
          onCancel={toggleEmailActionsModal}
        />
      )}
    </div>
  );
};

export default MoreActions;
