import { LocalStorageKeys } from '@/consts/local-storage';
import { AccountStatus } from '@/types/account';
import { Device } from '@/types/layout';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  accountId?: string;

  username?: string; 

  email?: string;

  avatar?: string;

  coverImage?: string;

  createdDate?: string;

  status?: AccountStatus;

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

const initialStates: AccountState = {
  logged: localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY) ? true : false,
  noticeCount: 0,
  selectedKeys: []
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialStates,
  reducers: {
    setAccountState(state, action: PayloadAction<Partial<AccountState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setAccountState } = accountSlice.actions;

export default accountSlice.reducer;

