import React from "react";
import { formatBytes } from "../helpers/FileHelper";
import "../style/AttachmentPreview.scss";

const AttachmentPreview = ({ attachments, removeAttachment }) => {
  const onRemoveAttachment = (index) => {
    removeAttachment(index);
  };

  const isTypeImage = (type) => {
    return type.includes("image");
  };

  return (
    <div>
      {attachments.map((attachment, index) => (
        <div key={attachment.id} className="preview-item">
          <div className="thumb-wrap">
            {isTypeImage(attachment.resource.type) ? (
              <img
                className="image-thumb"
                src={attachment.thumb}
                alt="attachment"
              />
            ) : (
              <span className="attachment-thumb"> 📄 </span>
            )}
          </div>
          <div className="file-name-wrap">
            <span className="item">{attachment.resource.name}</span>
          </div>
          <div className="file-size-wrap">
            <span className="item">
              {formatBytes(attachment.resource.size, 0)}
            </span>
          </div>
          <div className="remove-file-wrap">
            <button
              className="remove--attachment"
              onClick={() => onRemoveAttachment(index)}
            >
              <i className="ion-android-close"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttachmentPreview;
