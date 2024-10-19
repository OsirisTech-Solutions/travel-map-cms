import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const UserTags = {
  namespace: 'CATEGORY',
  method: [],
};
export const userApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [UserTags.namespace],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListUser: builder.query<
        ResponseT<{ items: SCHEMA.User[]; total: number }>,
        RequestT<undefined, REQUEST_DEFIND.GetListRequestParam>
      >({
        query: (data) => ({
          url: `/user`,
          method: MethodType.GET,
          params: data?.params,
        }),
        providesTags: [UserTags.namespace],
      }),
      deleteUserById: builder.mutation<
        ResponseT<any>,
        RequestT<undefined, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/user/${data?.params?.id}`,
          method: MethodType.DELETE,
        }),
        invalidatesTags: [UserTags.namespace],
      }),
      createPlace: builder.mutation<
        ResponseT<any>,
        RequestT<REQUEST_DEFIND.CRUDUserRequestBody, undefined>
      >({
        query: (data) => ({
          url: `/user`,
          method: MethodType.POST,
          body: data?.body,
        }),
        invalidatesTags: [UserTags.namespace],
      }),
      updateUserById: builder.mutation<
        ResponseT<{ items: any[]; total: number }>,
        RequestT<REQUEST_DEFIND.CRUDUserRequestBody, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/user/${data?.params?.id}`,
          method: MethodType.PATCH,
          body: data?.body,
        }),
        invalidatesTags: [UserTags.namespace],
      }),
    }),
  });

export const {
  useCreatePlaceMutation,
  useDeleteUserByIdMutation,
  useGetListUserQuery,
  useLazyGetListUserQuery,
  useUpdateUserByIdMutation,
} = userApi;
