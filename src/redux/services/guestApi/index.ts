import {baseAPI} from '@/redux/baseApi'

const guestApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['GUEST']
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListGuest: builder.query<any, any>({
        query: (data) => ({
          url: ``,
          method: 'get'
        }),
        providesTags:['GUEST']
      }),
      updateGuest: builder.mutation<any, any>({
        query: (data) => ({
          url: ``,
          method: 'put',
          body: data?.body
        }),
        invalidatesTags:['GUEST']
      })
    })
  })

export const {
  useGetListGuestQuery, useLazyGetListGuestQuery, useUpdateGuestMutation
} = guestApi
