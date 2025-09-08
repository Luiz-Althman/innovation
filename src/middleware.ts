import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value
  const pathname = req.nextUrl.pathname

  const isLoginPage = pathname === '/'
  const isProdutosPage = pathname.startsWith('/produtos')

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/produtos', req.url))
  }

  if (!token && isProdutosPage) {
    const redirectUrl = req.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/produtos/:path*'],
}
