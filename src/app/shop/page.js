'use client';

import { useState } from 'react';
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

  return (
    <main className="shop-page">
      <div className="shop-container">
        {/* Botón de filtros para móvil */}
        <div className="mobile-filters-header">
          <button className="mobile-filters-button" onClick={toggleMobileFilters}>
            <Filter size={20} />
            <span>Filtros</span>
          </button>
        </div>
        
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <ProductSidebar 
              isMobileOpen={isMobileFiltersOpen}
              onMobileClose={closeMobileFilters}
            />
          </aside>
          <section className="shop-products">
            <ProductGrid />
          </section>
        </div>
      </div>
    </main>
  );
}