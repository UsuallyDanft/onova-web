// src/components/product/InfoActions.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/components/context/cartContext';
import { useRouter } from 'next/navigation';

const ProductInfoActions = ({ product }) => {
  const { name, description, price, stock } = product.attributes;
  const { addToCart, getItemQuantity } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calcula el stock real disponible, restando lo que ya está en el carrito
  const quantityInCart = getItemQuantity(product.id);
  const availableStock = (stock || 0) - quantityInCart;

  // Ajusta la cantidad si el stock cambia o es menor que la cantidad seleccionada
  useEffect(() => {
    if (quantity > availableStock) {
      setQuantity(Math.max(1, availableStock));
    }
  }, [availableStock, quantity]);

  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity(q => Math.min(availableStock, q + 1));

  const handleAddToCart = () => {
    if (availableStock <= 0 || quantity === 0) return;
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    if (availableStock > 0 && quantity > 0) {
      addToCart(product, quantity);
    }
    router.push('/shop/checkout');
  };

  const handleToggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="product-info-actions">
      <h1 className="product-title">{name}</h1>
      <p className="product-price">${parseFloat(price || 0).toFixed(2)}</p>
      
      <div className="product-description">
        <p>{description || 'Este producto no tiene una descripción detallada.'}</p>
      </div>

      <div className="quantity-selector">
        <span>Cantidad:</span>
        <div className="quantity-controls">
          <button onClick={handleDecrement} disabled={availableStock === 0}>
            <Minus size={20} />
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrement} disabled={quantity >= availableStock}>
            <Plus size={20} />
          </button>
        </div>
        <span className="stock-info">
          {availableStock > 0 ? `${availableStock} disponibles` : 'Sin stock'}
        </span>
      </div>

      <div className="action-buttons">
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart} 
          disabled={availableStock === 0}
        >
          <ShoppingCart size={20} />
          Agregar al Carrito
        </button>
        <button 
          className="buy-now-btn" 
          onClick={handleBuyNow}
        >
          Comprar Ahora
        </button>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfoActions;