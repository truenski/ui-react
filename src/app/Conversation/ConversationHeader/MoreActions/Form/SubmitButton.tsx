import Spinner from "@/app/Conversation/Spinner";
import React from "react";

interface FormSubmitButtonProps {
  disabled?: boolean;
  loading?: boolean;
  buttonText?: string;
  buttonClass?: string;
  iconClass?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  disabled = false,
  loading = false,
  buttonText = "",
  buttonClass = "",
  iconClass = "",
  type = "submit",
  onClick,
}) => {
  const computedClass = `button nice ${buttonClass || " "}`;

  return (
    <button
      type={type}
      data-testid="submit_button"
      disabled={disabled}
      className={computedClass}
      onClick={onClick}
    >
      {iconClass && <i className={iconClass} />}
      <span>{buttonText}</span>
      {loading && <Spinner />}
    </button>
  );
};

export default FormSubmitButton;
