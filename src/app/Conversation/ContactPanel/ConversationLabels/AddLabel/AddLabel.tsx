import React from "react";
import styles from "./index.module.scss";

interface AddLabelProps {
  onAdd: () => void;
}

const AddLabel: React.FC<AddLabelProps> = ({ onAdd }) => {
  return (
    <button className={styles.labelAdd} onClick={onAdd}>
      <span className={styles.label}>
        <i className="ion-plus-round" />
        Add Label
      </span>
    </button>
  );
};

export default AddLabel;
