"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Importar el hook
import './Header.css';
import { User, ShoppingCart, Search, Bookmark, Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from "gsap"; // Importa gsap
import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP

export default function Header() {
    // ocultar y mostrar los botones de la tienda
    const pathname = usePathname();
    const showShopIcons = pathname === '/shop';
    
    // Estado para el menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Estados para los menús desplegables
    const [activeDropdown, setActiveDropdown] = useState(null);
    
    // Referencia para los iconos del shop
    const shopIconsRef = useRef(null);
    
    // Estados para el scroll
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    
    // Animación GSAP para los iconos del shop
    useGSAP(() => {
        if (showShopIcons && shopIconsRef.current) {
            const icons = shopIconsRef.current.children;
            
            // Configurar estado inicial de los iconos (desde la derecha)
            gsap.set(icons, {
                opacity: 0,
                x: 50
            });
            
            // Animar la entrada de los iconos deslizándose desde la derecha
            gsap.to(icons, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                ease: "power1.out",
                stagger: 0.05
            });
        }
    }, [showShopIcons]);
    
    // Efecto para detectar el scroll con dirección
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                // Scrolling hacia abajo y ya ha scrolled suficiente - ocultar header
                setIsHeaderVisible(false);
            } else {
                // Scrolling hacia arriba o cerca del top - mostrar header
                setIsHeaderVisible(true);
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    
    // Funciones para manejar los menús desplegables
    const handleMouseEnter = (menu) => {
        setActiveDropdown(menu);
    };
    
    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <header className={`header ${!isHeaderVisible ? 'hidden' : ''}`}>
            <div className="header-left">
                <Link href="/" className="logo">
                    <span>Onovatech</span>
                </Link>
            
                {/* Navegación para escritorio */}
                <nav className="nav desktop-nav">
                    <ul>
                        <li 
                            className="dropdown-item" 
                            onMouseEnter={() => handleMouseEnter('tienda')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>
                                Tienda <ChevronDown size={16} className="dropdown-icon" />
                            </Link>
                            {activeDropdown === 'tienda' && (
                                <div className="dropdown-menu">
                                    <Link href="/shop/categorias" onClick={() => setActiveDropdown(null)}>Categorías</Link>
                                    <Link href="/shop/ofertas" onClick={() => setActiveDropdown(null)}>Ofertas</Link>
                                    <Link href="/shop/noticias" onClick={() => setActiveDropdown(null)}>Noticias</Link>
                                </div>
                            )}
                        </li>
                        <li 
                            className="dropdown-item" 
                            onMouseEnter={() => handleMouseEnter('comunidad')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/comunidad" className={pathname === '/comunidad' ? 'active' : ''}>
                                Comunidad <ChevronDown size={16} className="dropdown-icon" />
                            </Link>
                            {activeDropdown === 'comunidad' && (
                                <div className="dropdown-menu">
                                    <Link href="/comunidad/tutoriales" onClick={() => setActiveDropdown(null)}>Tutoriales</Link>
                                    <Link href="/comunidad/foros" onClick={() => setActiveDropdown(null)}>Foros</Link>
                                    <Link href="/comunidad/noticias" onClick={() => setActiveDropdown(null)}>Noticias</Link>
                                </div>
                            )}
                        </li>
                        <li><Link href="/servicios" className={pathname === '/servicios' ? 'active' : ''}>Servicios</Link></li>
                        <li><Link href="/contacto" className={pathname === '/contacto' ? 'active' : ''}>Contacto</Link></li>
                    </ul>
                </nav>
            </div>

            <div className='header-right'>
                {/* Iconos de la tienda para escritorio */}
                <div className="desktop-icons">
                    {showShopIcons && (
                        <div ref={shopIconsRef} className="shop-icons-container">
                            <button className="icon-button" onClick={handleSearchClick}>
                                <Search size={25}/>
                            </button>
                            <button className="icon-button" onClick={handleCartClick}>
                                <ShoppingCart size={25}/>
                            </button>
                            <button className="icon-button" onClick={handleBookmarkClick}>
                                <Bookmark size={25}/>
                            </button>
                        </div>
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
                        <li><Link href="/shop" onClick={closeMobileMenu} className={pathname === '/shop' ? 'active' : ''}>Tienda</Link></li>
                        <li><Link href="/comunidad" onClick={closeMobileMenu} className={pathname === '/comunidad' ? 'active' : ''}>Comunidad</Link></li>
                        <li><Link href="/servicios" onClick={closeMobileMenu} className={pathname === '/servicios' ? 'active' : ''}>Servicios</Link></li>
                        <li><Link href="/contacto" onClick={closeMobileMenu} className={pathname === '/contacto' ? 'active' : ''}>Contacto</Link></li>
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