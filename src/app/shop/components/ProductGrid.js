"use client";

import { useState } from 'react';
import ProductCard from '../../../components/product/ProductCard';
import ProductViewController from '../../../components/product/ProductViewController';
import Pagination from '../../../components/product/Pagination';
import './ProductGrid.css';

// 1. Acepta 'products' como una prop.
export default function ProductGrid({ products = [], onFiltersToggle }) {
  // Estados para el control de vista
  const [currentQuantity, setCurrentQuantity] = useState(15);
  const [currentColumns, setCurrentColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  // Función para obtener productos paginados
  const getDisplayedProducts = () => {
    const startIndex = (currentPage - 1) * currentQuantity;
    const endIndex = startIndex + currentQuantity;
    return products.slice(startIndex, endIndex);
  };

  // Calcular total de páginas
  const totalPages = Math.ceil(products.length / currentQuantity);

  // Handlers para los controles
  const handleQuantityChange = (quantity) => {
    setCurrentQuantity(quantity);
    setCurrentPage(1);
  };

  const handleColumnsChange = (columns) => {
    setCurrentColumns(columns);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-grid">
      <div className="product-grid-header">
        <h2>Productos Disponibles</h2>
        <ProductViewController
          onQuantityChange={handleQuantityChange}
          onColumnsChange={handleColumnsChange}
          currentQuantity={currentQuantity}
          currentColumns={currentColumns}
          onFiltersToggle={onFiltersToggle}
        />
      </div>

      <div 
        className="products-container"
        data-columns={currentColumns}
      >
        {getDisplayedProducts().map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}