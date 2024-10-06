import React from "react";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import "./SearchMessageItem.module.scss";
interface SearchMessageItemProps {
  userName: string;
  timestamp: number;
  messageType: number;
  content: string;
  searchTerm: string;
}

const SearchMessageItem: React.FC<SearchMessageItemProps> = ({
  userName,
  timestamp,
  messageType,
  content,
  searchTerm,
}) => {
  const isOutgoingMessage = messageType === 1; // Assuming 1 represents outgoing messages
  const readableTime = timestamp
    ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true })
    : "";

  const prepareContent = (content: string) => {
    const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    return plainTextContent.replace(
      new RegExp(`(${searchTerm})`, "ig"),
      '<span class="searchkey--highlight">$1</span>'
    );
  };

  return (
    <div className="message-item">
      <div className="search-message">
        <div className="user-wrap">
          <div className="name-wrap">
            <span className="text-block-title">{userName}</span>
            <div>{isOutgoingMessage && <i className="ion-headphone" />}</div>
          </div>
          <span className="timestamp">{readableTime}</span>
        </div>
        <p
          className="message-content"
          dangerouslySetInnerHTML={{ __html: prepareContent(content) }}
        ></p>
      </div>
    </div>
  );
};

export default SearchMessageItem;
