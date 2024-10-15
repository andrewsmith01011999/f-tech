import { LocalStorageKeys } from '@/consts/local-storage';
import store from '@/stores';
import { setGlobalState } from '@/stores/global';
import { Response } from '@/types';
import { historyNavigation } from '@/utils/common';
import { API_PATH } from '@/utils/env';
import { PATHS } from '@/utils/paths';
import { message as $message } from 'antd';
import type { AxiosRequestConfig, Method } from 'axios';
import axios from 'axios';
import Qs from 'qs';
import { apiRefreshToken } from './user.api';

export type BaseResponse<T = any> = Promise<Response<T>>;

const axiosInstance = axios.create({
  baseURL: API_PATH + '',
  timeout: 6000,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'repeat' })
});

axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );

    return config;
  },
  (error) => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    const response: Response<any> = {
      message: 'Success',
      code: config?.status,
      entity: config?.data,
    };

    return response;
  },

  async err => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    const error = err?.response;
    const config = err?.config;

    if (error?.status === 401 && config && !config?.__isRetryRequest) {
      config.__isRetryRequest = true;

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN_KEY)}`,
      };

      const { code, entity } = await apiRefreshToken(config);

      // if (status && result?.token) {
      //   // resave access token
      //   localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, result.token);
      //   localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, result.refreshToken);

      //   config.headers = {
      //     ...config.headers,
      //     Authorization: `Bearer ${result.token}`,
      //   };

      //   return axiosInstance(config);
      // }

    } else if (error?.status === 401) {
      $message.error('Session expired. Login again');
      historyNavigation.navigate(PATHS.SIGNIN)

      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN_KEY);
      localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN_KEY);

      return Promise.reject(error);
    }

    const errorResponse: Response<null> = {
      message: 'Error',
      entity: null,
    };

    if (error?.data) {
      errorResponse.message = error.data?.message;
      errorResponse.code = error.status;
    } else {
      errorResponse.message = error?.message;
    }

    errorResponse.message && $message.error(errorResponse.message);

    return Promise.reject(errorResponse);
  },
);

export default axiosInstance;



/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): BaseResponse<T> => {
  // remove undefined | null | '' field
  // Object.keys(data).forEach(key => (data[key] ?? delete data[key]));

  switch (method) {
    case 'post':
      return axiosInstance.post(url, data, config);
    case 'put':
      return axiosInstance.put(url, data, config);
    case 'delete':
      return axiosInstance.delete(url, {
        ...config,
        data: data
      });
    case 'get':
    default:
      return axiosInstance.get(url, {
        params: data,
        ...config,

      });
  }
};

