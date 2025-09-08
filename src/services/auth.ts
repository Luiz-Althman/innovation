import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export function saveAuthToken(token: string, remember: boolean) {
  setCookie('auth_token', token, {
    path: '/',
    maxAge: remember ? 60 * 60 * 24 * 365 * 10 : undefined,
  })
}

export function getAuthToken(): string | null {
  return getCookie('auth_token')?.toString() || null
}

export function removeAuthToken() {
  deleteCookie('auth_token')
}
