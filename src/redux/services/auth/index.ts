import { baseAPI } from '@/redux/baseApi';
import { RequestT, Response } from '@/redux/type';

const authApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['GUEST'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<
        Response<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ username: string; password: string }, any>
      >({
        query: (data) => ({
          url: `/api/cms/auth/login`,
          method: 'POST',
          body: data?.body,
        }),
        invalidatesTags: ['GUEST'],
      }),
    }),
  });

export const { useLoginMutation } = authApi;
