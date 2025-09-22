// src/components/product/ImageGallery.jsx

"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ProductImageGallery = ({ images }) => {
  // ✅ Mueve el Hook useState al inicio del componente.
  // Inicializa con la primera imagen si existe, o null si no.
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : null);
  
  // Si no hay imágenes o no hay imagen seleccionada, muestra el marcador de posición.
  if (!images || images.length === 0 || !selectedImage) {
    return (
      <div className="gallery-container">
        <div className="main-image-wrapper">
          <Image src="/placeholder-product.jpg" alt="Producto sin imagen" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    );
  }

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '');

  // Función para obtener la URL completa de la imagen
  const getImageUrl = (image) => {
    const url = image.attributes?.url || image.url;
    if (url.startsWith('http')) {
      return url;
    }
    return `${STRAPI_URL}${url}`;
  };

  return (
    <div className="gallery-container">
      {/* Visor de la imagen principal */}
      <div className="main-image-wrapper">
        <Image
          src={getImageUrl(selectedImage)}
          alt={selectedImage.attributes?.alternativeText || 'Imagen principal del producto'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          onError={(e) => { e.target.src = '/placeholder-product.jpg'; }}
        />
      </div>

      {/* Contenedor de las miniaturas */}
      {images.length > 1 && (
        <div className="thumbnail-wrapper">
          {images.map((image) => (
            <div key={image.id} className={`thumbnail-item ${selectedImage.id === image.id ? 'active' : ''}`}>
              <Image
                src={getImageUrl(image)}
                alt={image.attributes?.alternativeText || 'Miniatura del producto'}
                width={80}
                height={80}
                style={{ objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;