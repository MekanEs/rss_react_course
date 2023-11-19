import React, { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import { ErrorBoundary, Header } from '../../components';
import { ThemeContext } from '../../providers';

import styles from './layout.module.scss';
import { classNames } from '../../utils';

const Layout: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ErrorBoundary>
      <div className={classNames(styles.app, {}, [styles[theme]])}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
