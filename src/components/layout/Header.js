"use client";
// --- 'useEffect' para detectar el tamaño de la ventana ---
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';
import { User, ShoppingCart, Search, Bookmark, Menu, X, ChevronDown } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// --- Importaciones para el carrito ---
import { useCart } from '@/components/context/cartContext';
import CartModal from '@/components/shop/cartModal';
import CartSidebar from '@/components/shop/cartSidebar';
import SearchModal from '@/components/shop/SearchModal';

export default function Header() {
    const pathname = usePathname();
    const showShopIcons = pathname?.startsWith('/shop');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const shopIconsRef = useRef(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
    const { itemCount } = useCart();
    const [isCartOpen, setCartOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
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

    const handleSearchClick = () => setIsSearchModalOpen(true);
    const handleBookmarkClick = () => alert('Mostrar guardados');
    const handleCartClick = () => setCartOpen(true);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileDropdownOpen(null);
    }
    const handleMouseEnter = (menu) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);
    const toggleMobileDropdown = (menu) => {
        setMobileDropdownOpen(mobileDropdownOpen === menu ? null : menu);
    };

    return (
        <>
            <header className={`header ${!isHeaderVisible ? 'hidden' : ''}`}>
                <div className="header-left">
                    <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
                    </button>
                    <Link href="/" className="logo">
                        <span>Onovatech</span>
                    </Link>
                    <nav className="nav desktop-nav">
                        {/* ... (la navegación de escritorio no cambia) ... */}
                        <ul>
                            <li className="dropdown-item" onMouseEnter={() => handleMouseEnter('tienda')} onMouseLeave={handleMouseLeave}>
                                <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>Tienda <ChevronDown size={16} className="dropdown-icon" /></Link>
                                {activeDropdown === 'tienda' && (
                                    <div className="dropdown-menu">
                                        <Link href="/shop/categories" onClick={() => setActiveDropdown(null)}>Categorías</Link>
                                        <Link href="/shop/ofertas" onClick={() => setActiveDropdown(null)}>Ofertas</Link>
                                        <Link href="/shop/noticias" onClick={() => setActiveDropdown(null)}>Noticias</Link>
                                    </div>
                                )}
                            </li>
                            <li className="dropdown-item" onMouseEnter={() => handleMouseEnter('comunidad')} onMouseLeave={handleMouseLeave}>
                                <Link href="/comunidad" className={pathname === '/comunidad' ? 'active' : ''}>Comunidad <ChevronDown size={16} className="dropdown-icon" /></Link>
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
                                <button className="icon-button cart-button-wrapper" onClick={handleCartClick}>
                                    <ShoppingCart size={22}/>
                                    {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                                </button>
                                <button className="icon-button" onClick={handleBookmarkClick}>
                                    <Bookmark size={22}/>
                                </button>
                            </div>
                        )}
                        {/* AÑADIDA CLASE "hide-on-mobile" */}
                        <Link href="/login" className="icon-link hide-on-mobile">
                            <User size={22}/>
                        </Link>
                    </div>
                </div>
                
                <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    {/* ... (el contenido del menú deslizable no cambia) ... */}
                    <button className="mobile-menu-close" onClick={closeMobileMenu}>
                        <X size={23}/>
                    </button>
                    <nav className="mobile-nav">
                        <ul>
                            <li>
                                <div className="mobile-nav-item">
                                    <Link href="/shop" className={pathname.startsWith('/shop') ? 'active' : ''} onClick={closeMobileMenu}>Tienda</Link>
                                    <button className="mobile-dropdown-toggle" onClick={() => toggleMobileDropdown('tienda')}><ChevronDown size={22} className={mobileDropdownOpen === 'tienda' ? 'open' : ''} /></button>
                                </div>
                                {mobileDropdownOpen === 'tienda' && (
                                    <div className="mobile-submenu">
                                        <Link href="/shop/categories" onClick={closeMobileMenu}>Categorías</Link>
                                        <Link href="/shop/ofertas" onClick={closeMobileMenu}>Ofertas</Link>
                                        <Link href="/shop/noticias" onClick={closeMobileMenu}>Noticias</Link>
                                    </div>
                                )}
                            </li>
                            <li>
                                <div className="mobile-nav-item">
                                    <Link href="/comunidad" className={pathname.startsWith('/comunidad') ? 'active' : ''} onClick={closeMobileMenu}>Comunidad</Link>
                                    <button className="mobile-dropdown-toggle" onClick={() => toggleMobileDropdown('comunidad')}><ChevronDown size={22} className={mobileDropdownOpen === 'comunidad' ? 'open' : ''} /></button>
                                </div>
                                {mobileDropdownOpen === 'comunidad' && (
                                    <div className="mobile-submenu">
                                        <Link href="/comunidad/tutoriales" onClick={closeMobileMenu}>Tutoriales</Link>
                                        <Link href="/comunidad/foros" onClick={closeMobileMenu}>Foros</Link>
                                        <Link href="/comunidad/noticias" onClick={closeMobileMenu}>Noticias</Link>
                                    </div>
                                )}
                            </li>
                            <li><Link href="/servicios" className={pathname === '/servicios' ? 'active' : ''} onClick={closeMobileMenu}>Servicios</Link></li>
                            <li><Link href="/contacto" className={pathname === '/contacto' ? 'active' : ''} onClick={closeMobileMenu}>Contacto</Link></li>
                        </ul>
                        
                        {showShopIcons && (
                            <div className="mobile-shop-icons">
                                <button className="icon-button" onClick={handleSearchClick}><Search size={25}/> <span>Buscar</span></button>
                                <button className="icon-button cart-button-wrapper" onClick={handleCartClick}><ShoppingCart size={25}/> <span>Carrito</span>{itemCount > 0 && <span className="cart-badge">{itemCount}</span>}</button>
                                <button className="icon-button" onClick={handleBookmarkClick}><Bookmark size={25}/> <span>Guardados</span></button>
                            </div>
                        )}
                        <div className="mobile-user">
                            <Link href="/login" className="icon-link" onClick={closeMobileMenu}><User size={25}/> <span>Iniciar Sesión</span></Link>
                        </div>
                    </nav>
                </div>
            </header>

            {isMobile ? (
                <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            ) : (
                <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            )}
            {isSearchModalOpen && (<SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}/>
            )}
        </>
    );
}