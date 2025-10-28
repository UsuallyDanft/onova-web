import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value;
    const userCookie = cookieStore.get('user')?.value;

    if (!jwt || !userCookie) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Verificar si el token ha expirado
    try {
      const tokenPayload = JSON.parse(atob(jwt.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (tokenPayload.exp < currentTime) {
        // Token expirado, limpiar cookies
        cookieStore.delete('jwt');
        cookieStore.delete('user');
        
        return NextResponse.json(
          { error: 'Token expirado' },
          { status: 401 }
        );
      }
    } catch (error) {
      // Token inválido, limpiar cookies
      cookieStore.delete('jwt');
      cookieStore.delete('user');
      
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Verificar con Strapi que el token sigue siendo válido
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      // Token inválido en Strapi, limpiar cookies
      cookieStore.delete('jwt');
      cookieStore.delete('user');
      
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const userData = JSON.parse(userCookie);
    return NextResponse.json({ user: userData });

  } catch (error) {
    console.error('Error verificando autenticación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
