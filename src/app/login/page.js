// src/app/login/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Credenciales incorrectas.');
      }
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
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