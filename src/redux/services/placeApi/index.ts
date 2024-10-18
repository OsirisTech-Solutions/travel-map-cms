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
      getListPlace: builder.query<
        ResponseT<{ items: any[]; total: number }>,
        RequestT<undefined, REQUEST_DEFIND.GetListRequestParam>
      >({
        query: (data) => ({
          url: `/place`,
          method: MethodType.GET,
          params: data?.params,
        }),
        providesTags: [CategoryTags.namespace],
      }),
      delelePlaceById: builder.mutation<
        ResponseT<any>,
        RequestT<undefined, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/place/${data?.params?.id}`,
          method: MethodType.DELETE,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
      createPlace: builder.mutation<
        ResponseT<any>,
        RequestT<REQUEST_DEFIND.CRUDPlaceRequestBody, undefined>
      >({
        query: (data) => ({
          url: `/place`,
          method: MethodType.POST,
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
      updatePlace: builder.mutation<
        ResponseT<{ items: any[]; total: number }>,
        RequestT<REQUEST_DEFIND.CRUDPlaceRequestBody, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/place/${data?.params?.id}`,
          method: MethodType.GET,
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
    }),
  });

export const {
  useGetListPlaceQuery,
  useLazyGetListPlaceQuery,
  useCreatePlaceMutation,
  useDelelePlaceByIdMutation,
  useUpdatePlaceMutation,
} = categoryApi;
