import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';

import globalReducer from './global';
import userReducer from "./user";
import postReducer from "./post";

export type RootState = {
  user: ReturnType<typeof userReducer>;
  global: ReturnType<typeof globalReducer>;
  post: ReturnType<typeof postReducer>;
}

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
  post: postReducer,
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
