import React from "react";
import "./index.modules.scss";

interface AvailabilityStatusBadgeProps {
  status: string;
}

const AvailabilityStatusBadge: React.FC<AvailabilityStatusBadgeProps> = ({
  status,
}) => {
  return <div className={`status-badge status-badge__${status}`} />;
};

export default AvailabilityStatusBadge;
