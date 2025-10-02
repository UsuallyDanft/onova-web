"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Search, ArrowRight, Package } from 'lucide-react';
// Removed queryAPI import - now using API route
import './searchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);
  const searchCache = useRef(new Map());
  const abortControllerRef = useRef(null);

  // Focus en el input cuando se abre el modal
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Limpiar búsqueda cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Cleanup AbortController al desmontar
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Cancelar búsqueda anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Verificar caché primero
    const cacheKey = query.toLowerCase().trim();
    if (searchCache.current.has(cacheKey)) {
      setSearchResults(searchCache.current.get(cacheKey));
      setHasSearched(true);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // Crear nuevo AbortController para esta búsqueda
    abortControllerRef.current = new AbortController();

    try {
      // Usar la API route para buscar productos
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data?.data) {
        // Guardar en caché
        searchCache.current.set(cacheKey, data.data);
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error al buscar productos:', error);
        setSearchResults([]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce para evitar muchas consultas
    clearTimeout(handleInputChange.timeout);
    handleInputChange.timeout = setTimeout(() => {
      handleSearch(value);
    }, 150);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const getImageUrl = (product) => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '');
    
    // Buscar imagen en diferentes ubicaciones posibles
    let imageUrl = null;
    
    if (product.attributes?.images?.data?.[0]?.attributes?.url) {
      imageUrl = product.attributes.images.data[0].attributes.url;
    } else if (product.images?.[0]?.url) {
      imageUrl = product.images[0].url;
    } else if (product.attributes?.image?.data?.attributes?.url) {
      imageUrl = product.attributes.image.data.attributes.url;
    }
    
    if (imageUrl) {
      const finalUrl = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`;
      return finalUrl;
    }
    
    return '/placeholder-product-1.jpg';
  };

  const getProductName = (product) => {
    return product.attributes?.name || product.name || 'Producto sin nombre';
  };

  const getProductPrice = (product) => {
    return product.attributes?.price || product.price || 0;
  };

  const getProductSlug = (product) => {
    return product.attributes?.slug || product.slug || 'producto';
  };

  const getProductCategories = (product) => {
    const categories = product.attributes?.categories?.data || product.categories || [];
    return categories.map(cat => cat.attributes?.name || cat.name || 'Sin categoría').join(', ');
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-modal-title">
            <Search className="search-icon" />
            <h2>Buscar productos</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="search-modal-content">
          <div className="search-input-container">
            <Search className="search-input-icon" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
          </div>

          {isLoading && (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Buscando productos...</p>
            </div>
          )}

          {!isLoading && hasSearched && searchResults.length === 0 && searchQuery && (
            <div className="search-empty">
              <Package size={48} className="empty-search-icon" />
              <p>No se encontraron productos</p>
              <span>Intenta con otros términos de búsqueda</span>
            </div>
          )}

          {!isLoading && !hasSearched && !searchQuery && (
            <div className="search-placeholder">
              <Search size={48} className="placeholder-icon" />
              <p>Escribe para buscar productos</p>
              <span>Busca por nombre, descripción o categoría</span>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className="search-results">
              <div className="search-results-header">
                <span className="results-count">
                  {searchResults.length} producto{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="search-results-list">
                {searchResults.map((product) => {
                  return (
                    <Link 
                      key={product.id} 
                      href={`/shop/product/${getProductSlug(product)}`}
                      className="search-result-item"
                      onClick={onClose}
                    >
                      <div className="search-result-image">
                        <Image 
                          src={getImageUrl(product)} 
                          alt={getProductName(product)}
                          width={80}
                          height={80}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        />
                      </div>
                      <div className="search-result-details">
                        <h3 className="search-result-name">{getProductName(product)}</h3>
                        <p className="search-result-category">{getProductCategories(product)}</p>
                        <p className="search-result-price">${formatPrice(getProductPrice(product))}</p>
                      </div>
                      <div className="search-result-action">
                        <ArrowRight size={20} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
