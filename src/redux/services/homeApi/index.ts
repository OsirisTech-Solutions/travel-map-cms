import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const CategoryTags = {
  namespace: 'CATEGORY',
};
export const categoryApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [CategoryTags.namespace],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListHomeData: builder.query<
        ResponseT<{ items: SCHEMA.HomeData[]; total: number }>,
        RequestT<
          undefined,
          REQUEST_DEFIND.GetListRequestParam & { sortBy?: 'DESC_POSITION' | 'ASC_POSITION' }
        >
      >({
        query: (data) => ({
          url: `/home-line`,
          method: MethodType.GET,
          params: data?.params,
        }),
        providesTags: [CategoryTags.namespace],
      }),
      getHomeDataById: builder.query<
        ResponseT<SCHEMA.HomeData>,
        RequestT<undefined, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/home-line/${data?.params?.id}`,
          method: MethodType.GET,
        }),
        providesTags: [CategoryTags.namespace],
      }),
      deleleHomeDataById: builder.mutation<
        ResponseT<any>,
        RequestT<undefined, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/home-line/${data?.params?.id}`,
          method: MethodType.DELETE,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
      createHomeData: builder.mutation<
        ResponseT<any>,
        RequestT<REQUEST_DEFIND.CRUDHomeDataRequestBody, undefined>
      >({
        query: (data) => ({
          url: `/home-line`,
          method: MethodType.POST,
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
      updateHomeData: builder.mutation<
        ResponseT<{ items: any[]; total: number }>,
        RequestT<REQUEST_DEFIND.CRUDHomeDataRequestBody, REQUEST_DEFIND.CRUDRequestParam>
      >({
        query: (data) => ({
          url: `/home-line/${data?.params?.id}`,
          method: MethodType.PATCH,
          body: data?.body,
        }),
        invalidatesTags: [CategoryTags.namespace],
      }),
    }),
  });

export const {
  useGetListHomeDataQuery,
  useLazyGetListHomeDataQuery,
  useCreateHomeDataMutation,
  useDeleleHomeDataByIdMutation,
  useUpdateHomeDataMutation,
  useGetHomeDataByIdQuery,
  useLazyGetHomeDataByIdQuery,
} = categoryApi;
