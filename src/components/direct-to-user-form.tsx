'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSendTransactionMutation } from '@/app/transactions/direct/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'; // forwardRef Input
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getErrorMessage } from '@/lib/errorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

const exchangeSchema = z.object({
  fromCurrency: z.string().min(1, 'From currency is required'),
  toUsername: z.string().min(1, 'Username is required'),
  amount: z.preprocess(val => Number(val), z.number().min(0, 'Amount must be positive')),
});

export type ExchangeFields = z.infer<typeof exchangeSchema>;

export const ExchangeDirectToUser = ({ currencies }: { currencies: { value: string; name: string; abbreviation: string }[] }) => {
  const [sendTransaction, { isLoading, isError, error }] = useSendTransactionMutation();

  const form = useForm<ExchangeFields>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      fromCurrency: '',
      toUsername: '',
      amount: 0,
    },
  });

  const { control, handleSubmit, formState: { isValid } } = form;

  const onSubmit = async (data: ExchangeFields) => {
    try {
      await sendTransaction({
        fromWalletId: data.fromCurrency,
        toWalletId: data.toUsername,
        amount: data.amount,
        currency: data.fromCurrency,
        transactionType: 'Direct_Transfer_To_Wallet',
      }).unwrap();
      window.location.reload();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Card className={"container mx-auto max-w-[800px] max-md:px-0.5"}>
      <CardHeader className={"text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center w-full"}>
        Receiver’s Username
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={"space-y-4"} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name={"toUsername"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"text-lg"}>Username</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      {...field}
                      placeholder={"Username"}
                      className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={"grid grid-cols-1 gap-4 sm:grid-cols-2"}>
              <FormField
                control={control}
                name={"fromCurrency"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg"}>Select Currency</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className={"text-left text-card-foreground"}>
                          <SelectValue placeholder={"Select a currency"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {currencies.map(currency => (
                              <SelectItem
                                key={currency.value}
                                className={"text-card-foreground"}
                                value={currency.value}
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
              />

              <FormField
                control={control}
                name={"amount"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"text-lg"}>Type Amount</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()} // Преобразование значения в строку
                      >
                        <SelectTrigger className={"text-left text-card-foreground"}>
                          <SelectValue placeholder={"Select an amount"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"10"}>10</SelectItem>
                            <SelectItem value={"20"}>20</SelectItem>
                            <SelectItem value={"50"}>50</SelectItem>
                            <SelectItem value={"100"}>100</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className={"flex justify-center"}>
              <Button className={"w-96"} disabled={isLoading || !isValid}>
                {isLoading ? (
                  <>
                    <Loader2 className={"mr-2 h-4 w-4 animate-spin"} />
                    Please wait
                  </>
                ) : (
                  'Send'
                )}
              </Button>
            </div>

            {isError && (
              <div className={"rounded-md border border-destructive/60 bg-destructive/10 py-2 text-center text-sm text-destructive"}>
                {getErrorMessage(error)}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
