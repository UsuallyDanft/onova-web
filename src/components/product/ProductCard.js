"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowUpRight } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Datos por defecto del producto
  const productData = {
    id: product?.id || '1',
    name: product?.name || 'Título del producto',
    price: product?.price || '12.15',
    images: product?.images || ['/placeholder-product-1.jpg', '/placeholder-product-2.jpg', '/placeholder-product-3.jpg'],
    slug: product?.slug || 'producto-ejemplo'
  };

  // Función para rotar imágenes
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % productData.images.length
    );
  };

  // Función para agregar al carrito
  const handleAddToCart = () => {
    console.log('Agregado al carrito:', productData.name);
    // Aquí iría la lógica del carrito
  };

  // Función para toggle favoritos
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorito toggled:', productData.name);
  };

  return (
    <div className="product-card">
      {/* Sección de imagen del producto */}
      <div className="product-image-container">
        <div 
          className="product-image"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={productData.images[currentImageIndex]} 
            alt={productData.name}
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          
          {/* Botón de ir a detalles */}
          <Link href={`/shop/product/${productData.slug}`} className="details-link">
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Sección de acciones (oculta por defecto, aparece en hover) */}
        <div className="product-actions">
          <button 
            className="action-btn cart-btn"
            onClick={handleAddToCart}
            title="Agregar al carrito"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

      </div>

      {/* Indicador de posición de imágenes */}
      {productData.images.length > 1 && (
        <div className="image-indicators">
          {productData.images.map((_, index) => (
            <div 
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Sección de detalles */}
      <div className="product-details">
        <h3 className="product-name">{productData.name}</h3>
        <p className="product-price">{productData.price} $</p>
      </div>
    </div>
  );
}