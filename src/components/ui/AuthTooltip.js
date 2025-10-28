// src/components/ui/AuthTooltip.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import './AuthTooltip.css';

const AuthTooltip = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Resetear estado de carga cuando el tooltip se cierre
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginClick = (e) => {
    if (isLoading) {
      e.preventDefault(); // Prevenir navegación si está cargando
      return;
    }
    setIsLoading(true);
    
    // Obtener la URL actual para redireccionar después del login
    const currentPath = window.location.pathname;
    const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
    
    // Cerrar el tooltip y el modal padre
    setTimeout(() => {
      onClose();
      // Redirigir a login con el parámetro redirect
      router.push(loginUrl);
    }, 100); // Pequeño delay para mostrar el estado de carga
  };

  const handleOverlayClick = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div className="auth-tooltip-overlay" onClick={handleOverlayClick}>
      <div className="auth-tooltip" onClick={e => e.stopPropagation()}>
        <p>Inicia sesión para proceder al pago</p>
        <button 
          className={`auth-tooltip-link ${isLoading ? 'loading' : ''}`}
          onClick={handleLoginClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="spinner" />
              Cargando...
            </>
          ) : (
            'Ir a iniciar sesión'
          )}
        </button>
      </div>
    </div>
  );
};

export default AuthTooltip;
