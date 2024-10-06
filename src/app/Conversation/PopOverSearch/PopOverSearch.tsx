import React, { useState, useEffect } from "react";
import ResultItem from "./ResultItem";
import Spinner from "../Spinner";
import { mockContacts, mockFetchConversations, mockInboxes } from "../mockData";
import "./PopOverSearch.module.scss";
import WootSidemenuIcon from "./WootSideMenuIcon";

interface PopOverSearchProps {
  currentPage: number;
}

const PopOverSearch: React.FC<PopOverSearchProps> = ({ currentPage }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialConversations = async () => {
      setIsFetching(true);
      const initialConversations = await mockFetchConversations({ q: "" });
      setConversations(initialConversations);
      setIsFetching(false);
    };
    fetchInitialConversations();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const typingTimer = setTimeout(async () => {
        setIsFetching(true);
        const fetchedConversations = await mockFetchConversations({
          q: searchTerm,
        });
        setConversations(fetchedConversations);
        setIsFetching(false);
      }, 1000);
      return () => clearTimeout(typingTimer);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
  }, [currentPage]);

  const onSearch = () => {
    setShowSearchBox(true);
  };

  const closeSearch = () => {
    setShowSearchBox(false);
  };

  const resultsCount = conversations.length;
  const showSearchResult = searchTerm && resultsCount && !isFetching;
  const showEmptyResult = searchTerm && !resultsCount && !isFetching;

  return (
    <div className="search-wrap" onClick={closeSearch}>
      <div className={`search ${showSearchBox ? "is-active" : ""}`}>
        <WootSidemenuIcon />
        <div className="icon">
          <i className="ion-ios-search-strong search--icon" />
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search--input"
          placeholder="Search messages"
          onFocus={onSearch}
        />
      </div>
      {showSearchBox && (
        <div className="results-wrap">
          <div className="show-results">
            <div>
              <div className="result-view">
                <div className="result">
                  Search Results
                  {resultsCount > 0 && (
                    <span className="message-counter">({resultsCount})</span>
                  )}
                </div>
                {isFetching && (
                  <div className="search--activity-message">
                    <Spinner size="" />
                    Loading messages...
                  </div>
                )}
              </div>
              {showSearchResult && (
                <div className="search-results--container">
                  {conversations.map((conversation) => (
                    <ResultItem
                      key={conversation.id}
                      conversationId={conversation.id}
                      userName={mockContacts[conversation.meta.sender.id].name}
                      timestamp={conversation.timestamp}
                      messages={conversation.messages}
                      searchTerm={searchTerm}
                      inboxName={mockInboxes[conversation.inbox_id].name}
                    />
                  ))}
                </div>
              )}
              {showEmptyResult && (
                <div className="search--activity-no-message">
                  No matching results
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopOverSearch;
