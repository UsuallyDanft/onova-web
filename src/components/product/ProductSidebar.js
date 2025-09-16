'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { ChevronDown, X } from 'lucide-react';
import './ProductSidebar.css';

export default function ProductSidebar({ 
  onFiltersChange, 
  isMobileOpen, 
  onMobileClose, 
  categories = [], 
  tags = [] 
}) {
  // Estado local para controlar los valores de los inputs del sidebar
  const [priceRange, setPriceRange] = useState([1, 10000]);
  const [category, setCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('Por precio');
  const [tag, setTag] = useState('Ninguno');

  // Opciones estáticas para el dropdown de orden
  const sortOptions = ['Por precio', 'Menor precio', 'Mayor precio', 'Más popular', 'Más reciente', 'Mejor valorados'];

  // Función centralizada para notificar al componente padre de cualquier cambio en los filtros
  const notifyParentOfChange = (updatedFilters) => {
    // Llama a la función onFiltersChange pasada por props
    onFiltersChange({
      priceRange,
      category,
      sortOrder,
      tag,
      ...updatedFilters // Aplica los cambios más recientes
    });
  };

  // Handlers para cada uno de los filtros
  const handlePriceChange = (values) => {
    setPriceRange(values);
    notifyParentOfChange({ priceRange: values });
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 1;
    const clampedValue = Math.max(1, Math.min(value, priceRange[1] - 50));
    const newPriceRange = [clampedValue, priceRange[1]];
    setPriceRange(newPriceRange);
    notifyParentOfChange({ priceRange: newPriceRange });
  };

  const handleMaxPriceChange = (e) => {
    const value = parseFloat(e.target.value) || 10000;
    const clampedValue = Math.min(10000, Math.max(value, priceRange[0] + 50));
    const newPriceRange = [priceRange[0], clampedValue];
    setPriceRange(newPriceRange);
    notifyParentOfChange({ priceRange: newPriceRange });
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    notifyParentOfChange({ category: newCategory });
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    notifyParentOfChange({ sortOrder: newSort });
  };

  const handleTagChange = (newTag) => {
    setTag(newTag);
    notifyParentOfChange({ tag: newTag });
  };

  return (
    <div 
      className={`product-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
      role={isMobileOpen ? "dialog" : undefined}
      aria-modal={isMobileOpen ? "true" : undefined}
      aria-label="Filtros de productos"
    >
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

      {/* Sección de Categoría (dinámica) */}
      <div className="filter-section">
        <label className="filter-label">Categoría:</label>
        <div className="custom-select">
          <select 
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select-input"
          >
            <option value="Todos">Todos</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      {/* Sección de Orden */}
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

      {/* Sección de Etiqueta (dinámica) */}
      <div className="filter-section">
        <label className="filter-label">Etiqueta:</label>
        <div className="custom-select">
          <select 
            value={tag}
            onChange={(e) => handleTagChange(e.target.value)}
            className="select-input"
          >
            <option value="Ninguno">Ninguno</option>
            {tags.map(tagOption => (
              <option key={tagOption.id} value={tagOption.name}>{tagOption.name}</option>
            ))}
          </select>
          <ChevronDown className="select-arrow" size={16} />
        </div>
      </div>

      {/* Sección de Rango de Precio */}
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
              <div {...props} className="range-track">
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div {...props} className="range-thumb" key={index} />
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