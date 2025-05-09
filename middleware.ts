import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthenticated = !!session
  
  // Define protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/documents')
  
  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/documents/:path*']
}


