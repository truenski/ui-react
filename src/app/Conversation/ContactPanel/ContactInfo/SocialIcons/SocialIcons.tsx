import React from "react";
import styles from "./index.module.scss";

interface SocialIconsProps {
  socialProfiles: Record<string, string>;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ socialProfiles }) => {
  const socialMediaLinks = [
    { key: "facebook", icon: "facebook", link: "https://facebook.com/" },
    { key: "twitter", icon: "twitter", link: "https://twitter.com/" },
    { key: "linkedin", icon: "linkedin", link: "https://linkedin.com/" },
    { key: "github", icon: "github", link: "https://github.com/" },
  ];

  const availableProfiles = socialMediaLinks.filter(
    (mediaLink) => !!socialProfiles[mediaLink.key]
  );

  return (
    <div className={styles.socialIcons}>
      {availableProfiles.map((profile) => (
        <a
          key={profile.key}
          href={`${profile.link}${socialProfiles[profile.key]}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.contactSocialIcon}
        >
          <i className={`ion-social-${profile.icon}`} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
