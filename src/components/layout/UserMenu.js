"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ShoppingBag, ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/context/authContext';
import './UserMenu.css';

export default function UserMenu() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="user-menu-spinner-container">
        <div className="user-menu-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/login" className="icon-link">
        <User size={22} />
      </Link>
    );
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="user-avatar">
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-avatar-large">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.username || 'Usuario'}</p>
              <p className="user-email">{user?.email || ''}</p>
            </div>
          </div>

          <div className="user-menu-divider"></div>

          <nav className="user-menu-nav">
            <Link 
              href="/perfil" 
              className="user-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} />
              <span>Mi Perfil</span>
            </Link>
            <Link 
              href="/pedidos" 
              className="user-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={18} />
              <span>Mis Pedidos</span>
            </Link>
            <Link 
              href="/configuracion" 
              className="user-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={18} />
              <span>Configuración</span>
            </Link>
          </nav>

          <div className="user-menu-divider"></div>
          
          <div className="logout-button-container">
            <button 
              className="user-menu-item logout-button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}