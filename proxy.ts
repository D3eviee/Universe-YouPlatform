import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // const isAuthenticated = request.cookies.has('auth-token');
  // const path = request.nextUrl.pathname;

  // if (!isAuthenticated && path.startsWith('/dashboard') && path !== '/dashboard/auth') {
  //   const loginUrl = new URL('/dashboard/auth', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (isAuthenticated && path === '/dashboard/auth') {
  //   const dashboardUrl = new URL('/dashboard', request.url);
  //   return NextResponse.redirect(dashboardUrl);
  // }

  // W każdym innym przypadku przepuść żądanie dalej
  return NextResponse.next();
}

// Konfiguracja: na jakich ścieżkach Middleware ma się w ogóle uruchamiać?
// Optymalizujemy wydajność, żeby nie odpalał się na obrazkach, CSS itp.
export const config = {
  matcher: ['/dashboard/:path*'],
};