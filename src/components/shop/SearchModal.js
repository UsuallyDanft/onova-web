"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // 1. Importar el componente Image
import { X, Search, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/context/cartContext';
import { queryAPI } from '@/components/lib/strapi';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { addToCart, getItemQuantity } = useCart();
  const router = useRouter();

  // Limpiar estado cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      setProducts([]);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Búsqueda dinámica cuando el usuario escribe
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setProducts([]);
        return;
      }
      setIsLoading(true);
      try {
        const fetchedProducts = await queryAPI('products', {
          _q: searchQuery,
          populate: ['images', 'category'],
        });
        setProducts(fetchedProducts.data || []);
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceSearch = setTimeout(() => {
      searchProducts();
    }, 300); // Espera 300ms después de que el usuario deja de escribir

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);


  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleViewDetails = (product) => {
    router.push(`/shop/product/${product.slug}`);
    onClose(); // Cierra el modal al navegar
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="search-modal-body">
          {isLoading && <div className="loading-spinner"></div>}
          
          {!isLoading && products.length > 0 && (
            <div className="search-modal-results">
              <div className="search-modal-items">
                {products.map((product) => {
                  const itemInCartQuantity = getItemQuantity(product.id);
                  const availableStock = product.stock - itemInCartQuantity;
                  const imageUrl = product.images?.data?.[0]?.attributes?.url 
                    ? `${process.env.NEXT_PUBLIC_STRAPI_HOST}${product.images.data[0].attributes.url}`
                    : '/placeholder.png';

                  return (
                    <div key={product.id} className="search-modal-item">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        className="search-modal-item-image"
                        width={60}
                        height={60}
                      />
                      <div className="search-modal-item-info">
                        <h3 className="search-modal-item-name">{product.name}</h3>
                        <div className="search-modal-item-price">
                          ${product.price?.toFixed(2)}
                        </div>
                        <div className="search-modal-item-stock">
                          {availableStock > 0 ? `${availableStock} disponibles` : 'Agotado'}
                        </div>
                      </div>
                      <div className="search-modal-item-actions">
                        <button 
                          onClick={() => handleViewDetails(product)}
                          className="details-btn"
                        >
                          Ver detalles
                        </button>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="add-to-cart-btn"
                          disabled={availableStock <= 0}
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!isLoading && products.length === 0 && searchQuery.length >= 2 && (
             <div className="search-hint">
                <p>No se encontraron resultados</p>
             </div>
          )}

          {!isLoading && searchQuery.length < 2 && (
            <div className="search-welcome">
              <Search size={48} className="search-welcome-icon" />
              <p>Comienza a escribir para buscar productos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;