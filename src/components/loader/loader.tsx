import React, { ReactNode } from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  children: ReactNode;
  showLoader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, showLoader }) => {
  return showLoader ? <span className={styles.loader}></span> : <>{children}</>;
};

export default Loader;
