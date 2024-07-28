import { AuthCheck } from '@/components/auth-check'

export default function Wallet() {
  return (
    <AuthCheck>
      <main className={'flex h-screen justify-center'}>
        <h1 className={'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'}>Wallet</h1>
      </main>
    </AuthCheck>
  )
}
