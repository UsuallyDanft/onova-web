// components/product/InfoActions.js
"use client";

import { useState, useEffect } from "react";

export default function InfoActions({ productSlug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productSlug) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${productSlug}&populate=*`
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del producto.");
        }

        const data = await response.json();

        if (data.data.length > 0) {
          setProduct(data.data[0]);
        } else {
          throw new Error("Producto no encontrado.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log("Producto añadido al carrito:", product.name);
  };

  const handleBuyNow = () => {
    if (!product) return;
    console.log("Comprando ahora:", product.name);
  };

  const handleAddToFavorites = () => {
     if (!product) return;
    console.log("Añadido a favoritos:", product.name);
  };

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>El producto no existe.</p>;
  }

  return (
    <div className="product-actions">
      <div className="product-price">
        <h3>${product.price}</h3>
      </div>
      <div className="product-description">
        <p>{product.description[0].children[0].text}</p>
      </div>
      <div className="action-buttons">
        <button className="add-to-cart" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
        <button className="buy-now" onClick={handleBuyNow}>
          Comprar Ahora
        </button>
        <button className="add-to-favorites" onClick={handleAddToFavorites}>
          ❤️ Favoritos
        </button>
      </div>
    </div>
  );
}