// src/app/shop/ShopClientPage.js
'use client';

import { useState, useEffect } from 'react';
import ProductGrid from "@/components/shop/ProductGrid";
import ProductSidebar from "@/components/product/ProductSidebar";
import './ShopPage.css';

// --- ¡CAMBIO 1! ---
// Aceptamos la nueva prop 'initialCategoryName'
export default function ShopClientPage({ products, categories, tags, initialCategoryName }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // --- ¡CAMBIO 2! (El único cambio de lógica) ---
  // Usamos 'initialCategoryName' para establecer el estado inicial.
  // Si no viene, usamos 'Todos' como antes.
  const [filters, setFilters] = useState({
    category: initialCategoryName || 'Todos', 
    tag: 'Ninguno',
    priceRange: [1, 10000],
    sortOrder: 'Por precio',
  });

  // 3. Estado para almacenar los productos que se mostrarán después de filtrar
  const [filteredProducts, setFilteredProducts] = useState(products);

  // 4. Función para actualizar el estado de los filtros (SIN CAMBIOS)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 5. useEffect que aplica los filtros (SIN CAMBIOS)
  useEffect(() => {
    let tempProducts = products.filter(p => p);

    // Filtrar por categoría
    if (filters.category !== 'Todos') {
      tempProducts = tempProducts.filter(product =>
        product.categories?.some(cat => cat.name === filters.category)
      );
    }
    
    // ... El resto del useEffect y del archivo NO CAMBIA ...
    // ... (Filtrado por tag, precio, ordenamiento, etc.) ...
    
    // Filtrar por etiqueta (tag)
    if (filters.tag !== 'Ninguno') {
      tempProducts = tempProducts.filter(product =>
        product.tags?.some(t => t.name === filters.tag)
      );
    }

    // Filtrar por rango de precio
    tempProducts = tempProducts.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // --- LÓGICA DE ORDENAMIENTO (adaptada a la estructura "plana") ---
    switch (filters.sortOrder) {
      case 'Menor precio':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Mayor precio':
        tempProducts.sort((a, b) => b.price - b.price);
        break;
      case 'Más reciente':
        tempProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Por precio':
      default:
        tempProducts.sort((a, b) => a.price - b.price);
        break;
    }
    
    setFilteredProducts(tempProducts);

  }, [filters, products]);
  
  // ... El resto de tu archivo (lógica móvil, JSX, etc.) 
  // no necesita ningún cambio.
  // --- Lógica para el menú móvil ---
  const toggleMobileFilters = () => setIsMobileFiltersOpen(!isMobileFiltersOpen);
  const closeMobileFilters = () => setIsMobileFiltersOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileFiltersOpen) closeMobileFilters();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileFiltersOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileFiltersOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFiltersOpen]);

  return (
    <main className="shop-page">
      <div className="shop-container">
        
        {isMobileFiltersOpen && (
          <div 
            className="mobile-filters-overlay" 
            onClick={closeMobileFilters}
          />
        )}
        
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <ProductSidebar 
              categories={categories}
              tags={tags}
              onFiltersChange={handleFilterChange}
              isMobileOpen={isMobileFiltersOpen}
              onMobileClose={closeMobileFilters}
              // --- ¡CAMBIO 3! ---
              // Le pasamos el estado inicial al Sidebar
              // para que pueda marcar la categoría correcta
              initialFilters={filters} 
            />
          </aside>
          <section className="shop-products">
            <ProductGrid 
              products={filteredProducts} 
              onFiltersToggle={toggleMobileFilters} 
            />
          </section>
        </div>
      </div>
    </main>
  );
}