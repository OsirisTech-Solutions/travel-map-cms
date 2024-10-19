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
      }),
    }),
  });

export const { useGetListCategoryQuery, useLazyGetListCategoryQuery } = categoryApi;
