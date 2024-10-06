import React from "react";
import styles from "./index.module.scss";
import ContactDetailsItem from "../ContactDetailsItem/ContactDetailsItem";

interface ContactCustomAttributesProps {
  customAttributes: Record<string, any>;
}

const ContactCustomAttributes: React.FC<ContactCustomAttributesProps> = ({
  customAttributes,
}) => {
  const listOfAttributes = Object.keys(customAttributes).filter((key) => {
    const value = customAttributes[key];
    return value !== null && value !== undefined && value !== "";
  });

  return (
    <div className={styles.customAttributesPanel}>
      <ContactDetailsItem
        title="Custom Attributes"
        icon="ion-code"
        emoji="📕"
      />
      {listOfAttributes.map((attribute) => (
        <div key={attribute} className={styles.customAttributeRow}>
          <div className={styles.customAttributeRowAttribute}>{attribute}</div>
          <div>{customAttributes[attribute]}</div>
        </div>
      ))}
    </div>
  );
};

export default ContactCustomAttributes;
