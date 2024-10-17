import { LocalStorageKeys } from '@/consts/local-storage';
import { Device } from '@/types/layout';
import { MenuChild } from '@/types/layout/menu';
import type { Permission } from '@/types/user/user';
import { PATHS } from '@/utils/paths';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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

  selectedKeys: string[];
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
  selectedKeys: [PATHS.HOME],
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

