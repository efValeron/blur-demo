'use client'

import { useGetExchangeRatesQuery } from '@/app/rates/api'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ExchangeRate } from '@/types/instances'
import { Ping } from '@uiball/loaders'

const exchangeRates: ExchangeRate[] = [
  {
    id: 1,
    currency: 'Solana',
    rateToUsd: 1.18,
    rateToKzt: 505.5,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 2,
    currency: 'Ethereum',
    rateToUsd: 1.38,
    rateToKzt: 590.0,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 3,
    currency: 'JPY',
    rateToUsd: 0.0091,
    rateToKzt: 3.89,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 4,
    currency: 'CNY',
    rateToUsd: 0.15,
    rateToKzt: 64.5,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 5,
    currency: 'RUB',
    rateToUsd: 0.013,
    rateToKzt: 5.6,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 6,
    currency: 'AUD',
    rateToUsd: 0.74,
    rateToKzt: 315.8,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 7,
    currency: 'CAD',
    rateToUsd: 0.79,
    rateToKzt: 337.6,
    timestamp: '2024-07-28T10:00:00Z',
  },
  {
    id: 8,
    currency: 'CHF',
    rateToUsd: 1.09,
    rateToKzt: 464.4,
    timestamp: '2024-07-28T10:00:00Z',
  },
]

export const ExchangeRatesList = () => {
  const { data, isLoading, isError } = useGetExchangeRatesQuery()

  return (
    <>
      {isLoading && (
        <div className={'mt-16 flex items-center justify-center'}>
          <Ping size={50} speed={1.3} color={'hsl(var(--card-foreground))'} />
        </div>
      )}
      {isError && (
        <div className={'mt-16 flex items-center justify-center'}>
          <span>Error while fetching exchange rates</span>
        </div>
      )}
      {!isLoading && exchangeRates && (
        <Table>
          <TableHeader>
            <TableRow className={'font-medium hover:bg-card md:text-lg'}>
              <TableHead className={'w-4/12 text-card-foreground/70 md:w-5/12'}>Currency</TableHead>
              <TableHead className={'text-center text-card-foreground/70'}>To USD</TableHead>
              <TableHead className={'text-center text-card-foreground/70'}>To KZT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={'text-base md:text-lg'}>
            {exchangeRates.map(rate => (
              <TableRow key={rate.id} className={'hover:bg-card'}>
                <TableHead className={'w-[100px] text-card-foreground'}>{rate.currency}</TableHead>
                <TableHead className={'text-center text-card-foreground'}>
                  {rate.rateToUsd}
                </TableHead>
                <TableHead className={'text-center text-card-foreground'}>
                  {rate.rateToKzt}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
