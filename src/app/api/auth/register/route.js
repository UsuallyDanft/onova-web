import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Función para validar formato de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar fortaleza de contraseña
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  if (!hasUpperCase) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra mayúscula' };
  }
  if (!hasLowerCase) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra minúscula' };
  }
  if (!hasNumbers) {
    return { valid: false, message: 'La contraseña debe contener al menos un número' };
  }
  if (!hasSpecialChar) {
    return { valid: false, message: 'La contraseña debe contener al menos un carácter especial' };
  }

  return { valid: true };
}

// Función para verificar si un usuario ya existe
async function checkUserExists(identifier, username) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

  try {
    // Verificar por email
    const emailResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${encodeURIComponent(identifier)}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    if (emailResponse.ok) {
      const emailData = await emailResponse.json();
      if (emailData.data && emailData.data.length > 0) {
        return { exists: true, field: 'email', message: 'Este email ya está registrado' };
      }
    }

    // Verificar por username
    const usernameResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[username][$eq]=${encodeURIComponent(username)}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        },
      }
    );

    if (usernameResponse.ok) {
      const usernameData = await usernameResponse.json();
      if (usernameData.data && usernameData.data.length > 0) {
        return { exists: true, field: 'username', message: 'Este nombre de usuario ya está en uso' };
      }
    }

    return { exists: false };
  } catch (error) {
    console.error('Error verificando usuario existente:', error);
    return { exists: false }; // En caso de error, permitir registro
  }
}

export async function POST(request) {
  try {
    const { username, email, password, confirmPassword } = await request.json();

    // Validaciones básicas
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Las contraseñas no coinciden' },
        { status: 400 }
      );
    }

    // Validar fortaleza de contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const userCheck = await checkUserExists(email, username);
    if (userCheck.exists) {
      return NextResponse.json(
        { 
          error: userCheck.message,
          field: userCheck.field 
        },
        { status: 409 } // Conflict
      );
    }

    // Registrar usuario en Strapi
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejar errores específicos de Strapi
      if (data.error?.message?.includes('email')) {
        return NextResponse.json(
          { error: 'Este email ya está registrado', field: 'email' },
          { status: 409 }
        );
      }
      if (data.error?.message?.includes('username')) {
        return NextResponse.json(
          { error: 'Este nombre de usuario ya está en uso', field: 'username' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: data.error?.message || 'Error al crear la cuenta' },
        { status: 400 }
      );
    }

    // Configurar cookies seguras para el usuario recién registrado
    const cookieStore = cookies();
    
    // Cookie para el JWT
    cookieStore.set('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    });

    // Cookie para datos del usuario
    const userData = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      confirmed: data.user.confirmed,
      blocked: data.user.blocked,
    };

    cookieStore.set('user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    });

    return NextResponse.json({
      user: userData,
      message: 'Cuenta creada exitosamente'
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
