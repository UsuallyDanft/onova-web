'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import ProductGrid from "./components/ProductGrid";
import ProductSidebar from "../../components/product/ProductSidebar";
import './ShopPage.css';

export default function ShopPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  const closeMobileFilters = () => {
    setIsMobileFiltersOpen(false);
  };

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup al desmontar o cambiar el estado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFiltersOpen]);

  // Manejar tecla Escape para cerrar el menú
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileFiltersOpen) {
        closeMobileFilters();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileFiltersOpen]);

  return (
    <main className="shop-page">
      <div className="shop-container">
        
        {/* Overlay/backdrop para móvil */}
        {isMobileFiltersOpen && (
          <div 
            className="mobile-filters-overlay" 
            onClick={closeMobileFilters}
          />
        )}
        
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <ProductSidebar 
              isMobileOpen={isMobileFiltersOpen}
              onMobileClose={closeMobileFilters}
            />
          </aside>
          <section className="shop-products">
            <ProductGrid onFiltersToggle={toggleMobileFilters} />
          </section>
        </div>
      </div>
    </main>
  );
}