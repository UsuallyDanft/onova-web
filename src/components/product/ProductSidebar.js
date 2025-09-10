'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { ChevronDown, X } from 'lucide-react';
import './ProductSidebar.css';

export default function ProductSidebar({ onFiltersChange, isMobileOpen, onMobileClose }) {
  const [priceRange, setPriceRange] = useState([1, 10000]);
  const [category, setCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('Por precio');
  const [tag, setTag] = useState('Ninguno');

  // Opciones para los dropdowns
  const categories = ['Todos', 'Software', 'IA y Machine Learning', 'Desarrollo Web', 'Móvil', 'Diseño', 'Productividad'];
  const sortOptions = ['Por precio', 'Menor precio', 'Mayor precio', 'Más popular', 'Más reciente', 'Mejor valorados'];
  const tags = ['Ninguno', 'Nuevo', 'Promoción', 'Bestseller', 'Gratis', 'Premium', 'Empresarial'];

  const handlePriceChange = (values) => {
    setPriceRange(values);
    // En el futuro, llamar onFiltersChange con los nuevos filtros
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 1;
    const clampedValue = Math.max(1, Math.min(value, priceRange[1] - 50));
    setPriceRange([clampedValue, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 10000;
    const clampedValue = Math.min(10000, Math.max(value, priceRange[0] + 50));
    setPriceRange([priceRange[0], clampedValue]);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // En el futuro, llamar onFiltersChange con los nuevos filtros
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    // En el futuro, llamar onFiltersChange con los nuevos filtros
  };

  const handleTagChange = (newTag) => {
    setTag(newTag);
    // En el futuro, llamar onFiltersChange con los nuevos filtros
  };

  return (
    <div 
      className={`product-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      role={isMobileOpen ? "dialog" : undefined}
      aria-modal={isMobileOpen ? "true" : undefined}
      aria-label="Filtros de productos"
    >
      {/* Botón X para cerrar en móvil */}
      {isMobileOpen && (
        <button 
          className="mobile-close-button" 
          onClick={onMobileClose}
          aria-label="Cerrar filtros"
        >
          <X size={24} />
        </button>
      )}
      
      <h3 className="sidebar-title">Filtros</h3>

      {/* Categoría */}
      <div className="filter-section">
        <label className="filter-label">Categoría:</label>
        <div className="custom-select">
          <select 
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select-input"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      {/* Orden */}
      <div className="filter-section">
        <label className="filter-label">Orden:</label>
        <div className="custom-select">
          <select 
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="select-input"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      {/* Etiqueta */}
      <div className="filter-section">
        <label className="filter-label">Etiqueta:</label>
        <div className="custom-select">
          <select 
            value={tag}
            onChange={(e) => handleTagChange(e.target.value)}
            className="select-input"
          >
            {tags.map(tagOption => (
              <option key={tagOption} value={tagOption}>{tagOption}</option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      {/* Rango de precio */}
      <div className="filter-section">
        <label className="filter-label">Rango de precio:</label>
        <div className="price-range-container">
          <Range
            step={50}
            min={1}
            max={10000}
            values={priceRange}
            onChange={handlePriceChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="range-track"
              >
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                className="range-thumb"
                key={index}
              />
            )}
          />
          <div className="price-inputs">
            <div className="price-input-group">
              <label className="price-input-label">Mín:</label>
              <input
                type="number"
                className="price-input"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                min={1}
                max={priceRange[1] - 50}
                step={50}
              />
            </div>
            <div className="price-input-group">
              <label className="price-input-label">Máx:</label>
              <input
                type="number"
                className="price-input"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                min={priceRange[0] + 50}
                max={10000}
                step={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}