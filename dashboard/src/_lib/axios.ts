'use client';
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

import { getStorageValue } from '@/_store/useSuperAdminStorage';
import { ApiResponse, UninterceptedApiErrorData } from '@/_types/api/api.type';

const isServer = () => {
  return typeof window === 'undefined';
};
let context = <GetServerSidePropsContext>{};
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    'https://safari-mas-api.ishaqadhel.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  const whichStorage = getStorageValue();

  if (config.headers) {
    config.headers['Store-Id'] = whichStorage.toString();
    let token: string | undefined;

    if (isServer()) {
      if (!context)
        throw 'Api Context not found. You must call `setApiContext(context)` before calling api on server-side';

      const cookies = new Cookies(context.req?.headers.cookie);
      /** Get cookies from context if server side */
      // get cookie from context by name @safari/token
      token = cookies.get('@safari-masraya/token');
    } else {
      /** Get cookies from context if server side */
      // token = getToken();

      // Get token from local storage if client side
      token = localStorage.getItem('token') ?? undefined;
    }

    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<ApiResponse<UninterceptedApiErrorData>>) => {
    // parse error
    if (error.response?.data.status === 'failed') {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data === 'string'
                ? error.response.data
                : Object.values(error.response.data.data)[0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Must be set when calling api on server side
 */
export const setApiContext = (_context: GetServerSidePropsContext) => {
  context = _context;
  return;
};

export default api;
