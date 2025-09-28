"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ChevronLeft, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/context/cartContext';
import './ProductDetails.css';

const THUMBNAILS_VISIBLE = 5;
const THUMB_WIDTH = 64;
const THUMB_GAP = 12;

export default function ProductDetails({ product }) {
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();
  const router = useRouter(); 
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '');

  const normalized = useMemo(() => {
    const images = Array.isArray(product?.images)
      ? product.images.map(img => {
          const url = typeof img === 'string' ? img : img?.url;
          if (!url) return null;
          return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        }).filter(Boolean)
      : [];
    const descriptionText = Array.isArray(product?.attributes?.description)
      ? product.attributes.description.map(block =>
          block.children.map(child => child.text).join('')
        ).join('\n')
      : product?.description || product?.attributes?.description || '';
    return {
      id: product?.id,
      name: product?.name || product?.attributes?.name || 'Producto',
      price: product?.price ?? product?.attributes?.price ?? 0,
      slug: product?.slug || product?.attributes?.slug,
      stock: product?.stock ?? product?.attributes?.stock ?? 0,
      description: descriptionText,
      images: images.length ? images : ['/placeholder-product-1.jpg'],
    };
  }, [product, STRAPI_URL]);

  const [currentImage, setCurrentImage] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const quantityInCart = getItemQuantity(normalized.id);
  const totalStock = normalized.stock || 0;
  const productWithImage = { ...product, imageUrl: normalized.images[0] };

  const handleIncreaseQuantity = () => {
    if (quantityInCart >= totalStock) return;
    addToCart(productWithImage, 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantityInCart > 0) {
      updateQuantity(normalized.id, quantityInCart - 1);
    }
  };
  
  const handleEmptyProductFromCart = () => {
    removeFromCart(normalized.id);
  };

  const handleBuyNow = () => {
    if (quantityInCart === 0 && totalStock > 0) {
      addToCart(productWithImage, 1);
    }
    if (totalStock > 0 || quantityInCart > 0) {
      router.push('/shop/checkout');
    }
  };

  const handlePrevThumb = () => setThumbnailStartIndex(prev => Math.max(0, prev - 1));
  const handleNextThumb = () => {
    const maxIndex = normalized.images.length - THUMBNAILS_VISIBLE;
    setThumbnailStartIndex(prev => Math.min(prev + 1, maxIndex));
  };
  const showCarousel = normalized.images.length > THUMBNAILS_VISIBLE;

  return (
    <main className="product-details-page">
      <div className={`details-container ${normalized.images.length === 1 ? 'single-image-layout' : ''}`}>
        <div className="gallery">
         <div className="main-image-container">
            <Image
              src={normalized.images[currentImage]}
              alt={normalized.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {normalized.images.length > 1 && (
            <div className="thumbs-carousel-wrapper">
              {showCarousel && ( <button className="carousel-arrow prev" onClick={handlePrevThumb} disabled={thumbnailStartIndex === 0} aria-label="Anterior"><ChevronLeft size={20} /></button>)}
              <div className="thumbs-container">
                <div className="thumbs-track" style={{ transform: `translateX(-${thumbnailStartIndex * (THUMB_WIDTH + THUMB_GAP)}px)` }}>
                  {normalized.images.map((src, idx) => (<button key={idx} className={`thumb ${idx === currentImage ? 'active' : ''}`} onClick={() => setCurrentImage(idx)} aria-label={`Imagen ${idx + 1}`}><Image src={src} alt={normalized.name} fill sizes="100px" style={{ objectFit: 'cover' }} /></button>))}
                </div>
              </div>
              {showCarousel && (<button className="carousel-arrow next" onClick={handleNextThumb} disabled={thumbnailStartIndex >= normalized.images.length - THUMBNAILS_VISIBLE} aria-label="Siguiente"><ChevronRight size={20} /></button>)}
            </div>
          )}
        </div>

        <div className="info">
           <h1 className="title">{normalized.name}</h1>
          <p className="price">${Number(normalized.price).toFixed(2)}</p>
          <p className={`stock ${totalStock > 0 ? 'has-stock' : 'no-stock'}`}>
            {totalStock > 0 ? `Disponibles: ${totalStock}` : 'sin stock'}
          </p>
          
          {normalized.description && (
            <p className="description">{normalized.description}</p>
          )}
          
          <div className="quantity-selector-container">
            <label className="quantity-label">Agregar articulo al carrito</label>
            <div className="quantity-control-wrapper">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={handleDecreaseQuantity} disabled={quantityInCart <= 0}>
                  <Minus size={16} />
                </button>
                <span className="quantity-input">{quantityInCart}</span>
                <button className="quantity-btn" onClick={handleIncreaseQuantity} disabled={quantityInCart >= totalStock}>
                  <Plus size={16} />
                </button>
              </div>
              
              {quantityInCart > 0 && (
                <button className="remove-item-btn" onClick={handleEmptyProductFromCart} aria-label="Vaciar carrito de este producto">
                  <Trash2 size={16} />
                  <span>Vaciar Carrito</span>
                </button>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={totalStock <= 0}
            >
              <span>{totalStock > 0 ? 'Comprar Ahora' : 'Sin Stock'}</span>
            </button>
            <button className="wish-btn" aria-label="Agregar a favoritos">
              <Heart size={24} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}