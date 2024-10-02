// components/Snackbar.js
import React from "react";
import "./snackbar.module.scss";
import PropTypes from "prop-types";

const Snackbar = ({ message }) => {
  return (
    <div className="ui-snackbar">
      <div className="ui-snackbar-text">{message}</div>
    </div>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Snackbar;
