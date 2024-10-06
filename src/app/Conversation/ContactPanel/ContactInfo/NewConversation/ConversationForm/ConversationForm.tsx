import React, { useState } from "react";
import styles from "./index.module.scss";
import Thumbnail from "@/app/containers/Thumbnail/Thumbnail";

interface ConversationFormProps {
  contact: any;
  onSubmit: (contactItem: any) => void;
  onCancel: () => void;
}

const ConversationForm: React.FC<ConversationFormProps> = ({
  contact,
  onSubmit,
  onCancel,
}) => {
  const [message, setMessage] = useState("");
  const [selectedInbox, setSelectedInbox] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inboxes = contact.contactableInboxes || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !selectedInbox) {
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        inboxId: selectedInbox.inbox.id,
        sourceId: selectedInbox.source_id,
        contactId: contact.id,
        message: { content: message },
      };
      await onSubmit(payload);
      onCancel();
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.conversationForm} onSubmit={handleSubmit}>
      {inboxes.length === 0 ? (
        <div className="callout warning">
          <p>No inbox available</p>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="columns">
              <label className={selectedInbox ? "" : styles.error}>
                Inbox
                <select
                  value={selectedInbox}
                  onChange={(e) => setSelectedInbox(e.target.value)}
                >
                  <option value="">Select an inbox</option>
                  {inboxes.map((contactableInbox) => (
                    <option
                      key={contactableInbox.inbox.id}
                      value={contactableInbox}
                    >
                      {contactableInbox.inbox.name}
                    </option>
                  ))}
                </select>
                {!selectedInbox && (
                  <span className={styles.message}>Inbox is required</span>
                )}
              </label>
            </div>
            <div className="columns">
              <label>
                To
                <div className={styles.contactInput}>
                  <Thumbnail
                    src={contact.thumbnail}
                    size="24px"
                    username={contact.name}
                    status={contact.availability_status}
                  />
                  <h4 className={`text-block-title ${styles.contactName}`}>
                    {contact.name}
                  </h4>
                </div>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="columns">
              <label className={message ? "" : styles.error}>
                Message
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.messageInput}
                  placeholder="Enter your message"
                />
                {!message && (
                  <span className={styles.message}>Message is required</span>
                )}
              </label>
            </div>
          </div>
        </>
      )}
      <div className={styles.modalFooter}>
        <button className="button clear" onClick={onCancel} type="button">
          Cancel
        </button>
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ConversationForm;
