import React from "react";
import Modal from "./Modal/Modal";
import ModalHeader from "./Modal/ModalHeader";
import ContactForm from "./ContactForm/ContactForm";
import styles from "./index.module.scss";

interface EditContactProps {
  show: boolean;
  contact: any;
  onCancel: () => void;
}

const EditContact: React.FC<EditContactProps> = ({
  show,
  contact,
  onCancel,
}) => {
  const onSubmit = async (contactItem) => {
    // Mock API call
    console.log("Updating contact with:", contactItem);
  };

  const onSuccess = () => {
    onCancel();
  };

  return (
    <Modal show={show} onClose={onCancel} modalType="right-aligned">
      <div className={`column ${styles.contentBox}`}>
        <ModalHeader
          headerTitle={`Edit Contact - ${contact.name || contact.email}`}
          headerContent="Edit the contact details."
        />
        <ContactForm
          contact={contact}
          inProgress={false} // Mock in-progress state
          onSubmit={onSubmit}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
    </Modal>
  );
};

export default EditContact;
