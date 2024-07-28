import { baseApi } from '@/app/baseApi'
import { GetExchangeRates } from '@/types/serverResponses'

const homeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getExchangeRates: build.query<GetExchangeRates, void>({
      query: () => ({
        url: '/api/exchange-rates',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetExchangeRatesQuery } = homeApi
