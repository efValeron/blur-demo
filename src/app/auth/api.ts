import { LoginFields } from '@/app/auth/login/page'
import { SignupFields } from '@/app/auth/signup/page'
import { baseApi } from '@/app/baseApi'
import { tokenStorage } from '@/lib/tockenStorage'
import { LoginResponse, SignupResponse } from '@/types/serverResponses'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginFields>({
      onQueryStarted: async (_, { queryFulfilled }) => {
        const res = await queryFulfilled

        tokenStorage.setToken(res.data.accessToken)
      },
      query: data => ({
        url: '/auth/authenticate',
        method: 'POST',
        body: data,
      }),
    }),
    signup: build.mutation<SignupResponse, SignupFields>({
      onQueryStarted: async (_, { queryFulfilled }) => {
        const res = await queryFulfilled

        tokenStorage.setToken(res.data.accessToken)
      },
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
