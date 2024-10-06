import React from "react";
import EmojiOrIcon from "./EmojiOrIcon";
import { REPLY_EDITOR_MODES, CHAR_LENGTH_WARNING } from "../constants/index.js";
import "../style/ReplyTopPanel.scss";

interface ReplyTopPanelProps {
  mode: string;
  setReplyMode: (mode: string) => void;
  isMessageLengthReachingThreshold?: boolean;
  charactersRemaining?: number;
}

const ReplyTopPanel: React.FC<ReplyTopPanelProps> = ({
  mode,
  setReplyMode,
  isMessageLengthReachingThreshold = false,
  charactersRemaining = 0,
}) => {
  const replyButtonClass = mode === REPLY_EDITOR_MODES.REPLY ? "is-active" : "";
  const noteButtonClass = mode === REPLY_EDITOR_MODES.NOTE ? "is-active" : "";
  const charLengthClass =
    charactersRemaining < 0 ? "message-error" : "message-length";
  const characterLengthWarning =
    charactersRemaining < 0
      ? `${-charactersRemaining} ${CHAR_LENGTH_WARNING.NEGATIVE}`
      : `${charactersRemaining} ${CHAR_LENGTH_WARNING.UNDER_50}`;

  return (
    <div className="top-box">
      <div className="mode-wrap button-group">
        <button
          className={`button clear button--reply ${replyButtonClass}`}
          onClick={() => setReplyMode(REPLY_EDITOR_MODES.REPLY)}
        >
          <EmojiOrIcon icon="" emoji="💬" />
          Reply
        </button>
        <button
          className={`button clear button--note ${noteButtonClass}`}
          onClick={() => setReplyMode(REPLY_EDITOR_MODES.NOTE)}
        >
          <EmojiOrIcon icon="" emoji="📝" />
          Private Note
        </button>
      </div>
      <div className="action-wrap">
        {isMessageLengthReachingThreshold && (
          <div className="tabs-title">
            <span className={charLengthClass}>{characterLengthWarning}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyTopPanel;
