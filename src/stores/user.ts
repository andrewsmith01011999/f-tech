import { LocalStorageKeys } from '@/consts/local-storage';
import { Device } from '@/types/layout';
import { MenuChild } from '@/types/layout/menu';
import type { Permission } from '@/types/user/user';
import { PATHS } from '@/utils/paths';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  accountId?: number;

  username?: string; 

  email?: string;

  avatar?: string;

  coverImage?: string;

  createdDate?: string;

  status?: string;

  role?: string;

  /** login status */
  logged: boolean;

  /** user's device */
  device?: Device;

  /** menu collapsed status */ 
  collapsed?: boolean;

  /** notification count */
  noticeCount: number;

  selectedKeys: string[];
}

const initialStates: UserState = {
  logged: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY) ? true : false,
  noticeCount: 0,
  selectedKeys: []
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStates,
  reducers: {
    setUserState(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;

