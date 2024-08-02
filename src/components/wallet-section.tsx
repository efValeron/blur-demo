'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import useAuth from '@/lib/useAuth'

export const WalletSection = () => {
  const { getUser } = useAuth()
  const user = getUser()

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
        Wallet
      </CardHeader>
      <CardContent>
        <>
          <span className={'flex items-center text-lg'}>
            {user ? (
              'Email: ' + user.email
            ) : (
              <div className={'m-1 h-5 w-64 animate-pulse rounded-md bg-card-foreground/25'} />
            )}
          </span>
          <span className={'flex items-center text-lg'}>
            {user ? (
              'Username: ' + user.preferred_username
            ) : (
              <div className={'m-1 h-5 w-64 animate-pulse rounded-md bg-card-foreground/25'} />
            )}
          </span>
        </>
      </CardContent>
    </Card>
  )
}
