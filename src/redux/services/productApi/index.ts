import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const ProductTags = {
  namespace: 'PRODUCT',
  method: [],
};
export const productApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [ProductTags.namespace],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListProduct: builder.query<
        ResponseT<{ items: SCHEMA.Product[]; total: number }>,
        RequestT<undefined, REQUEST_DEFIND.GetListRequestParam>
      >({
        query: (data) => ({
          url: `/product`,
          method: MethodType.GET,
          params: data?.params,
        }),
        providesTags: [ProductTags.namespace],
      }),
      createProduct: builder.mutation<
        ResponseT<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ placeIds: string[]; name: string; thumbnail: string; description: string }, any>
      >({
        query: (data) => ({
          url: `/product`,
          method: 'POST',
          body: data?.body,
        }),
        invalidatesTags: [ProductTags.namespace],
        onQueryStarted: async (args, { queryFulfilled }) => {
          const result = await queryFulfilled;
          console.log('onQueryStarted', result);
        },
      }),
      updateProduct: builder.mutation<
        ResponseT<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ name: string; thumbnail: string; description: string }, { id: string }>
      >({
        query: (data) => ({
          url: `/product/${data?.params?.id}`,
          method: 'PATCH',
          body: data?.body,
        }),
        invalidatesTags: [ProductTags.namespace],
        onQueryStarted: async (args, { queryFulfilled }) => {
          const result = await queryFulfilled;
          console.log('onQueryStarted', result);
        },
      }),
      deleteProduct: builder.mutation<
        ResponseT<{
          accessToken: string;
          refreshToken: string;
        }>,
        RequestT<{ id: string }, undefined>
      >({
        query: (data) => ({
          url: `/product/${data?.body?.id}`,
          method: 'DETETE',
        }),
        invalidatesTags: [ProductTags.namespace],
        onQueryStarted: async (args, { queryFulfilled }) => {
          const result = await queryFulfilled;
          console.log('onQueryStarted', result);
        },
      }),
    }),
  });

export const {
  useGetListProductQuery,
  useLazyGetListProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
