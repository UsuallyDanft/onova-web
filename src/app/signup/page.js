// src/app/signup/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './SignupPage.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const router = useRouter();
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...payload } = formData;
      const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Ocurrió un error en el registro.');
      }
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        
        {/* --- TÍTULO RESTAURADO --- */}
        <div className="signup-header">
          <h1 className="welcome-title">Crear una Cuenta</h1>
          <p className="welcome-subtitle">Únete a Onovatech hoy mismo</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input type="text" name="username" placeholder="Nombre de Usuario" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
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
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
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
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
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