import type { Account } from '@/types/user/user';
import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../types/user/login';

import { AxiosRequestConfig } from 'axios';


import { request } from './request';
import { ApiPaths } from '@/consts/apis';

export const apiLogin = (data: LoginParams) => request<LoginResult>('post', ApiPaths.LOGIN, data);

export const apiRefreshToken = (config: AxiosRequestConfig) =>
  request<LoginResult>('get', '/api/v1/auth/refreshToken', {}, config);

export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/api/v1/auth/logout', data);

export const apiAccount = (accessToken: string) => {
  return request<Account>(
    'get',
    '/api/v1/account',
    {},
    {},
  );
}
