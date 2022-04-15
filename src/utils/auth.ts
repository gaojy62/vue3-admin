import Cookies from 'js-cookie'

const TOKEN_KEY = 'whoami'

export function getToken () {
  // return '123'
  return Cookies.get(TOKEN_KEY)
}

export function setToken (token: string) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken () {
  return Cookies.remove(TOKEN_KEY)
}
