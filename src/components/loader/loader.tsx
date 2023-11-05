import React, { ReactNode } from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  children?: ReactNode;
  showLoader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, showLoader }) => {
  const loader = <span className={styles.loader}></span>;
  if (!children) {
    return loader;
  }
  return showLoader ? loader : <>{children}</>;
};

export default Loader;
