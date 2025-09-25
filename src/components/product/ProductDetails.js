"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useCart } from '@/components/context/cartContext';
import './ProductDetails.css';

const THUMBNAILS_VISIBLE = 5;
const THUMB_WIDTH = 64;
const THUMB_GAP = 12;

export default function ProductDetails({ product }) {
  const { addToCart, getItemQuantity } = useCart();
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
  const [quantity, setQuantity] = useState(1);

  const quantityInCart = getItemQuantity(normalized.id);
  const maxPurchasable = Math.max(0, (normalized.stock || 0) - quantityInCart);

  const handleAddToCart = () => {
    if (maxPurchasable <= 0) return;
    const productWithImage = { ...product, imageUrl: normalized.images[0] };
    const quantityToAdd = Math.min(quantity, maxPurchasable);
    addToCart(productWithImage, quantityToAdd);
  };

  // --- LÓGICA CORREGIDA ---
  const handleBuyNow = () => {
    const itemAlreadyInCart = quantityInCart > 0;

    // Si el producto no está en el carrito pero hay stock, lo agregamos primero.
    if (!itemAlreadyInCart && maxPurchasable > 0) {
      const productWithImage = { ...product, imageUrl: normalized.images[0] };
      const quantityToAdd = Math.min(quantity, maxPurchasable);
      addToCart(productWithImage, quantityToAdd);
    }
    
    // Si el producto ya estaba en el carrito o se acaba de agregar, vamos al checkout.
    if (itemAlreadyInCart || maxPurchasable > 0) {
       router.push('/shop/checkout');
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, maxPurchasable));
  };
  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handlePrevThumb = () => {
    setThumbnailStartIndex(prev => Math.max(0, prev - 1));
  };
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
          <p className={`stock ${maxPurchasable > 0 ? 'has-stock' : 'no-stock'}`}>
            {maxPurchasable > 0 ? `Disponibles: ${maxPurchasable}` : 'sin stock'}
          </p>
          
          {normalized.description && (
            <p className="description">{normalized.description}</p>
          )}
          
          <div className="quantity-selector-container">
            <label htmlFor="quantity" className="quantity-label">Cantidad</label>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                <Minus size={16} />
              </button>
              <span className="quantity-input">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncreaseQuantity} disabled={quantity >= maxPurchasable}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="actions">
            <div className="main-actions">
              <button
                className="add-btn"
                onClick={handleAddToCart}
                disabled={maxPurchasable <= 0}
              >
                <ShoppingCart size={20} />
                <span>{maxPurchasable > 0 ? 'Añadir al carrito' : 'Sin Stock'}</span>
              </button>
              <button
                 className="buy-now-btn"
                 onClick={handleBuyNow}
                 /* --- LÓGICA CORREGIDA --- */
                 disabled={maxPurchasable <= 0 && quantityInCart === 0}
              >
                <span>Comprar Ahora</span>
              </button>
            </div>
            <button className="wish-btn" aria-label="Agregar a favoritos">
              <Heart size={24} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}