import { UserResponse } from '@/types/User'
import { baseApi } from '../base-api'

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['user'] })

export const userApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => `/fetch-user-data`,
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<void, { displayName: string }>({
      query: ({ displayName }) => ({
        url: `/update-user-data`,
        method: 'PUT',
        body: { displayName },
      }),
      invalidatesTags: ['user'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice
