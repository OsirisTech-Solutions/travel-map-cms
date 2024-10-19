import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const CategoryTags = {
  namespace: 'CATEGORY',
  method: [],
};
export const categoryApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [CategoryTags.namespace],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListCategory: builder.query<
        ResponseT<{ items: SCHEMA.Category[]; total: number }>,
        RequestT<undefined, REQUEST_DEFIND.GetListRequestParam>
      >({
        query: (data) => ({
          url: `/category`,
          method: MethodType.GET,
          params: data?.params,
        }),
        providesTags: [CategoryTags.namespace],
      }),
      createCategory: builder.mutation<
        ResponseT<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ name: string; thumbnail: string; description: string }, any>
      >({
        query: (data) => ({
          url: `/category`,
          method: 'POST',
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          const result = await queryFulfilled;
          console.log('onQueryStarted', result);
        },
      }),
      updateCategory: builder.mutation<
        ResponseT<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ name: string; thumbnail: string; description: string }, { id: string }>
      >({
        query: (data) => ({
          url: `/category/${data?.params?.id}`,
          method: 'PATCH',
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          const result = await queryFulfilled;
          console.log('onQueryStarted', result);
        },
      }),
    }),
  });

export const {
  useGetListCategoryQuery,
  useLazyGetListCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
