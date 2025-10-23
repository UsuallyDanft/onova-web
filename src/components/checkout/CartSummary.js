'use client';

import React from 'react';
import { useCart } from '@/components/context/cartContext';
import Image from 'next/image';

import '@/app/shop/checkout/CheckoutPage.css'; 

const CartSummary = () => {
  const { items, total } = useCart();
  if (items.length === 0) {
    return (
      <div className="cart-summary">
        <h4>Resumen de tu pedido</h4>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }
  return (
    <div className="cart-summary">
      <h4>Resumen de tu pedido</h4>
      <div className="summary-item-list">
        {items.map((item) => (
          <div key={item.id} className="summary-item">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="summary-item-image"
            />
            <div className="summary-item-details">
              <span className="summary-item-name">{item.name}</span>
              <span className="summary-item-quantity">Cantidad: {item.quantity}</span>
            </div>
            <span className="summary-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <hr className="summary-divider" />
      
      <div className="summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;