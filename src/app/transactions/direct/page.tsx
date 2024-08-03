import {ExchangeDirectToUser} from '@/components/direct-to-user-form';
export default function Transactions() {


  const currencies = [
    { value: 'ethereum', name: 'Ethereum', abbreviation: 'ETH' },
    { value: 'ripple', name: 'Ripple', abbreviation: 'XRP' },
    { value: 'tether', name: 'Tether', abbreviation: 'USDT' },
    { value: 'binancecoin', name: 'Binance Coin', abbreviation: 'BNB' },
    { value: 'solana', name: 'Solana', abbreviation: 'SOL' },
    { value: 'bitcoin', name: 'Bitcoin', abbreviation: 'BTC' },
    { value: 'usd', name: 'United States Dollar', abbreviation: 'USD' },
    { value: 'kzt', name: 'Kazakhstan Tenge', abbreviation: 'KZT' },
  ]


  return (


    
    <main className={'flex flex-col items-center gap-12'}>
      <h1 className={'scroll-m-20 text-3xl font-medium lg:text-4xl'}>Direct</h1>
  
      <ExchangeDirectToUser currencies={currencies}/>
    </main>
  )
}
