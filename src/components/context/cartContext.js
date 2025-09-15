"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. ESTADO INICIAL: Define cómo se ve un carrito vacío.
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// 2. ACCIONES: Constantes para evitar errores de tipeo al llamar las acciones.
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

// 3. REDUCER: El cerebro que maneja toda la lógica de estado del carrito.
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;

      if (existingItem) {
        // Si el producto ya existe, actualiza su cantidad
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Si es un producto nuevo, lo añade al array
        newItems = [...state.items, action.payload];
      }
      
      // Recalcula el total y la cantidad de items después de cualquier cambio
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case CART_ACTIONS.CLEAR_CART:
      // Resetea el estado al inicial para vaciar el carrito
      return initialState;

    case CART_ACTIONS.LOAD_CART:
      // Carga el estado guardado desde localStorage
      return action.payload;

    default:
      return state;
  }
};

// 4. CREACIÓN DEL CONTEXTO Y HOOK PERSONALIZADO
const CartContext = createContext();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 5. PROVEEDOR DEL CONTEXTO
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al iniciar la app
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que el estado cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // 6. FUNCIONES PÚBLICAS: Lo que los componentes podrán llamar
  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.attributes?.name || product.name,
      price: product.attributes?.price || product.price,
      image: product.imageUrl, // Asume que el objeto product ya tiene la URL de la imagen formateada
      slug: product.attributes?.slug || product.slug,
      quantity,
      stock: product.attributes?.stock || product.stock || 0,
    };
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // 7. VALOR DEL CONTEXTO: Expone el estado y las funciones a los componentes hijos
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};