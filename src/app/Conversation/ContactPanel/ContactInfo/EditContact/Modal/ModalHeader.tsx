import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

interface ModalHeaderProps {
  headerTitle: string;
  headerContent?: string;
  headerImage?: string;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  headerTitle,
  headerContent = "",
  headerImage = "",
  children,
}) => {
  return (
    <div className={`column ${styles.pageTopBar}`}>
      {headerImage && (
        <Image width={40} height={40} src={headerImage} alt="No image" />
      )}
      <h2 className={styles.pageSubTitle}>{headerTitle}</h2>
      {headerContent && <p className={`small-12 column`}>{headerContent}</p>}
      {children}
    </div>
  );
};

export default ModalHeader;
