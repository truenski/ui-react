import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MentionBox from "./MentionBox";

const CannedResponse = ({ searchKey, onClick }) => {
  const dispatch = useDispatch();
  const cannedMessages = useSelector((state) => state.cannedResponses);

  useEffect(() => {
    dispatch({ type: "GET_CANNED_RESPONSE", payload: { searchKey } });
  }, [searchKey, dispatch]);

  const items = cannedMessages.map((cannedMessage) => ({
    label: cannedMessage.short_code,
    key: cannedMessage.short_code,
    description: cannedMessage.content,
  }));

  const handleMentionClick = (item = {}) => {
    onClick(item.description);
  };

  return <MentionBox items={items} onMentionSelect={handleMentionClick} />;
};

export default CannedResponse;
