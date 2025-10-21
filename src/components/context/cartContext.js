"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. ESTADO INICIAL
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// 2. ACCIONES
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
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map(item => {
          if (item.id === newItem.id) {
            //Calcula la nueva cantidad y la limita al stock disponible.
            let newQuantity = item.quantity + newItem.quantity;
            if (newQuantity > item.stock) {
              console.warn(`Cantidad excede el stock. Se ajustó a ${item.stock}.`);
              newQuantity = item.stock; // Limita la cantidad al stock máximo.
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
      } else {
         // Si la cantidad inicial excede el stock, ajústala.
         if (newItem.quantity > newItem.stock) {
            console.warn(`Cantidad inicial excede el stock. Se ajustó a ${newItem.stock}.`);
            newItem.quantity = newItem.stock;
         }
        newItems = [...state.items, newItem];
      }
      
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
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      
      if (!itemToUpdate) return state;

      //Limita la cantidad actualizada al stock del producto.
      let newQuantity = quantity;
      if (newQuantity > itemToUpdate.stock) {
        console.warn(`Cantidad excede el stock. Se ajustó a ${itemToUpdate.stock}.`);
        newQuantity = itemToUpdate.stock;
      }

      const newItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      );

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// 4. CREACIÓN DEL CONTEXTO Y HOOK
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl, 
      slug: product.slug,
      quantity,
      stock: product.stock || 0,
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