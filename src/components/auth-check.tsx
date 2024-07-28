'use client'

import { ReactNode, useEffect } from 'react'

import { tokenStorage } from '@/lib/tockenStorage'
import { useRouter } from 'next/navigation'

export const AuthCheck = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = tokenStorage.getToken()

    if (!accessToken) {
      router.replace('/auth/login')
    }
  }, [router])

  return <>{children}</>
}
