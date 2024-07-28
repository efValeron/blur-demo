const TOKEN_KEY = 'accessToken'

export const tokenStorage = {
  getToken: () => {
    return window.localStorage.getItem(TOKEN_KEY)
  },
  removeToken: () => {
    return window.localStorage.removeItem(TOKEN_KEY)
  },
  setToken: (token: string) => {
    return window.localStorage.setItem(TOKEN_KEY, token)
  },
}
