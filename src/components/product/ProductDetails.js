"use client";

import React, { useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ChevronLeft, ChevronRight, Plus, Minus, Trash2, ChevronDown, Lock } from 'lucide-react';
import { useCart } from '@/components/context/cartContext';
import { useAuth } from '@/components/context/authContext';
import './ProductDetails.css';
import Twemoji from 'react-twemoji';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Componente híbrido de tooltip
import Tooltip from '../ui/Tooltip';
import AuthTooltip from '../ui/AuthTooltip';
import BlockRenderer from './BlockRenderer';

const THUMBNAILS_VISIBLE = 5;
const THUMB_WIDTH = 64;
const THUMB_GAP = 12;

export default function ProductDetails({ product }) {
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
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

    const descriptionText = Array.isArray(product?.description)
      ? product.description.map(block =>
          block.children.map(child => child.text).join('')
        ).join('\n')
      : product?.description || '';

    return {
      id: product?.id,
      name: product?.name || 'Producto',
      price: product?.price ?? 0,
      slug: product?.slug,
      stock: product?.stock ?? 0,
      description: descriptionText,
      longDescription: product?.longDescription || null,
      images: images.length ? images : ['/placeholder-product-1.jpg'],
    };
  }, [product, STRAPI_URL]);

  const [currentImage, setCurrentImage] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLongDescOpen, setIsLongDescOpen] = useState(false);
  const [showBuyNowTooltip, setShowBuyNowTooltip] = useState(false);
  const [showAuthTooltip, setShowAuthTooltip] = useState(false);

  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const element = contentWrapperRef.current;
    if (element) {
      if (isLongDescOpen) {
        element.style.maxHeight = `${element.scrollHeight}px`;
      } else {
        element.style.maxHeight = '14.2rem';
      }
    }
  }, [isLongDescOpen]);

  const quantityInCart = getItemQuantity(normalized.id);
  const totalStock = normalized.stock || 0;
  const productWithImage = { ...product, id: normalized.id, imageUrl: normalized.images[0] };

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
    if (!isAuthenticated) {
      setShowAuthTooltip(true);
      setTimeout(() => {
        setShowAuthTooltip(false);
      }, 3000);
      return;
    }

    if (quantityInCart === 0) {
      setShowBuyNowTooltip(true);
      setTimeout(() => {
        setShowBuyNowTooltip(false);
      }, 1800);
      return; 
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
  const lightboxSlides = normalized.images.map(src => ({ src }));

  useEffect(() => {
    if (quantityInCart > 0) {
      setShowBuyNowTooltip(false);
    }
  }, [quantityInCart]);

  return (
    <>
      <main className="product-details-page">
        <div className={`details-container ${normalized.images.length === 1 ? 'single-image-layout' : ''}`}>
          <div className="gallery">
            <div className="main-image-container" onClick={() => setIsLightboxOpen(true)}>
              <Image src={normalized.images[currentImage]} alt={normalized.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }}/>
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
            <p className={`stock ${totalStock > 0 ? 'has-stock' : 'no-stock'}`}>{totalStock > 0 ? `Disponibles: ${totalStock}` : 'sin stock'}</p>
            {normalized.description && (<Twemoji tag="p" className="description" options={{ className: 'twemoji' }}>{normalized.description}</Twemoji>)}
            <div className="quantity-selector-container">
              <label className="quantity-label">Agregar articulo al carrito</label>
              <div className="quantity-control-wrapper">
                <div className="quantity-selector">
                  <button className="quantity-btn" onClick={handleDecreaseQuantity} disabled={quantityInCart <= 0}><Minus size={16} /></button>
                  <span className="quantity-input">{quantityInCart}</span>
                  <button className="quantity-btn" onClick={handleIncreaseQuantity} disabled={quantityInCart >= totalStock}><Plus size={16} /></button>
                </div>
                {quantityInCart > 0 && (<button className="remove-item-btn" onClick={handleEmptyProductFromCart} aria-label="Vaciar carrito de este producto"><Trash2 size={16} /><span>Vaciar Carrito</span></button>)}
              </div>
            </div>
            <div className="actions">
              <Tooltip 
                text="Primero agrega productos al carrito"
                position="top"
                isOpen={showBuyNowTooltip}
                trigger="click"
              >
                <button
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={totalStock <= 0}
                >
                  <span>{totalStock > 0 ? 'Comprar Ahora' : 'Sin Stock'}</span>
                </button>
              </Tooltip>
              <button className="wish-btn" aria-label="Agregar a favoritos"><Heart size={24} /></button>
            </div>
          </div>
        </div>
        {normalized.longDescription && (
          <section className="long-description-section">
            <button className="long-description-header" onClick={() => setIsLongDescOpen(!isLongDescOpen)} aria-expanded={isLongDescOpen}>
              <h3>Más detalles</h3>
              <ChevronDown className={`chevron-icon ${isLongDescOpen ? 'open' : ''}`} size={28} />
            </button>
            <div ref={contentWrapperRef} className={`long-description-content ${isLongDescOpen ? 'open' : ''}`}>
              <div className="content-inner">
                  <BlockRenderer content={normalized.longDescription} STRAPI_URL={STRAPI_URL} />
              </div>
            </div>
          </section>
        )}
      </main>
      <Lightbox open={isLightboxOpen} close={() => setIsLightboxOpen(false)} slides={lightboxSlides} index={currentImage}/>
      <AuthTooltip 
        isOpen={showAuthTooltip} 
        onClose={() => setShowAuthTooltip(false)} 
      />
    </>
  );
}