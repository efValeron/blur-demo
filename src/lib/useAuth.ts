import { useEffect, useState } from 'react'

import { tokenStorage } from '@/lib/tockenStorage'
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const accessToken = tokenStorage.getToken()

    setIsAuthenticated(!!accessToken)
  }, [])

  const logout = () => {
    tokenStorage.removeToken()
    setIsAuthenticated(false)
    window.location.reload()
  }

  return { isAuthenticated, logout }
}

export default useAuth
