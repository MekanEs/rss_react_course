import React from 'react';
import styles from './pagination.module.scss';

interface PaginationButtonProps {
  text: string;
  callback: () => void;
  condition: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  text,
  callback,
  condition,
}) => {
  return (
    <button
      className={styles.paginationButton}
      disabled={condition}
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default PaginationButton;
