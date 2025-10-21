"use-client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductCard.css';
import { useCart } from '../context/cartContext';

export default function ProductCard({ product }) {
  const { addToCart, getItemQuantity } = useCart();
  // 1. Inicializa el router
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '');

  const productData = {
    id: product?.id || '1',
    name: product?.name || 'Título del producto',
    price: product?.price || '0.00',
    slug: product?.slug || 'producto-ejemplo',
    images: product?.images?.map(img => {
      if (img.url.startsWith('http')) {
        return img.url;
      }
      return `${STRAPI_URL}${img.url}`;
    }) || ['/placeholder-product-1.jpg'],
    stock: product?.stock || 0,
  };
  
  const quantityInCart = getItemQuantity(productData.id);
  const availableStock = productData.stock - quantityInCart;

  const handleNextImage = (e) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productData.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productData.images.length) % productData.images.length);
  };
  
  // 2. función que maneja la navegación
  const handleNavigate = () => {
    router.push(`/shop/product/${productData.slug}`);
  };

  const handleAddToCart = () => {
    if (availableStock <= 0) return;
    
    const imageUrl = productData.images.length > 0 ? productData.images[0] : '/placeholder-product-1.jpg';
    const productWithImage = { ...product, imageUrl: imageUrl };
    addToCart(productWithImage, 1);
  };

  const handleToggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <div className="product-image clickable" onClick={handleNavigate}>
          <Image
            src={productData.images[currentImageIndex]}
            alt={productData.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
          />
          {productData.images.length > 1 && (
            <div className="image-nav-buttons">
              <button className="image-nav-btn" onClick={handlePrevImage} title="Anterior">
                <ChevronLeft size={20} />
              </button>
              <button className="image-nav-btn" onClick={handleNextImage} title="Siguiente">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
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
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
            />
          ))}
        </div>
      )}
      <div className="product-details">
        <h3 className="product-name">{productData.name}</h3>
        <p className="product-price">{parseFloat(productData.price).toFixed(2)} $</p>
        <p className="product-stock">{availableStock > 0 ? `${availableStock} disponibles` : 'Sin stock'}</p> 
      </div>
    </div>
  );
}