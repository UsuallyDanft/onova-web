"use client";

import React, { useState } from 'react';
import { Grid3x3, AppWindow, LayoutGrid } from 'lucide-react';
import './ProductViewController.css';

export default function ProductViewController({ 
  onQuantityChange = () => {}, 
  onColumnsChange = () => {},
  currentQuantity = 15,
  currentColumns = 3
}) {
  const [activeQuantity, setActiveQuantity] = useState(currentQuantity);
  const [activeColumns, setActiveColumns] = useState(currentColumns);

  const quantityOptions = [15, 20, 35];
  const columnOptions = [
    { value: 5, icon: LayoutGrid },
    { value: 4, icon: AppWindow },
    { value: 3, icon: Grid3x3 }
  ];

  const handleQuantityClick = (quantity) => {
    setActiveQuantity(quantity);
    onQuantityChange(quantity);
  };

  const handleColumnsClick = (columns) => {
    setActiveColumns(columns);
    onColumnsChange(columns);
  };

  return (
    <div className="product-view-controller">
      {/* Selector de Cantidad */}
      <div className="quantity-selector">
        <span className="selector-label">Ver:</span>
        {quantityOptions.map((quantity, index) => (
          <React.Fragment key={quantity}>
            <button
              className={`quantity-btn ${activeQuantity === quantity ? 'active' : ''}`}
              onClick={() => handleQuantityClick(quantity)}
            >
              {quantity}
            </button>
            {index < quantityOptions.length - 1 && <span className="separator">/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Selector de Columnas - Solo visible en desktop */}
      <div className="columns-selector desktop-only">
        {columnOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.value}
              className={`columns-btn ${activeColumns === option.value ? 'active' : ''}`}
              onClick={() => handleColumnsClick(option.value)}
              title={`${option.value} columnas`}
            >
              <IconComponent size={16} />
            </button>
          );
        })}
      </div>
    </div>
  );
}