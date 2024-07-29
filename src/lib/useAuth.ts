import { useEffect, useState } from 'react'

import { parseJwt } from '@/lib/parseJwt'
import { userStorage } from '@/lib/userStorage'
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const accessToken = userStorage.getUser()

    setIsAuthenticated(!!accessToken)
  }, [])

  const setUser = (accessToken: string) => {
    const user = parseJwt(accessToken)

    userStorage.setUser(JSON.stringify(user))
  }

  const logout = () => {
    userStorage.removeUser()
    setIsAuthenticated(false)
    window.location.reload()
  }

  return { isAuthenticated, logout, setUser }
}

export default useAuth
