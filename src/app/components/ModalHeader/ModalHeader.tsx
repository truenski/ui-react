// components/ModalHeader.js
import React from "react";
import PropTypes from "prop-types";

const ModalHeader = ({ headerTitle, headerContent, headerImage, children }) => {
  return (
    <div className="column page-top-bar">
      {headerImage && <img src={headerImage} alt="No image" />}
      <h2 className="page-sub-title">{headerTitle}</h2>
      {headerContent && <p className="small-12 column">{headerContent}</p>}
      {children}
    </div>
  );
};

ModalHeader.propTypes = {
  headerTitle: PropTypes.string,
  headerContent: PropTypes.string,
  headerImage: PropTypes.string,
  children: PropTypes.node,
};

ModalHeader.defaultProps = {
  headerTitle: "",
  headerContent: "",
  headerImage: "",
};

export default ModalHeader;
