import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Only ADMINs can access /admin and /api/admin
  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
  if (isAdminPath) {
    if (!token) {
      // If it's an API route, return 401 JSON; otherwise redirect to login
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname + (search || ''))
      return NextResponse.redirect(loginUrl)
    }
    // Role check
    // @ts-expect-error injected in jwt callback
    if (token.role !== 'ADMIN') {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
