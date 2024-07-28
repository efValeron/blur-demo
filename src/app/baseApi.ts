import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://139.59.106.250:8080/',
  credentials: 'include',
  // prepareHeaders: headers => {
  //   const token = tokenStorage.getToken()
  //
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`)
  //   }
  //
  //   return headers
  // },
})

export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
})
