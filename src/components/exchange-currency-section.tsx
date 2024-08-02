'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useExchangeCurrenciesMutation } from '@/app/wallet/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getErrorMessage } from '@/lib/errorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

const exchangeSchema = z.object({
  fromCurrency: z.string().min(1),
  toCurrency: z.string().min(1),
  amount: z.preprocess(val => Number(val), z.number().min(0)),
})

export type ExchangeFields = z.infer<typeof exchangeSchema>

export const ExchangeCurrencySection = ({
  currencies,
}: {
  currencies: { value: string; name: string; abbreviation: string }[]
}) => {
  const [exchangeCurrencies, { isLoading, isError, error }] = useExchangeCurrenciesMutation()
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  const form = useForm<ExchangeFields>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      fromCurrency: '',
      toCurrency: '',
      amount: 0,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = form

  const onSubmit = (data: ExchangeFields) => {
    exchangeCurrencies({
      fromCurrency: data.fromCurrency,
      toCurrency: data.toCurrency,
      amount: Number(data.amount),
    })
      .unwrap()
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
        Exchange Currency
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}>
              <FormField
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-lg'}>From Currency</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          setFromCurrency(value)
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className={'text-left text-card-foreground'}>
                          <SelectValue placeholder={'Select a currency'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {currencies.map(currency => (
                              <SelectItem
                                key={currency.value}
                                className={'text-card-foreground'}
                                value={currency.value}
                                disabled={currency.value === toCurrency}
                              >
                                {currency.abbreviation} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'fromCurrency'}
              />
              <FormField
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-lg'}>To Currency</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          setToCurrency(value)
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className={'text-card-foreground'}>
                          <SelectValue placeholder={'Select a currency'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {currencies.map(currency => (
                              <SelectItem
                                key={currency.value}
                                className={'text-card-foreground'}
                                value={currency.value}
                                disabled={currency.value === fromCurrency}
                              >
                                {currency.abbreviation} - {currency.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'toCurrency'}
              />
            </div>
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-lg'}>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type={'number'} min={0} placeholder={'Amount'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'amount'}
            />
            <Button className={'w-full'} disabled={isLoading || !isValid}>
              {isLoading ? (
                <>
                  <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />
                  Please wait
                </>
              ) : (
                'Exchange'
              )}
            </Button>
            {isError && (
              <div
                className={
                  'rounded-md border border-destructive/60 bg-destructive/10 py-2 text-center text-sm text-destructive'
                }
              >
                {getErrorMessage(error)}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
