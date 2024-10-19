import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const AuthTags = {
  namespace: 'AUTH',
  method: [],
};
export const guestApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [AuthTags.namespace],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<
        ResponseT<SCHEMA.LoginResponse>,
        RequestT<REQUEST_DEFIND.LoginRequestBody, undefined>
      >({
        query: (data) => ({
          url: '/auth/login',
          method: MethodType.POST,
          body: data?.body,
        }),
        invalidatesTags: [],
      }),
      getUser: builder.query<
        ResponseT<SCHEMA.User>,
        RequestT<undefined, REQUEST_DEFIND.GetUserRequestParam>
      >({
        query: (data) => ({
          url: `user/${data?.params?.id}`,
          method: MethodType.GET,
        }),
      }),
    }),
  });

export const { useLoginMutation } = guestApi;
