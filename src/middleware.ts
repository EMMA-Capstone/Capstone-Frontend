import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export const runtime = 'nodejs'

export async function middleware(req: NextRequest) {
  console.log('🧩 Middleware triggered on:', req.nextUrl.pathname)

  const token = req.cookies.get('Authorization')?.value
  const loginUrl = new URL('/login', req.url)
  const dashboardUrl = new URL('/dashboard', req.url)

  // 🟡 Handle root redirect early
  if (req.nextUrl.pathname === '/') {
    if (!token) {
      console.log('🏠 Root accessed without token → Redirect to /login')
      return NextResponse.redirect(loginUrl)
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
      const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token
      await jose.jwtVerify(cleanedToken, secret)
      console.log('🏠 Root accessed with valid token → Redirect to /dashboard')
      return NextResponse.redirect(dashboardUrl)
    } catch {
      console.log('🏠 Invalid token on root → Redirect to /login')
      return NextResponse.redirect(loginUrl)
    }
  }

  // 🟢 Allow public routes
  if (
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register') ||
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname === '/favicon.ico'
  ) {
    // Redirect logged-in user visiting /login or /register
    if (token && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
        const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token
        await jose.jwtVerify(cleanedToken, secret)
        console.log('🔐 Logged in user visiting public route → Redirect to /dashboard')
        return NextResponse.redirect(dashboardUrl)
      } catch {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  // 🔴 Protected routes: require token
  if (!token) {
    console.log('🚫 No token found → Redirecting to /login')
    return NextResponse.redirect(loginUrl)
  }

  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
    await jose.jwtVerify(cleanedToken, secret)
    console.log('✅ Token valid → Continue')
    return NextResponse.next()
  } catch (err) {
    console.error('❌ Invalid or expired token:', err)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/',                  // ✅ root path now handled
    '/dashboard/:path*',
    '/history/:path*',
    '/login',
    '/register',
    '/settings/:path*',
  ],
}
