'use client'

import { useGetExchangeRatesQuery } from '@/app/rates/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Ping } from '@uiball/loaders'

export const ExchangeRatesList = () => {
  const { data: exchangeRates, isLoading, isError } = useGetExchangeRatesQuery()

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
            {exchangeRates.length ? (
              exchangeRates.map(rate => (
                <TableRow key={rate.id} className={'hover:bg-card'}>
                  <TableHead className={'w-[100px] text-card-foreground'}>
                    {rate.currency}
                  </TableHead>
                  <TableHead className={'text-center text-card-foreground'}>
                    {rate.rateToUsd}
                  </TableHead>
                  <TableHead className={'text-center text-card-foreground'}>
                    {rate.rateToKzt}
                  </TableHead>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className={'h-24 text-center'}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}
