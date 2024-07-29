'use client'

import { ReactNode, useEffect } from 'react'

import { userStorage } from '@/lib/userStorage'
import { useRouter } from 'next/navigation'

export const AuthCheck = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    const user = userStorage.getUser()

    if (!user) {
      router.replace('/auth/login')
    }
  }, [router])

  return <>{children}</>
}
