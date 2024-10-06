import React, { useEffect, useState } from "react";
import styles from "./ContactPanel.module.scss";
import ContactInfo from "./ContactInfo/ContactInfo";
import ContactDetailsItem from "./ContactDetailsItem/ContactDetailsItem";
import AvailabilityStatusBadge from "../ConversationHeader/MoreActions/AvailabilityStatusBadge/AvailabilityStatusBadge";
import ContactCustomAttributes from "./ContactCustomAttributes/ContactCustomAttributes";
import ContactConversations from "./ContactConversations/ContactConversations";
import ConversationLabels from "./ConversationLabels/ConversationLabels";
import Multiselect from "./MultiSelect/MultiSelect";
import {
  mockCurrentChat,
  mockContacts,
  mockAgentsList,
  mockTeamsList,
  mockUIFlags,
} from "@/app/Conversation/mockData"; // Import mock data

interface ContactPanelProps {
  conversationId: number | string;
  inboxId?: number;
  onToggle: () => void;
}

const ContactPanel: React.FC<ContactPanelProps> = ({
  conversationId,
  inboxId,
  onToggle,
}) => {
  const [assignedAgent, setAssignedAgent] = useState(null);
  const [assignedTeam, setAssignedTeam] = useState(null);
  const [currentChat, setCurrentChat] = useState(mockCurrentChat);
  const [contact, setContact] = useState(mockContacts[101]);
  const [agents, setAgents] = useState(mockAgentsList);
  const [teams, setTeams] = useState(mockTeamsList);
  const [currentUser, setCurrentUser] = useState(mockAgentsList[0]);
  const [uiFlags, setUIFlags] = useState(mockUIFlags);

  useEffect(() => {
    if (contact?.id) {
      // Simulate fetching contact data
      setTimeout(() => {
        setContact(mockContacts[contact.id]);
      }, 1000);
    }
  }, [contact?.id]);

  const handleSelfAssign = () => {
    setAssignedAgent(currentUser);
    setCurrentChat((prevChat) => ({
      ...prevChat,
      meta: { ...prevChat.meta, assignee: currentUser },
    }));
  };

  const handleAgentChange = (agent) => {
    setAssignedAgent(agent);
    setCurrentChat((prevChat) => ({
      ...prevChat,
      meta: { ...prevChat.meta, assignee: agent },
    }));
  };

  const handleTeamChange = (team) => {
    setAssignedTeam(team);
    setCurrentChat((prevChat) => ({
      ...prevChat,
      meta: { ...prevChat.meta, team },
    }));
  };

  const additionalAttributes = currentChat.additional_attributes || {};
  const browser = additionalAttributes.browser || {};
  const referer = additionalAttributes.referer;
  const initiatedAt = additionalAttributes.initiated_at;
  const browserName = `${browser.browser_name || ""} ${
    browser.browser_version || ""
  }`;
  const platformName = `${browser.platform_name || ""} ${
    browser.platform_version || ""
  }`;
  const contactAdditionalAttributes = contact.additional_attributes || {};
  const ipAddress = contactAdditionalAttributes.created_at_ip;
  const location = `${contactAdditionalAttributes.city || ""}, ${
    contactAdditionalAttributes.country || ""
  }`;

  return (
    <div className={`medium-3 bg-white ${styles.contactPanel}`}>
      <span className={styles.closeButton} onClick={onToggle}>
        <i className="ion-chevron-right" />
      </span>
      <ContactInfo contact={contact} channelType={currentChat.meta?.channel} />
      <div className={styles.conversationActions}>
        <div className={styles.multiselectWrapSmall}>
          <ContactDetailsItem title="Assignee" icon="ion-headphone" emoji="🧑‍🚀">
            {(!assignedAgent || assignedAgent.id !== currentUser.id) && (
              <button className="button-content" onClick={handleSelfAssign}>
                Self Assign
              </button>
            )}
          </ContactDetailsItem>
          <Multiselect
            data={agents}
            value={assignedAgent}
            textField="name"
            valueField="id"
            onChange={handleAgentChange}
            placeholder="Select an agent"
            itemComponent={({ item }) => (
              <div className={styles.optionDesc}>
                <AvailabilityStatusBadge status={item.availability_status} />
                <span className={styles.optionTitle}>{item.name}</span>
              </div>
            )}
          />
        </div>
        <div className={styles.multiselectWrapSmall}>
          <ContactDetailsItem title="Team" icon="ion-ios-people" emoji="🎢" />
          <Multiselect
            data={teams}
            value={assignedTeam}
            textField="name"
            valueField="id"
            onChange={handleTeamChange}
            placeholder="Select a team"
          />
        </div>
      </div>
      <ConversationLabels conversationId={conversationId} />
      {browser.browser_name && (
        <div className={styles.conversationDetails}>
          {location && (
            <ContactDetailsItem
              title="Location"
              value={location}
              icon="ion-map"
              emoji="📍"
            />
          )}
          {ipAddress && (
            <ContactDetailsItem
              title="IP Address"
              value={ipAddress}
              icon="ion-android-locate"
              emoji="🧭"
            />
          )}
          {browserName && (
            <ContactDetailsItem
              title="Browser"
              value={browserName}
              icon="ion-ios-world-outline"
              emoji="🌐"
            />
          )}
          {platformName && (
            <ContactDetailsItem
              title="OS"
              value={platformName}
              icon="ion-laptop"
              emoji="💻"
            />
          )}
          {referer && (
            <ContactDetailsItem
              title="Initiated From"
              value={referer}
              icon="ion-link"
              emoji="🔗"
            >
              <a
                href={referer}
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                {referer}
              </a>
            </ContactDetailsItem>
          )}
          {initiatedAt && (
            <ContactDetailsItem
              title="Initiated At"
              value={initiatedAt.timestamp}
              icon="ion-clock"
              emoji="🕰"
            />
          )}
        </div>
      )}
      {contact.custom_attributes && (
        <ContactCustomAttributes customAttributes={contact.custom_attributes} />
      )}
      {contact.id && (
        <ContactConversations
          contactId={contact.id}
          conversationId={conversationId}
        />
      )}
    </div>
  );
};

export default ContactPanel;
