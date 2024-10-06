import React, { useRef } from "react";
import WootButton from "./WootButton";
import { REPLY_EDITOR_MODES } from "../constants";
import "../style/ReplyBottomPanel.scss";

const ReplyBottomPanel = ({
  mode,
  onSend,
  sendButtonText,
  showFileUpload,
  onFileUpload,
  showEmojiPicker,
  toggleEmojiPicker,
  isSendDisabled,
  setFormatMode,
  isFormatMode,
  isOnPrivateNote,
  enableRichEditor,
  enterToSendEnabled,
  toggleEnterToSend,
}) => {
  const isNote = mode === REPLY_EDITOR_MODES.NOTE;
  const wrapClass = isNote ? "is-note-mode" : "";
  const buttonClass = isNote ? "warning" : "";
  const showAttachButton = showFileUpload || isNote;
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`bottom-box ${wrapClass}`}>
      <div className="left-wrap">
        <WootButton
          icon="ion-happy-outline"
          colorScheme="secondary"
          variant="smooth"
          size="small"
          onClick={toggleEmojiPicker}
        />
        {showAttachButton && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*, application/pdf, audio/mpeg, video/mp4, audio/ogg, text/csv"
              onChange={handleFileChange}
            />
            <WootButton
              classNames="button--upload"
              icon="ion-android-attach"
              colorScheme="secondary"
              variant="smooth"
              size="small"
              onClick={handleFileUploadClick}
            />
          </>
        )}
        {enableRichEditor && !isOnPrivateNote && (
          <WootButton
            icon="ion-quote"
            colorScheme="secondary"
            variant="smooth"
            size="small"
            onClick={() => setFormatMode(!isFormatMode)}
          />
        )}
        {showFileUpload && (
          <div className="modal-mask">
            <i className="ion-ios-cloud-upload-outline icon"></i>
            <h4 className="page-sub-title">Drag & Drop</h4>
          </div>
        )}
      </div>
      <div className="right-wrap">
        {isFormatMode && (
          <div className="enter-to-send--checkbox">
            <input
              checked={enterToSendEnabled}
              type="checkbox"
              value="enterToSend"
              onChange={() => toggleEnterToSend(!enterToSendEnabled)}
            />
            <label htmlFor="enterToSend">Enter to send</label>
          </div>
        )}
        <WootButton
          size="small"
          classNames={buttonClass}
          isDisabled={isSendDisabled}
          onClick={onSend}
        >
          {sendButtonText}
        </WootButton>
      </div>
    </div>
  );
};

export default ReplyBottomPanel;
