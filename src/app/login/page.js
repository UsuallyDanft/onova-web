// src/app/login/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '@/components/context/authContext';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.identifier, formData.password);
      
      if (result.success) {
        const redirectTo = searchParams.get('redirect') || '/';
        router.push(redirectTo);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <button 
          className="close-button"
          onClick={handleGoBack}
          title="Volver a la página anterior"
        >
          <X size={20} />
        </button>
        
        <div className="login-header">
          <h1 className="welcome-title">Bienvenido de Nuevo</h1>
          <p className="welcome-subtitle">Inicia sesión para continuar</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              name="identifier" 
              placeholder="Correo Electrónico" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type={isPasswordVisible ? 'text' : 'password'}
              name="password" 
              placeholder="Contraseña"
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
          <div className="form-actions">
            <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            <LogIn size={20} />
            <span>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</span>
          </button>
        </form>
        
        <div className="signup-link">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link href="/signup">
              Regístrate aquí
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}