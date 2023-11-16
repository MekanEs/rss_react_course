import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { ThemeProvider } from './providers';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: FC = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
