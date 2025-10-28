// src/app/signup/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle, X } from 'lucide-react';
import { useAuth } from '@/components/context/authContext';
import Tooltip from '@/components/ui/Tooltip';
import './SignupPage.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showSuccessTooltip, setShowSuccessTooltip] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, refreshSession } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar errores del campo cuando el usuario empiece a escribir
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }

    // Validar fortaleza de contraseña en tiempo real
    if (name === 'password') {
      validatePasswordStrength(value);
    }
  };

  const handleGoBack = () => {
    // Si hay un parámetro redirect, volver a esa página
    const redirectTo = searchParams.get('redirect');
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      // Si no hay redirect, volver a la página anterior en el historial
      router.back();
    }
  };

  const validatePasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validaciones del lado del cliente
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    // Verificar que todas las validaciones de contraseña pasen
    const allValidationsPass = Object.values(passwordStrength).every(Boolean);
    if (!allValidationsPass) {
      setError('La contraseña no cumple con todos los requisitos de seguridad.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso, mostrar tooltip y refrescar sesión
        setShowSuccessTooltip(true);
        setError('');
        setFieldErrors({});
        
        // Refrescar la sesión para actualizar el contexto de autenticación
        await refreshSession();
        
        // Redirigir después de mostrar el tooltip
        setTimeout(() => {
          const redirectTo = searchParams.get('redirect') || '/';
          router.push(redirectTo);
        }, 2000);
      } else {
        // Manejar errores específicos de campo
        if (data.field) {
          setFieldErrors({ [data.field]: data.error });
        } else {
          setError(data.error);
        }
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        <button 
          className="close-button"
          onClick={handleGoBack}
          title="Volver a la página anterior"
        >
          <X size={20} />
        </button>
        
        {/* --- TÍTULO RESTAURADO --- */}
        <div className="signup-header">
          <h1 className="welcome-title">Crear una Cuenta</h1>
          <p className="welcome-subtitle">Únete a Onovatech hoy mismo</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              name="username" 
              placeholder="Nombre de Usuario" 
              value={formData.username}
              onChange={handleChange} 
              required 
            />
            {fieldErrors.username && <p className="field-error">{fieldErrors.username}</p>}
          </div>
          
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              name="email" 
              placeholder="Correo Electrónico" 
              value={formData.email}
              onChange={handleChange} 
              required 
            />
            {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <button
              type="button"
              className="password-toggle-icon"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Indicador de fortaleza de contraseña */}
          {formData.password && (
            <div className="password-strength">
              <h4>Requisitos de contraseña:</h4>
              <div className="strength-item">
                {passwordStrength.length ? <CheckCircle size={16} className="check" /> : <XCircle size={16} className="cross" />}
                <span>Al menos 8 caracteres</span>
              </div>
              <div className="strength-item">
                {passwordStrength.uppercase ? <CheckCircle size={16} className="check" /> : <XCircle size={16} className="cross" />}
                <span>Una letra mayúscula</span>
              </div>
              <div className="strength-item">
                {passwordStrength.lowercase ? <CheckCircle size={16} className="check" /> : <XCircle size={16} className="cross" />}
                <span>Una letra minúscula</span>
              </div>
              <div className="strength-item">
                {passwordStrength.number ? <CheckCircle size={16} className="check" /> : <XCircle size={16} className="cross" />}
                <span>Un número</span>
              </div>
              <div className="strength-item">
                {passwordStrength.special ? <CheckCircle size={16} className="check" /> : <XCircle size={16} className="cross" />}
                <span>Un carácter especial</span>
              </div>
            </div>
          )}
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
            <button
              type="button"
              className="password-toggle-icon"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            >
              {isConfirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <Tooltip
            text="¡Cuenta creada exitosamente! Bienvenido a Onovatech."
            position="top"
            isOpen={showSuccessTooltip}
            trigger="manual"
          >
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </Tooltip>
        </form>

        {/* --- ENLACE A LOGIN RESTAURADO --- */}
        <div className="login-link">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login">
              Inicia sesión aquí
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}