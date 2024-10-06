import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface ContactFormProps {
  contact: any;
  inProgress: boolean;
  onSubmit: (contactItem: any) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  inProgress,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [socialProfileUserNames, setSocialProfileUserNames] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  const socialProfileKeys = [
    { key: "facebook", prefixURL: "https://facebook.com/" },
    { key: "twitter", prefixURL: "https://twitter.com/" },
    { key: "linkedin", prefixURL: "https://linkedin.com/" },
  ];

  useEffect(() => {
    setContactObject();
  }, [contact]);

  const setContactObject = () => {
    const { email, phone_number: phoneNumber, name } = contact;
    const additionalAttributes = contact.additional_attributes || {};

    setName(name || "");
    setEmail(email || "");
    setPhoneNumber(phoneNumber || "");
    setCompanyName(additionalAttributes.company_name || "");
    setDescription(additionalAttributes.description || "");
    const {
      social_profiles: socialProfiles = {},
      screen_name: twitterScreenName,
    } = additionalAttributes;
    setSocialProfileUserNames({
      twitter: socialProfiles.twitter || twitterScreenName || "",
      facebook: socialProfiles.facebook || "",
      linkedin: socialProfiles.linkedin || "",
    });
  };

  const getContactObject = () => {
    return {
      id: contact.id,
      name,
      email,
      phone_number: phoneNumber,
      additional_attributes: {
        ...contact.additional_attributes,
        description,
        company_name: companyName,
        social_profiles: socialProfileUserNames,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(getContactObject());
      onCancel();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className="row">
        <div className="columns">
          <label className={styles.error}>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </label>

          <label className={styles.error}>
            Email Address
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter email address"
            />
          </label>
        </div>
      </div>
      <div className="medium-12 columns">
        <label className={styles.error}>
          Bio
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter bio"
          />
        </label>
      </div>
      <div className="row">
        <div className="medium-12 columns">
          <label className={styles.error}>
            Phone Number
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="Enter phone number"
            />
            <span className={styles.message}>
              {phoneNumber ? "" : "Phone number is required"}
            </span>
          </label>
          <div className={`${styles.callout} small warning`}>
            Phone number is required
          </div>
        </div>
      </div>
      <div className="columns">
        <label>
          Company Name
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            placeholder="Enter company name"
          />
        </label>
      </div>
      <div className="medium-12 columns">
        <label>Social Profiles</label>
        {socialProfileKeys.map((socialProfile) => (
          <div key={socialProfile.key} className="input-group">
            <span className="input-group-label">{socialProfile.prefixURL}</span>
            <input
              value={socialProfileUserNames[socialProfile.key]}
              onChange={(e) =>
                setSocialProfileUserNames({
                  ...socialProfileUserNames,
                  [socialProfile.key]: e.target.value,
                })
              }
              className="input-group-field"
              type="text"
            />
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <div className="medium-12 columns">
          <button type="submit" className="button" disabled={inProgress}>
            Submit
          </button>
          <button className="button clear" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
