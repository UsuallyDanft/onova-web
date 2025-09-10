"use client";

import React, { useState } from 'react';
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
    { value: 5, iconPath: '/icons/square-small.svg' },
    { value: 4, iconPath: '/icons/square-medium.svg' },
    { value: 3, iconPath: '/icons/square-big.svg' }
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
        {columnOptions.map((option) => (
          <button
            key={option.value}
            className={`columns-btn ${activeColumns === option.value ? 'active' : ''}`}
            onClick={() => handleColumnsClick(option.value)}
            title={`${option.value} columnas`}
          >
            <img 
              src={option.iconPath} 
              alt={`${option.value} columnas`}
              className="column-icon"
            />
          </button>
        ))}
      </div>
    </div>
  );
}