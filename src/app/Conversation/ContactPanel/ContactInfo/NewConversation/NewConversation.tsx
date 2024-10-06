import React from "react";
import styles from "./index.module.scss";
import Modal from "../EditContact/Modal/Modal";
import ModalHeader from "../EditContact/Modal/ModalHeader";
import ConversationForm from "./ConversationForm/ConversationForm";

interface NewConversationProps {
  show: boolean;
  contact: any;
  onCancel: () => void;
}

const NewConversation: React.FC<NewConversationProps> = ({
  show,
  contact,
  onCancel,
}) => {
  const onSubmit = async (contactItem) => {
    // Mock API call
    console.log("Creating conversation with:", contactItem);
  };

  return (
    <Modal show={show} onClose={onCancel}>
      <div className={`column ${styles.contentBox}`}>
        <ModalHeader
          headerTitle="New Conversation"
          headerContent="Start a new conversation with the contact."
        />
        <ConversationForm
          contact={contact}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </Modal>
  );
};

export default NewConversation;
