import React, { useState } from "react";
import EmojiInput from "./EmojiInput";
import CannedResponse from "./CannedResponse";
import ResizableTextArea from "./ResizableTextArea";
import AttachmentPreview from "./AttachmentPreview";
import ReplyTopPanel from "./ReplyTopPanel";
import ReplyBottomPanel from "./ReplyBottomPanel";
import { REPLY_EDITOR_MODES } from "../constants/index.js";
import "../style/ReplyBox.scss";

interface ReplyBoxProps {
  conversationId: string | number;
  inReplyTo?: string | number;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ conversationId, inReplyTo }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [replyType, setReplyType] = useState(REPLY_EDITOR_MODES.REPLY);
  const [isFormatMode, setFormatMode] = useState(false);
  const [enterToSendEnabled, setEnterToSendEnabled] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const hideEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  const hideMentions = () => {
    setShowMentions(false);
  };

  const onFileUpload = (file: File) => {
    setAttachedFiles([...attachedFiles, file]);
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const sendMessage = () => {
    if (!message.trim() && attachedFiles.length === 0) {
      return;
    }

    const messagePayload = {
      conversationId,
      message,
      inReplyTo,
      attachedFiles,
      replyType,
    };

    // Handle send message logic
    console.log("Sending message:", messagePayload);

    // Clear the message and attachments after sending
    setMessage("");
    setAttachedFiles([]);
  };

  const toggleEnterToSend = () => {
    setEnterToSendEnabled(!enterToSendEnabled);
  };

  return (
    <div className="reply-box">
      <ReplyTopPanel mode={replyType} setReplyMode={setReplyType} />
      <div className="reply-box__top">
        {showMentions && (
          <CannedResponse searchKey={message} onClick={hideMentions} />
        )}
        {showEmojiPicker && <EmojiInput onClick={toggleEmojiPicker} />}
        <ResizableTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
      </div>
      {attachedFiles.length > 0 && (
        <div className="attachment-preview-box">
          <AttachmentPreview
            attachments={attachedFiles}
            removeAttachment={removeAttachment}
          />
        </div>
      )}
      <ReplyBottomPanel
        showFileUpload={false}
        mode={replyType}
        onFileUpload={onFileUpload}
        showEmojiPicker={showEmojiPicker}
        toggleEmojiPicker={toggleEmojiPicker}
        isSendDisabled={!message.trim() && attachedFiles.length === 0}
        sendButtonText="Send"
        onSend={sendMessage}
        setFormatMode={setFormatMode}
        isFormatMode={isFormatMode}
        isOnPrivateNote={replyType === REPLY_EDITOR_MODES.NOTE}
        enableRichEditor={true}
        enterToSendEnabled={enterToSendEnabled}
        toggleEnterToSend={toggleEnterToSend}
      />
    </div>
  );
};

export default ReplyBox;
