import React, { useState, useEffect, useRef } from "react";
import LabelDropdownItem from "./LabelDropdownItem";
import styles from "./index.module.scss";

interface LabelDropdownProps {
  accountLabels: Array<{ title: string; color: string }>;
  selectedLabels: string[];
  onAdd: (label: { title: string; color: string }) => void;
  onRemove: (label: { title: string; color: string }) => void;
}

const LabelDropdown: React.FC<LabelDropdownProps> = ({
  accountLabels,
  selectedLabels,
  onAdd,
  onRemove,
}) => {
  const [search, setSearch] = useState("");
  const searchbarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchbarRef.current) {
      searchbarRef.current.focus();
    }
  }, []);

  const filteredActiveLabels = accountLabels.filter((label) =>
    label.title.toLowerCase().includes(search.toLowerCase())
  );

  const noResult = filteredActiveLabels.length === 0 && search !== "";

  const onAddRemove = (label: { title: string; color: string }) => {
    if (selectedLabels.includes(label.title)) {
      onRemove(label);
    } else {
      onAdd(label);
    }
  };

  return (
    <div className={styles.dropdownSearchWrap}>
      <h4 className={styles.textBlockTitle}>Select Labels</h4>
      <div className={styles.searchWrap}>
        <input
          ref={searchbarRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className={styles.searchInput}
          placeholder="Search labels"
        />
      </div>
      <div className={styles.listWrap}>
        <div className={styles.list}>
          {filteredActiveLabels.map((label) => (
            <LabelDropdownItem
              key={label.title}
              title={label.title}
              color={label.color}
              selected={selectedLabels.includes(label.title)}
              onClick={() => onAddRemove(label)}
            />
          ))}
          {noResult && <div className={styles.noResult}>No results found</div>}
        </div>
      </div>
    </div>
  );
};

export default LabelDropdown;
