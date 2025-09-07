"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Importar el hook
import './Header.css';
import { User, ShoppingCart, Search, Bookmark } from 'lucide-react';
import { gsap } from "gsap"; // Importa gsap
import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP

export default function Header() {
    // ocultar y mostrar los botones de la tienda
    const pathname = usePathname();
    const showShopIcons = pathname === '/shop';

    const handleSearchClick = () => alert('Mostrar búsqueda');
    const handleCartClick = () => alert('Mostrar carrito');
    const handleBookmarkClick = () => alert('Mostrar guardados');

    return (
        <header className="header">
            <div className="header-left">
                <Link href="/" className="logo">
                    <span>Onovatech</span>
                </Link>
            
                <nav className="nav">
                    <ul>
                        {/* Asegúrate que este Link apunte a /tienda */}
                        <li><Link href="/shop">Tienda</Link></li>
                        <li><Link href="/comunidad">Comunidad</Link></li>
                        <li><Link href="/servicios">Servicios</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                    </ul>
                </nav>
            </div>

            <div className='header-right'>
                
                {/* 4. Aplicar la condición en el JSX */}
                {/* Estos botones solo se renderizarán si showShopIcons es true */}
                {showShopIcons && (
                    <>
                        {/* Botón de buscar */}
                        <button className="icon-button" onClick={handleSearchClick}>
                            <Search size={25}/>
                        </button>
                        {/* Botón del carrito */}
                        <button className="icon-button" onClick={handleCartClick}>
                            <ShoppingCart size={25}/>
                        </button>
                        {/* Botón de favoritos */}
                        <button className="icon-button" onClick={handleBookmarkClick}>
                            <Bookmark size={25}/>
                        </button>
                    </>
                )}
                
                {/* Este botón de usuario siempre será visible */}
                <Link href="/login" className="icon-link">
                    <User size={25}/>
                </Link>
            </div>
        </header>
    );
}