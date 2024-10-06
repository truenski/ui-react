import React, { useState } from "react";
import { ModalHeader, Modal } from "../WootModal/WootModal";
import FormSubmitButton from "../Form/SubmitButton";

// Mock translation function
const useTranslation = () => {
  return {
    t: (key: string) => key,
  };
};

// Mock sendEmailTranscript function
const sendEmailTranscript = async ({
  email,
  conversationId,
}: {
  email: string;
  conversationId: number;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && conversationId) {
        resolve("Email sent successfully");
      } else {
        reject("Failed to send email");
      }
    }, 1000);
  });
};

interface EmailTranscriptModalProps {
  show: boolean;
  currentChat: {
    id: number;
    meta: {
      sender: {
        email: string;
      };
      assignee: {
        email: string;
      };
    };
  }; // Define a proper type for currentChat
  onCancel: () => void;
}

const EmailTranscriptModal: React.FC<EmailTranscriptModalProps> = ({
  show,
  currentChat,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sentToOtherEmailAddress = selectedType === "other_email_address";

  const isFormValid =
    selectedType &&
    (!sentToOtherEmailAddress || (email && email.includes("@")));

  const selectedEmailAddress = () => {
    const { meta } = currentChat;
    switch (selectedType) {
      case "contact":
        return meta.sender.email;
      case "assignee":
        return meta.assignee.email;
      case "other_email_address":
        return email;
      default:
        return "";
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await sendEmailTranscript({
        email: selectedEmailAddress(),
        conversationId: currentChat.id,
      });
      alert(t("EMAIL_TRANSCRIPT.SEND_EMAIL_SUCCESS"));
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      alert(t("EMAIL_TRANSCRIPT.SEND_EMAIL_ERROR"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onClose={onCancel}>
      <div className="column content-box">
        <ModalHeader
          headerTitle={t("EMAIL_TRANSCRIPT.TITLE")}
          headerContent={t("EMAIL_TRANSCRIPT.DESC")}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="medium-12 columns">
            {currentChat.meta.sender?.email && (
              <div>
                <input
                  id="contact"
                  type="radio"
                  name="selectedType"
                  value="contact"
                  checked={selectedType === "contact"}
                  onChange={() => setSelectedType("contact")}
                />
                <label htmlFor="contact">
                  {t("EMAIL_TRANSCRIPT.FORM.SEND_TO_CONTACT")}
                </label>
              </div>
            )}
            {currentChat.meta.assignee && (
              <div>
                <input
                  id="assignee"
                  type="radio"
                  name="selectedType"
                  value="assignee"
                  checked={selectedType === "assignee"}
                  onChange={() => setSelectedType("assignee")}
                />
                <label htmlFor="assignee">
                  {t("EMAIL_TRANSCRIPT.FORM.SEND_TO_AGENT")}
                </label>
              </div>
            )}
            <div>
              <input
                id="other_email_address"
                type="radio"
                name="selectedType"
                value="other_email_address"
                checked={selectedType === "other_email_address"}
                onChange={() => setSelectedType("other_email_address")}
              />
              <label htmlFor="other_email_address">
                {t("EMAIL_TRANSCRIPT.FORM.SEND_TO_OTHER_EMAIL_ADDRESS")}
              </label>
            </div>
            {sentToOtherEmailAddress && (
              <div className="medium-6 columns">
                <label className={email.includes("@") ? "" : "error"}>
                  <input
                    type="text"
                    value={email}
                    placeholder={t("EMAIL_TRANSCRIPT.FORM.EMAIL.PLACEHOLDER")}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!email.includes("@") && (
                    <span className="message">
                      {t("EMAIL_TRANSCRIPT.FORM.EMAIL.ERROR")}
                    </span>
                  )}
                </label>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <div className="medium-12 row">
              <FormSubmitButton
                buttonText={t("EMAIL_TRANSCRIPT.SUBMIT")}
                disabled={!isFormValid || isSubmitting}
                loading={isSubmitting}
              />
              <button className="button clear" onClick={onCancel}>
                {t("EMAIL_TRANSCRIPT.CANCEL")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EmailTranscriptModal;
