import { baseAPI } from '@/redux/baseApi';
import { MethodType, RequestT, ResponseT } from '@/redux/type';

export const UploadTags = {
  namespace: 'FILE',
  method: [],
};
const FILEApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['FILE'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      uploadFile: builder.mutation<
        ResponseT<{ fileName: string }>,
        RequestT<REQUEST_DEFIND.UploadFileRequestBody, undefined>
      >({
        query: (data) => {
          console.log(data);
          const formData = new FormData();
          formData.append('file', data?.body?.file as File);
          return {
            url: `/file/upload`,
            method: 'post',
            body: formData,
          };
        },
        invalidatesTags: ['FILE'],
      }),
      getAllImage: builder.query<
        ResponseT<{ items: SCHEMA.File[]; total: number }>,
        RequestT<undefined, REQUEST_DEFIND.GetAllImageRequestParam>
      >({
        query: (data) => ({
          url: '/file',
          method: MethodType.GET,
          params: data?.params,
        }),
      }),
    }),
  });

export const { useUploadFileMutation, useGetAllImageQuery, useLazyGetAllImageQuery } = FILEApi;
