import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

const guestApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['GUEST'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      uploadFile: builder.mutation<any, any>({
        query: (data) => {
          const formData = new FormData();
          formData.append('file', data.file);
          return {
            url: `/file/upload`,
            method: 'post',
            body: formData,
          };
        },
        invalidatesTags: ['GUEST'],
      }),
      getAllImage: builder.query<ResponseT<{items: SCHEMA.File[]}>, RequestT<undefined, REQUEST_DEFIND.GetAllImageRequestParam>>({
        query: (data) => ({
          url: '/file',
          method: MethodType.GET,
          params: data?.params,
        }),
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        // Always merge incoming data to the cache entry
        merge: (currentCache, newItems) => {
          currentCache.data?.items.push(...newItems.data?.items);
        },
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    }),
  });

export const { useUploadFileMutation, useGetAllImageQuery, useLazyGetAllImageQuery } = guestApi;
