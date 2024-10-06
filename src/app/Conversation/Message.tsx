import React from "react";
import BubbleText from "./BubbleText";
import BubbleActions from "./BubbleActions";
import Spinner from "./Spinner";
import { mockSender } from "./mockData.ts";

const Message = ({ data, isATweet }) => {
  const hasAttachments = data.attachments && data.attachments.length > 0;
  const isPending = data.status === "progress";
  const isIncoming = data.message_type === "incoming";
  const sender = mockSender;

  return (
    <li className={`message ${data.alignBubble}`}>
      <div className={data.wrapClass}>
        <div className={data.bubbleClass}>
          {data.content && (
            <BubbleText
              message={data.content}
              isEmail={data.isEmailContentType}
              readableTime={data.readableTime}
            />
          )}
          {isPending && hasAttachments && (
            <span className="chat-bubble has-attachment agent">
              {`Uploading attachments`}
            </span>
          )}
          {!isPending && hasAttachments && (
            <div>
              {data.attachments.map((attachment) => (
                <div key={attachment.id}>{/* Render attachment */}</div>
              ))}
            </div>
          )}
          <BubbleActions
            id={data.id}
            sender={data.sender}
            isATweet={isATweet}
            isEmail={data.isEmailContentType}
            isPrivate={data.private}
            messageType={data.message_type}
            readableTime={data.readableTime}
            sourceId={data.source_id}
          />
        </div>
        {isPending && <Spinner size="tiny" />}
        {isATweet && isIncoming && sender && (
          <a
            className="sender--info"
            href={`https://twitter.com/${sender.screen_name}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <img
              src={sender.thumbnail}
              alt={sender.name}
              className="user-thumbnail"
            />
            <div className="sender--available-name">{sender.name}</div>
          </a>
        )}
      </div>
    </li>
  );
};

export default Message;
