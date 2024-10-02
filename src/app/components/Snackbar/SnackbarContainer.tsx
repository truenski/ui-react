// components/SnackbarContainer.js
import React, { useState, useEffect } from "react";
import Snackbar from "./Snackbar";

const SnackbarContainer = ({ duration = 2500 }) => {
  const [snackMessages, setSnackMessages] = useState([]);

  useEffect(() => {
    const handleNewToastMessage = (message) => {
      setSnackMessages((prevMessages) => [
        ...prevMessages,
        { key: new Date().getTime(), message },
      ]);

      setTimeout(() => {
        setSnackMessages((prevMessages) => prevMessages.slice(1));
      }, duration);
    };

    // Simulando o bus.$on('newToastMessage', message => { ... })
    window.addEventListener("newToastMessage", (event) =>
      handleNewToastMessage(event.detail)
    );

    return () => {
      window.removeEventListener("newToastMessage", (event) =>
        handleNewToastMessage(event.detail)
      );
    };
  }, [duration]);

  return (
    <div className="ui-snackbar-container">
      {snackMessages.map((snackMessage) => (
        <Snackbar key={snackMessage.key} message={snackMessage.message} />
      ))}
    </div>
  );
};

export default SnackbarContainer;
