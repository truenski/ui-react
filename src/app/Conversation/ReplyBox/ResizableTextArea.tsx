import React, { useEffect, useRef } from "react";

const TYPING_INDICATOR_IDLE_TIME = 4000;

interface ResizableTextAreaProps {
  placeholder: string;
  value: string;
  minHeight?: number;
  onChange: (value: string) => void;
  onTypingOn?: () => void;
  onTypingOff?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const ResizableTextArea: React.FC<ResizableTextAreaProps> = ({
  placeholder,
  value,
  minHeight = 2,
  onChange,
  onTypingOn = () => {},
  onTypingOff = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      if (!value) {
        textareaRef.current.style.height = `${minHeight}rem`;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    resizeTextarea();
  };

  const resetTyping = () => {
    onTypingOff();
    idleTimer.current = null;
  };

  const turnOffIdleTimer = () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
  };

  const handleKeyUp = () => {
    if (!idleTimer.current) {
      onTypingOn();
    }
    turnOffIdleTimer();
    idleTimer.current = setTimeout(
      () => resetTyping(),
      TYPING_INDICATOR_IDLE_TIME
    );
  };

  const handleBlur = () => {
    turnOffIdleTimer();
    resetTyping();
    onBlur();
  };

  const handleFocus = () => {
    onFocus();
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onInput={handleInput}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
    />
  );
};

export default ResizableTextArea;
