"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Importar el hook
import './Header.css';
import { User, ShoppingCart, Search, Bookmark, Menu, X } from 'lucide-react';
import { gsap } from "gsap"; // Importa gsap
import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP

export default function Header() {
    // ocultar y mostrar los botones de la tienda
    const pathname = usePathname();
    const showShopIcons = pathname === '/shop';
    
    // Estado para el menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchClick = () => alert('Mostrar búsqueda');
    const handleCartClick = () => alert('Mostrar carrito');
    const handleBookmarkClick = () => alert('Mostrar guardados');
    
    // Función para alternar el menú móvil
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    // Función para cerrar el menú móvil al hacer clic en un enlace
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link href="/" className="logo">
                    <span>Onovatech</span>
                </Link>
            
                {/* Navegación para escritorio */}
                <nav className="nav desktop-nav">
                    <ul>
                        <li><Link href="/shop">Tienda</Link></li>
                        <li><Link href="/comunidad">Comunidad</Link></li>
                        <li><Link href="/servicios">Servicios</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                    </ul>
                </nav>
            </div>

            <div className='header-right'>
                {/* Iconos de la tienda para escritorio */}
                <div className="desktop-icons">
                    {showShopIcons && (
                        <>
                            <button className="icon-button" onClick={handleSearchClick}>
                                <Search size={25}/>
                            </button>
                            <button className="icon-button" onClick={handleCartClick}>
                                <ShoppingCart size={25}/>
                            </button>
                            <button className="icon-button" onClick={handleBookmarkClick}>
                                <Bookmark size={25}/>
                            </button>
                        </>
                    )}
                    
                    <Link href="/login" className="icon-link">
                        <User size={25}/>
                    </Link>
                </div>
                
                {/* Botón hamburguesa para móvil */}
                <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={25}/> : <Menu size={25}/>}
                </button>
            </div>
            
            {/* Menú móvil deslizable */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                {/* Botón X para cerrar el menú */}
                <button className="mobile-menu-close" onClick={closeMobileMenu}>
                    <X size={24}/>
                </button>
                
                <nav className="mobile-nav">
                    <ul>
                        <li><Link href="/shop" onClick={closeMobileMenu}>Tienda</Link></li>
                        <li><Link href="/comunidad" onClick={closeMobileMenu}>Comunidad</Link></li>
                        <li><Link href="/servicios" onClick={closeMobileMenu}>Servicios</Link></li>
                        <li><Link href="/contacto" onClick={closeMobileMenu}>Contacto</Link></li>
                    </ul>
                    
                    {/* Iconos de la tienda para móvil */}
                    {showShopIcons && (
                        <div className="mobile-shop-icons">
                            <button className="icon-button" onClick={handleSearchClick}>
                                <Search size={25}/> <span>Buscar</span>
                            </button>
                            <button className="icon-button" onClick={handleCartClick}>
                                <ShoppingCart size={25}/> <span>Carrito</span>
                            </button>
                            <button className="icon-button" onClick={handleBookmarkClick}>
                                <Bookmark size={25}/> <span>Guardados</span>
                            </button>
                        </div>
                    )}
                    
                    <div className="mobile-user">
                        <Link href="/login" className="icon-link" onClick={closeMobileMenu}>
                            <User size={25}/> <span>Iniciar Sesión</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}