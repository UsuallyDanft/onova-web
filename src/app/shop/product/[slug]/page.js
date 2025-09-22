// src/app/products/[slug]/page.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { queryAPI } from '@/components/lib/strapi';
import ProductImageGallery from '@/components/product/ImageGallery';
import ProductInfoActions from '@/components/product/InfoActions';
import './productDetailPage.css'; // Asegúrate de que los estilos estén importados

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const data = await queryAPI(`/api/products?filters[slug][$eq]=${slug}&populate=*`);
          if (data && data.data && data.data.length > 0) {
            setProduct(data.data[0]);
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Error al cargar el producto:", error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Cargando producto...</p>;
  if (!product) return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Producto no encontrado.</p>;

  // Aplicamos la nueva estructura de layout que propusiste
  return (
    <main className="product-page">
      <div className="product-container">
        <div className="product-layout">
          {/* Columna Izquierda: Galería de Imágenes */}
          <section className="product-images">
            <ProductImageGallery images={product.attributes.images.data || []} />
          </section>
          
          {/* Columna Derecha: Información y Acciones */}
          <section className="product-info">
            <ProductInfoActions product={product} />
          </section>
        </div>
      </div>
    </main>
  );
}