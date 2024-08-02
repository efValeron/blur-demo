import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/wallet', '/transactions']

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')

  const isAuthenticated = !!accessToken

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/auth/login', req.nextUrl.origin)

    return NextResponse.redirect(absoluteURL.toString())
  }
}
