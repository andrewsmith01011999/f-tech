import { LocalStorageKeys } from '@/consts/local-storage';
import { Device } from '@/types/layout';
import { MenuChild } from '@/types/layout/menu';
import type { Locale, Permission } from '@/types/user/user';
import type { PayloadAction } from '@reduxjs/toolkit';


import { createSlice } from '@reduxjs/toolkit';
import { createAsyncAction } from '.';
import { LoginParams } from '@/types/user/login';
import { apiAccount, apiLogin } from '@/apis/user.api';

export interface UserState {
  userId?: number;

  username?: string;

  /** menu list for init tagsView */
  menuList: MenuChild[];

  /** login status */
  logged: boolean;

  roles: string[];

  /** user's device */
  device?: Device;

  /** menu collapsed status */
  collapsed?: boolean;

  /** notification count */
  noticeCount: number;

  permission: Permission;
}

const initialStates: UserState = {
  noticeCount: 0,
  logged: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY) ? true : false,
  menuList: [],
  username: undefined,
  userId: undefined,
  roles: [],
  permission: {
    isAdmin: false,
    isLeader: false,
    isCS: false,
    isSeller: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStates,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;


export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { result, status } = await apiLogin(payload);

    if (status && result && result.token) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, result.token);
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, result.refreshToken);

      dispatch(
        setUserItem({
          logged: true,
        }),
      );

      return true;
    }

    return false;
  };
});

export const loadProfile = createAsyncAction<string, boolean>(token => {
  return async dispatch => {
    const { result, status } = await apiAccount(token);

    if (result && status) {
      dispatch(
        setUserItem({
          userId: result.id,
          username: result.username,
          roles: result.roles.map(role => role.code),
        }),
      );

      return true;
    }

    return false;
  };
});