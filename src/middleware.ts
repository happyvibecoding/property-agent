import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// For this demo, we'll let the client-side auth handle redirects
// In a production app, you'd validate JWT tokens here
const publicRoutes = ['/login', '/signup', '/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow all routes for now - client-side auth will handle redirects
  // In production, implement proper server-side auth validation
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}