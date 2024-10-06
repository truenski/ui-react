import React from "react";
import { MESSAGE_TYPE } from "shared/constants/messages";
import { BUS_EVENTS } from "shared/constants/busEvents";

const BubbleActions = ({
  sender,
  readableTime,
  isEmail,
  isPrivate,
  isATweet,
  messageType,
  sourceId,
  id,
}) => {
  const isIncoming = MESSAGE_TYPE.INCOMING === messageType;
  const screenName = sender?.additional_attributes?.screen_name || "";
  const linkToTweet = `https://twitter.com/${screenName}/status/${sourceId}`;

  const onTweetReply = () => {
    bus.$emit(BUS_EVENTS.SET_TWEET_REPLY, id);
  };

  return (
    <div className="message-text--metadata">
      <span className="time">{readableTime}</span>
      {isEmail && (
        <i className="ion ion-android-mail" title="Received via email" />
      )}
      {isPrivate && (
        <i className="icon ion-android-lock" title="Visible to agents" />
      )}
      {isATweet && isIncoming && (
        <>
          <i
            className="icon ion-reply cursor-pointer"
            title="Reply to tweet"
            onClick={onTweetReply}
          />
          <a
            href={linkToTweet}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <i
              className="icon ion-android-open cursor-pointer"
              title="View tweet in Twitter"
            />
          </a>
        </>
      )}
    </div>
  );
};

export default BubbleActions;
