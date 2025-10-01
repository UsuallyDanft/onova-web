"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

// Mapeo para traducir segmentos de la URL a texto legible
const pathTranslations = {
  'shop': 'Tienda',
  // 'product': 'Producto', // Ya no lo necesitamos aquí
  'categories': 'Categorías',
  'checkout': 'Finalizar Compra'
};

const Breadcrumbs = ({ productName }) => {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }

  // Dividir la URL en segmentos Y FILTRAR el segmento 'product'
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter(segment => segment !== 'product'); // <-- ESTA ES LA LÍNEA AÑADIDA

  // El resto de la lógica funciona igual
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    
    const isLast = index === segments.length - 1;
    let label = isLast && productName ? productName : (pathTranslations[segment] || segment.replace(/-/g, ' '));

    return { href, label };
  });

  return (
    <div className="breadcrumbs-wrapper"> 
      <nav aria-label="breadcrumb" className="breadcrumbs-container">
        <ol>
          <li>
            <Link href="/">Inicio</Link>
            <ChevronRight size={16} className="separator" />
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href}>
                {isLast ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href}>{crumb.label}</Link>
                )}
                {!isLast && <ChevronRight size={16} className="separator" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;