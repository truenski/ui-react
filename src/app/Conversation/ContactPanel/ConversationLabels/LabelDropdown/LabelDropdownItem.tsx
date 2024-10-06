import React from "react";
import styles from "./index.module.scss";

interface LabelDropdownItemProps {
  title: string;
  color: string;
  selected: boolean;
  onClick: (title: string) => void;
}

const LabelDropdownItem: React.FC<LabelDropdownItemProps> = ({
  title,
  color,
  selected,
  onClick,
}) => {
  return (
    <div className={styles.itemWrap}>
      <button className={styles.button} onClick={() => onClick(title)}>
        <div className={styles.buttonWrap}>
          <div className={styles.nameLabelWrap}>
            {color && (
              <div
                className={styles.labelColorDisplay}
                style={{ backgroundColor: color }}
              />
            )}
            <span className={styles.labelText} title={title}>
              {title}
            </span>
          </div>
          {selected && <i className="ion-checkmark-round" />}
        </div>
      </button>
    </div>
  );
};

export default LabelDropdownItem;
