"use client";
// --- AÑADIDO: 'useEffect' para detectar el tamaño de la ventana ---
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';
import { User, ShoppingCart, Search, Bookmark, Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// --- AÑADIDO: Importaciones para el carrito ---
import { useCart } from '@/components/context/cartContext';
import CartModal from '@/components/shop/cartModal';
import CartSidebar from '@/components/shop/cartSidebar';

export default function Header() {
    const pathname = usePathname();
    const showShopIcons = pathname === '/shop';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const shopIconsRef = useRef(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    
    // --- AÑADIDO: Estados y hooks para el carrito ---
    const { itemCount } = useCart();
    const [isCartOpen, setCartOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // --- AÑADIDO: useEffect para detectar si la vista es móvil ---
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize(); // Llama una vez al cargar la página
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        if (showShopIcons && shopIconsRef.current) {
            const icons = shopIconsRef.current.children;
            gsap.set(icons, { opacity: 0, x: 50 });
            gsap.to(icons, { opacity: 1, x: 0, duration: 0.2, ease: "power1.out", stagger: 0.05 });
        }
    }, [showShopIcons]);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchClick = () => alert('Mostrar búsqueda');
    const handleBookmarkClick = () => alert('Mostrar guardados');

    // --- MODIFICADO: Esta función ahora abre el carrito ---
    const handleCartClick = () => {
        setCartOpen(true);
    };
    
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const handleMouseEnter = (menu) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);

    return (
        // --- AÑADIDO: Un React Fragment <> para poder renderizar los modales junto al header ---
        <>
            <header className={`header ${!isHeaderVisible ? 'hidden' : ''}`}>
                <div className="header-left">
                    <Link href="/" className="logo">
                        <span>Onovatech</span>
                    </Link>
                    <nav className="nav desktop-nav">
                        {/* Tu navegación de escritorio no ha cambiado */}
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
                                        <Link href="/shop/categories" onClick={() => setActiveDropdown(null)}>Categorías</Link>
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
                    <div className="desktop-icons">
                        {showShopIcons && (
                            <div ref={shopIconsRef} className="shop-icons-container">
                                <button className="icon-button" onClick={handleSearchClick}>
                                    <Search size={22}/>
                                </button>
                                {/* --- MODIFICADO: Botón del carrito con su wrapper y badge --- */}
                                <button className="icon-button cart-button-wrapper" onClick={handleCartClick}>
                                    <ShoppingCart size={22}/>
                                    {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                                </button>
                                <button className="icon-button" onClick={handleBookmarkClick}>
                                    <Bookmark size={22}/>
                                </button>
                            </div>
                        )}
                        <Link href="/login" className="icon-link">
                            <User size={22}/>
                        </Link>
                    </div>
                    
                    <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
                    </button>
                </div>
                
                <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                   {/* Tu menú móvil no ha cambiado. El botón de carrito aquí también llama a handleCartClick */}
                   <button className="mobile-menu-close" onClick={closeMobileMenu}>
                        <X size={23}/>
                    </button>
                    <nav className="mobile-nav">
                        <ul>
                           {/* ... tus enlaces de menú móvil ... */}
                        </ul>
                        
                        {showShopIcons && (
                            <div className="mobile-shop-icons">
                                <button className="icon-button" onClick={handleSearchClick}>
                                    <Search size={25}/> <span>Buscar</span>
                                </button>
                                {/* --- MODIFICADO: Este botón también abre el carrito --- */}
                                <button className="icon-button cart-button-wrapper" onClick={handleCartClick}>
                                    <ShoppingCart size={25}/> <span>Carrito</span>
                                    {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
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

            {/* --- AÑADIDO: Lógica que renderiza el modal o el sidebar fuera del <header> --- */}
            {isMobile ? (
                <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            ) : (
                <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            )}
        </>
    );
}