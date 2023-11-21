import React from 'react';
import styles from './loader.module.scss';
import { LoaderProps } from './loader.interface';

const Loader: React.FC<LoaderProps> = ({ children, showLoader }) => {
  const loader = <span data-testid="loader" className={styles.loader}></span>;

  return showLoader ? loader : <>{children && children}</>;
};

export default Loader;
