import React, { useState } from "react";
import SocialIcons from "./SocialIcons/SocialIcons";
import ContactInfoRow from "./ContactInfoRow/ContactInfoRow";
import EditContact from "./EditContact/EditContact";
import NewConversation from "./NewConversation/NewConversation";
import styles from "./index.module.scss";
import Thumbnail from "@/app/containers/Thumbnail/Thumbnail";

interface ContactInfoProps {
  contact: any;
  showNewMessage?: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  contact,
  showNewMessage = false,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);

  const additionalAttributes = contact.additional_attributes || {};
  const socialProfiles = {
    twitter: additionalAttributes.screen_name,
    ...(additionalAttributes.social_profiles || {}),
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleConversationModal = () => {
    setShowConversationModal(!showConversationModal);
  };

  return (
    <div className={styles.contactProfile}>
      <div className={styles.contactInfo}>
        <Thumbnail
          src={contact.thumbnail}
          size="56px"
          username={contact.name}
          badge={contact.channel}
          hasBorder={false}
          status={contact.availability_status}
        />
        <div className={styles.contactDetails}>
          <h3 className={`${styles.subBlockTitle} ${styles.contactName}`}>
            {contact.name}
          </h3>
          {additionalAttributes.description && (
            <p className={styles.contactBio}>
              {additionalAttributes.description}
            </p>
          )}
          <SocialIcons socialProfiles={socialProfiles} />
          <div className={styles.contactMetadata}>
            <ContactInfoRow
              href={contact.email ? `mailto:${contact.email}` : ""}
              value={contact.email}
              icon="ion-email"
              emoji="✉️"
              showCopy
            />
            <ContactInfoRow
              href={contact.phone_number ? `tel:${contact.phone_number}` : ""}
              value={contact.phone_number}
              icon="ion-ios-telephone"
              emoji="📞"
            />
            {additionalAttributes.location && (
              <ContactInfoRow
                value={additionalAttributes.location}
                icon="ion-map"
                emoji="🌍"
              />
            )}
            <ContactInfoRow
              value={additionalAttributes.company_name}
              icon="ion-briefcase"
              emoji="🏢"
            />
          </div>
        </div>
        {!showNewMessage ? (
          <button className={styles.editContact} onClick={toggleEditModal}>
            Edit Contact
          </button>
        ) : (
          <div className={styles.contactActions}>
            <button
              className={styles.newMessage}
              onClick={toggleConversationModal}
            >
              New Message
            </button>
            <button className={styles.smoothButton} onClick={toggleEditModal}>
              Edit Contact
            </button>
          </div>
        )}
        {showEditModal && (
          <EditContact
            show={showEditModal}
            contact={contact}
            onCancel={toggleEditModal}
          />
        )}
        {showConversationModal && (
          <NewConversation
            show={showConversationModal}
            contact={contact}
            onCancel={toggleConversationModal}
          />
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
