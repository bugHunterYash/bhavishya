import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/parent', '/student', '/teacher', '/principal', '/superadmin']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  if (isProtectedRoute) {
    const sessionCookie = req.cookies.get('session')?.value
    const session = await decrypt(sessionCookie)

    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Role-based authorization
    const roleMap: Record<string, string[]> = {
      '/parent': ['PARENT'],
      '/student': ['STUDENT'],
      '/teacher': ['TEACHER'],
      '/principal': ['PRINCIPAL'],
      '/superadmin': ['SUPER_ADMIN']
    }

    for (const route of Object.keys(roleMap)) {
      if (path.startsWith(route)) {
        if (!roleMap[route].includes(session.role)) {
          return NextResponse.redirect(new URL('/unauthorized', req.nextUrl))
        }
      }
    }
  }

  // Redirect root to login if no session, or to dashboard if session exists
  if (path === '/') {
    const sessionCookie = req.cookies.get('session')?.value
    const session = await decrypt(sessionCookie)
    if (session?.userId) {
      if (session.role === 'PARENT') return NextResponse.redirect(new URL('/parent', req.nextUrl))
      if (session.role === 'STUDENT') return NextResponse.redirect(new URL('/student', req.nextUrl))
      if (session.role === 'TEACHER') return NextResponse.redirect(new URL('/teacher', req.nextUrl))
      if (session.role === 'PRINCIPAL') return NextResponse.redirect(new URL('/principal', req.nextUrl))
      if (session.role === 'SUPER_ADMIN') return NextResponse.redirect(new URL('/superadmin', req.nextUrl))
    } else {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
