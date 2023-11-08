import React, { ReactNode } from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  children?: ReactNode;
  showLoader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, showLoader }) => {
  const loader = <span data-testid="loader" className={styles.loader}></span>;

  return showLoader ? loader : <>{children && children}</>;
};

export default Loader;
