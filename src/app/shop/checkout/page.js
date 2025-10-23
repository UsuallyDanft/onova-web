import React from 'react';
import CartSummary from '@/components/checkout/CartSummary';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import Breadcrumbs from '@/components/ui/Breadcrumbs'; 

import './CheckoutPage.css';

const CheckoutPage = () => {
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/shop' },
    { name: 'Checkout', path: '/shop/checkout' },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} />
      <div className="checkout-container">
        
        {/* 3. Columna izquierda (Pasarela) */}
        <div className="payment-section">
          <PaymentOptions />
        </div>
        
        {/* 4. Columna derecha (Resumen) */}
        <div className="summary-section">
          <CartSummary />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;