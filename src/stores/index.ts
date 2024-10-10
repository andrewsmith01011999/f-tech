import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';

import globalReducer from './global';
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});


const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;

export type AppStore = typeof store;

type ThunkAction<T = any> = (dispatch: Dispatch, state: AppStore['getState']) => Promise<T>;

export const createAsyncAction = <T = any, R = any>(callback: (arg: T) => ThunkAction<R>) => {
  return callback;
};
