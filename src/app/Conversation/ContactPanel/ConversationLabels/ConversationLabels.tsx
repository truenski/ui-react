import React, { useEffect, useState } from "react";
import onClickOutside from "react-onclickoutside";
import styles from "./index.module.scss";
import AddLabel from "./AddLabel/AddLabel";
import LabelDropdown from "./LabelDropdown/LabelDropdown";
import ContactDetailsItem from "../ContactDetailsItem/ContactDetailsItem";
import Spinner from "@/app/Conversation/Spinner.tsx";

interface ConversationLabelsProps {
  conversationId: number;
}

const mockAccountLabels = [
  { id: 1, title: "Urgent", color: "#FF0000" },
  { id: 2, title: "Follow Up", color: "#00FF00" },
  { id: 3, title: "Important", color: "#0000FF" },
];

const mockSavedLabels = ["Urgent", "Follow Up"];

const ConversationLabels: React.FC<ConversationLabelsProps> = ({
  conversationId,
}) => {
  const [showSearchDropdownLabel, setShowSearchDropdownLabel] = useState(false);
  const [accountLabels, setAccountLabels] = useState(mockAccountLabels);
  const [savedLabels, setSavedLabels] = useState(mockSavedLabels);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchLabels(conversationId);
  }, [conversationId]);

  const fetchLabels = async (conversationId) => {
    if (!conversationId) {
      return;
    }
    setIsFetching(true);
    // Simulate fetching data
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  const onUpdateLabels = async (selectedLabels) => {
    try {
      // Simulate updating labels
      setSavedLabels(selectedLabels);
    } catch (error) {
      // Ignore error
    }
  };

  const toggleLabels = () => {
    setShowSearchDropdownLabel(!showSearchDropdownLabel);
  };

  const addItem = (value) => {
    const result = activeLabels.map((item) => item.title);
    result.push(value.title);
    onUpdateLabels(result);
  };

  const removeItem = (value) => {
    const result = activeLabels
      .map((label) => label.title)
      .filter((label) => label !== value);
    onUpdateLabels(result);
  };

  const closeDropdownLabel = () => {
    setShowSearchDropdownLabel(false);
  };

  const activeLabels = accountLabels.filter(({ title }) =>
    savedLabels.includes(title)
  );

  ConversationLabels.handleClickOutside = () => closeDropdownLabel();

  return (
    <div className={styles.sidebarLabelsWrap}>
      {!isFetching ? (
        <div className={styles.contactConversationList}>
          <ContactDetailsItem title="Labels" icon="ion-pricetags" emoji="🏷️" />
          <div className={styles.labelWrap}>
            <AddLabel onAdd={toggleLabels} />
            {activeLabels.map((label) => (
              <div key={label.id} className={styles.label}>
                <span
                  className={styles.labelTitle}
                  style={{ backgroundColor: label.color }}
                >
                  {label.title}
                </span>
                <button
                  className={styles.labelClose}
                  onClick={() => removeItem(label.title)}
                >
                  &times;
                </button>
              </div>
            ))}
            <div className={styles.dropdownWrap}>
              {showSearchDropdownLabel && (
                <div
                  className={`${styles.dropdownPane} ${styles.dropdownPaneOpen}`}
                >
                  <LabelDropdown
                    accountLabels={accountLabels}
                    selectedLabels={savedLabels}
                    onAdd={addItem}
                    onRemove={removeItem}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => ConversationLabels.handleClickOutside,
};

export default onClickOutside(ConversationLabels, clickOutsideConfig);
