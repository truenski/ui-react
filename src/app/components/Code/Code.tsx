// components/Code.js
import React from "react";
import PropTypes from "prop-types";
import copy from "copy-text-to-clipboard";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

const Code = ({ script, lang }) => {
  const onCopy = (e) => {
    e.preventDefault();
    copy(script);
    const event = new CustomEvent("newToastMessage", {
      detail: "Copy successful!",
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="code--container">
      <button className="button small button--copy-code" onClick={onCopy}>
        Copy Code
      </button>
      {script && (
        <pre>
          <code
            className={`hljs ${lang}`}
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(script, { language: lang }).value,
            }}
          />
        </pre>
      )}
    </div>
  );
};

Code.propTypes = {
  script: PropTypes.string,
  lang: PropTypes.string,
};

Code.defaultProps = {
  script: "",
  lang: "javascript",
};

export default Code;
