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
export const baseQuery = ({ url }: { url?: string }) =>
  fetchBaseQuery({
    baseUrl: url ?? API_URL,
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
  FetchBaseQueryError,
  { url?: string }
> = async (args, api, extraOptions) => {
  const newBaseQuery = baseQuery({ url: extraOptions?.url });
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await newBaseQuery(args, api, extraOptions);
  if (result?.error && result?.error?.status === 401) {
    Cookies.remove(KEYS.ACCESS_TOKEN);
    window.location.reload();
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const refreshResult: any = await baseQuery('/refreshToken', api, extraOptions)
        // if (refreshResult.data) {
        // api.dispatch(tokenReceived(refreshResult.data))
        // retry the initial query
        result = await newBaseQuery(args, api, extraOptions);
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await newBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export const baseAPI = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  endpoints: () => ({}),
});
