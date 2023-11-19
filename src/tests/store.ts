import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

import { apiSlice } from '../API/apiSlice';
import searchSlice from '../store/searchReducer/searchSlice';
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  search: searchSlice,

  [apiSlice.reducerPath]: apiSlice.reducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['your/action/type'],
        },
      }).concat(apiSlice.middleware),
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
