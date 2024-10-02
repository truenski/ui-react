// components/ChatFilter.js
import React, { useState } from "react";
import constants from "@/dashboard/constants";
import { ChatFilterProps } from "./ChatFilter.types";

const ChatFilter = ({ onStatusFilterChange }: ChatFilterProps) => {
  const [activeStatus, setActiveStatus] = useState(constants.STATUS_TYPE.OPEN);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setActiveStatus(newStatus);
    onStatusFilterChange(newStatus);
  };

  const statusItems = [
    { VALUE: "open", TEXT: "Open" },
    { VALUE: "resolved", TEXT: "Resolved" },
    { VALUE: "bot", TEXT: "Bot" },
    // Adicione outros status conforme necessário
  ];

  return (
    <select
      value={activeStatus}
      className="status--filter"
      onChange={handleChange}
    >
      {statusItems.map((item) => (
        <option key={item.VALUE} value={item.VALUE}>
          {item.TEXT}
        </option>
      ))}
    </select>
  );
};

export default ChatFilter;
