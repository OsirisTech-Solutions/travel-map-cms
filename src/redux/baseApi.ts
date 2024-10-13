import { KEYS } from '@/utils/constant';
import { API_URL } from '@/utils/env';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get(KEYS.ACCESS_TOKEN);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error && result?.error?.status === 401) {
    Cookies.remove(KEYS.ACCESS_TOKEN);
    // localStorage.setItem('token', res.data.data.accessToken);
    // localStorage.setItem('refreshToken', res.data.data.refreshToken);
    window.location.reload();
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const refreshResult: any = await baseQuery('/api/cms/auth/refresh-token', api, extraOptions)
        // if (refreshResult.data) {
        // api.dispatch(tokenReceived(refreshResult.data))
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export const baseAPI = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  endpoints: () => ({}),
});
