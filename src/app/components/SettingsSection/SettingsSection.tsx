// components/SettingsSection.js
import React from "react";
import PropTypes from "prop-types";

const SettingsSection = ({ title, subTitle, children }) => {
  return (
    <div className="row settings--section">
      <div className="medium-4 small-12 title--section">
        <p className="sub-block-title">{title}</p>
        <p className="sub-head">{subTitle}</p>
      </div>
      <div className="medium-6 small-12">{children}</div>
    </div>
  );
};

SettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default SettingsSection;
