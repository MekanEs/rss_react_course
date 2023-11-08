import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Layout from './layout';
import { Main, NotFound } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="/page/:page" element={<Main />}>
        <Route path="/page/:page/details/:id" element={<Main />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
