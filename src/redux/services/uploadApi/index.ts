import { baseAPI } from '@/redux/baseApi';

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
            url: ``,
            method: 'post',
            body: formData,
          };
        },
        extraOptions: {
          url: 'http://furryfam.store/api/cms/file/upload',
        },
        invalidatesTags: ['GUEST'],
      }),
    }),
  });

export const { useUploadFileMutation } = guestApi;
