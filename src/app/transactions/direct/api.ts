
import { baseApi } from '@/app/baseApi'
import { TransactionRequest, TransactionResponse } from '@/types/serverResponses'

const homeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    sendTransaction: build.mutation<TransactionResponse, TransactionRequest>({
      query: body => ({
        url: '/api/transactions',
        method: 'POST',
        body,
      }),
      
    }),
  }),
})

export const { useSendTransactionMutation } = homeApi
