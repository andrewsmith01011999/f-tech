import { LocalStorageKeys } from '@/consts/local-storage';
import { AccountStatus, Wallet } from '@/types/account';
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

  token?: string;

  refreshToken?: string;

  wallet?: Wallet
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
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, state.token ?? "");
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, state.refreshToken ?? "");
      localStorage.setItem(LocalStorageKeys.USERNAME_KEY, state.username ?? "");
    },

    loggout(state, action: PayloadAction<undefined>) {
      state = initialStates;
      localStorage.clear();
    }
  },
});

export const { 
  setAccountState, 
  loggout 
} = accountSlice.actions;

export default accountSlice.reducer;

