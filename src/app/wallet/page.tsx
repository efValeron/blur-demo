import { BalanceSection } from '@/components/balance-section'
import { ExchangeCurrencySection } from '@/components/exchange-currency-section'
import { WalletSection } from '@/components/wallet-section'

export default function Wallet() {
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
    <main className={'flex flex-col gap-4'}>
      <WalletSection />
      <BalanceSection currencies={currencies} />
      <ExchangeCurrencySection currencies={currencies} />
    </main>
  )
}
