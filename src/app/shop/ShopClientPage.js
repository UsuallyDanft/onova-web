'use client';
// Pagina principal de la tienda - contiene todo lo que interactua con el usuario

import { useState, useEffect } from 'react';
import ProductGrid from "@/components/shop/ProductGrid";
import ProductSidebar from "@/components/product/ProductSidebar";
import './ShopPage.css';

// 1. Acepta 'products', 'categories', y 'tags' como props desde la página del servidor
export default function ShopClientPage({ products, categories, tags }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // 2. Estado para almacenar los filtros seleccionados
  const [filters, setFilters] = useState({
    category: 'Todos',
    tag: 'Ninguno',
    priceRange: [1, 10000],
    sortOrder: 'Por precio',
  });

  // 3. Estado para almacenar los productos que se mostrarán después de filtrar
  const [filteredProducts, setFilteredProducts] = useState(products);

  // 4. Función para actualizar el estado de los filtros desde el ProductSidebar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 5. useEffect que aplica los filtros cada vez que 'filters' cambia
  useEffect(() => {
    // Filtro de seguridad para evitar errores con datos malformados
    let tempProducts = products.filter(p => p);

    // --- LÓGICA DE FILTRADO (adaptada a la estructura "plana") ---

    // Filtrar por categoría
    if (filters.category !== 'Todos') {
      tempProducts = tempProducts.filter(product =>
        product.categories?.some(cat => cat.name === filters.category)
      );
    }

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
        tempProducts.sort((a, b) => b.price - a.price);
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
            {/* 6. Pasamos todos los datos y la función de callback al Sidebar */}
            <ProductSidebar 
              categories={categories}
              tags={tags}
              onFiltersChange={handleFilterChange}
              isMobileOpen={isMobileFiltersOpen}
              onMobileClose={closeMobileFilters}
            />
          </aside>
          <section className="shop-products">
            {/* 7. Pasamos la lista de productos YA FILTRADA al ProductGrid */}
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