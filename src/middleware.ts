import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Only redirect HTML navigation requests
  if (!req.headers.get('accept')?.includes('text/html')) {
    return NextResponse.next()
  }

  const cookies = req.headers
    .get('cookie')
    ?.split('; ')
    .reduce((prev, curr) => {
      const [key, value] = curr.split('=')
      prev[key] = value
      return prev
    }, {} as Record<string, string>)

  const token = cookies?.['token']
  const url = req.nextUrl.clone()

  if (!token) {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.next()
    }
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (req.nextUrl.pathname === '/login') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
