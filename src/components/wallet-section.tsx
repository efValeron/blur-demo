'use client'

import { useEffect, useState } from 'react'

import { BankCard } from '@/components/bank-card'
import { Card, CardContent } from '@/components/ui/card'
import useAuth from '@/lib/useAuth'
import { User } from '@/types/instances'

export const WalletSection = () => {
  const { getUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = getUser()

    setUser(userData)
  }, [])

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardContent className={'grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:gap-4'}>
        <div>
          <span
            className={'flex text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}
          >
            Welcome back,{' '}
            {user ? (
              user.preferred_username
            ) : (
              <span className={'m-1 h-5 w-64 animate-pulse rounded-md bg-card-foreground/25'} />
            )}
            !
          </span>
          <span className={'flex items-center text-lg'}>
            {user ? (
              user.email
            ) : (
              <div className={'m-1 h-5 w-64 animate-pulse rounded-md bg-card-foreground/25'} />
            )}
          </span>
          {/*<Button variant={'linkHover2'} size={'lg'}>Transfer to user</Button>*/}
          {/*<Button variant={'linkHover2'} size={'lg'}>Transfer to user</Button>*/}
        </div>
        <BankCard className={'max-sm:row-start-1 max-sm:-m-4'} />
      </CardContent>
    </Card>
  )
}
