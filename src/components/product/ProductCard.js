"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, ArrowUpRight } from 'lucide-react';
import './ProductCard.css';
import { useCart } from '../context/cartContext';

export default function ProductCard({ product }) {
  // Extraer funciones del contexto del carrito
  const { addToCart, getItemQuantity, items } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '');

  const productData = {
    id: product?.id || '1',
    name: product?.name || 'Título del producto',
    price: product?.price || '0.00',
    slug: product?.slug || 'producto-ejemplo',
    images: product?.images?.map(img => 
      `${STRAPI_URL}${img.url}`
    ) || ['/placeholder-product-1.jpg'],
    stock: product?.stock || 0,
  };
  
  // Calcular el stock disponible restando la cantidad en el carrito
  const quantityInCart = getItemQuantity(productData.id);
  const availableStock = productData.stock - quantityInCart;

  const imageUrl = productData.images.length > 0 ? productData.images[0] : '/placeholder-product-1.jpg';

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productData.images.length);
  };
  
  // condicion para comprobar se hay stock
  const handleAddToCart = () => {
    if (availableStock <= 0) {
      return;
    }
    
    const productWithImage = { ...product, imageUrl: imageUrl };
    addToCart(productWithImage, 1);
    console.log('Agregado al carrito:', productData.name);
  };

  const handleToggleFavorite = () => { setIsFavorite(!isFavorite); };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div 
          className="product-image"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={productData.images[currentImageIndex]}
            alt={productData.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
          />
          <Link href={`/shop/product/${productData.slug}`} className="details-link">
            <ArrowUpRight size={20} />
          </Link>
          <div 
            className="hover-trigger-area"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          ></div>
        </div>
        <div 
          className={`product-actions ${showActions ? 'visible' : ''}`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {/* Desactiva el boton cuando no hay mas stock */}
          <button 
            className="action-btn cart-btn" 
            onClick={handleAddToCart} 
            title="Agregar al carrito"
            disabled={availableStock <= 0}
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
      <div className="product-details">
        <h3 className="product-name">{productData.name}</h3>
        <p className="product-price">{parseFloat(productData.price).toFixed(2)} $</p>
        {/* muestra el stock disponible 
        <p className="product-stock">{availableStock > 0 ? `${availableStock} disponibles` : 'Sin stock'}</p> */}
      </div>
    </div>
  );
}