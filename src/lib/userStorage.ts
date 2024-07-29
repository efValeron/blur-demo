const KEY = 'user'

export const userStorage = {
  getUser: () => {
    return window.localStorage.getItem(KEY)
  },
  removeUser: () => {
    return window.localStorage.removeItem(KEY)
  },
  setUser: (user: string) => {
    return window.localStorage.setItem(KEY, user)
  },
}
