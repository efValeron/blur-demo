import { ExchangeRate } from '@/types/instances'

export type LoginResponse = {
  accessToken: string
}

export type SignupResponse = {
  accessToken: string
}

export type GetExchangeRates = ExchangeRate[]
