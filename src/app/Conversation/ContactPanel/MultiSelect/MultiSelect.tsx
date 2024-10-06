import React, { useState } from "react";
import styles from "./index.module.scss";

interface MultiselectProps {
  data: Array<{ id: number; name: string; availability_status?: string }>;
  value: any;
  textField: string;
  valueField: string;
  onChange: (selected: any) => void;
  placeholder: string;
  itemComponent?: React.FC<{ item: any }>;
}

const Multiselect: React.FC<MultiselectProps> = ({
  data,
  value,
  textField,
  valueField,
  onChange,
  placeholder,
  itemComponent: ItemComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => data.find((item) => item[valueField] === option.value)
    );
    onChange(selectedOptions);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.multiselect}>
      <div className={styles.selectedItems} onClick={toggleDropdown}>
        {!!value?.length ? (
          value.map((item) => (
            <div key={item[valueField]} className={styles.selectedItem}>
              {item[textField]}
            </div>
          ))
        ) : (
          <div className={styles.placeholder}>{placeholder}</div>
        )}
      </div>
      {isOpen && (
        <select
          multiple
          className={styles.select}
          onChange={handleSelectChange}
          value={value.map((item) => item[valueField])}
        >
          {data.map((item) => (
            <option key={item[valueField]} value={item[valueField]}>
              {ItemComponent ? <ItemComponent item={item} /> : item[textField]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Multiselect;
