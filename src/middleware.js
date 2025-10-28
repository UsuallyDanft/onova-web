import { NextResponse } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/shop/checkout',
  '/profile',
  '/dashboard',
  '/admin'
];

// Rutas de autenticación (redirigir si ya está logueado)
const authRoutes = [
  '/login',
  '/signup'
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get('jwt')?.value;

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Verificar si es una ruta de autenticación
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Si es ruta protegida y no hay JWT, redirigir a login
  if (isProtectedRoute && !jwt) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si es ruta de auth y hay JWT, redirigir a home
  if (isAuthRoute && jwt) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
