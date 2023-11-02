import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { QueryProvider, ThemeProvider } from './providers';

const App: FC = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
