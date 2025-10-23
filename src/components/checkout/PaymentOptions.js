import React from 'react';
import '@/app/shop/checkout/CheckoutPage.css'; 

const PaymentOptions = () => {
  return (
    <div className="payment-options">
      <h4>Detalles del pago</h4>
      <p>Selecciona tu método de pago. (ePayco)</p>
      
      {/* Este es el contenedor donde ePayco se "montará".
        Generalmente, ePayco te pedirá un ID de elemento 
      */}
      <div id="epayco-placeholder">
        {/* El script de ePayco reemplazará este contenido 
          con su formulario de tarjeta de crédito.
        */}
        <p className="epayco-loading-text">Cargando formulario de pago...</p>
      </div>
      
      {/* Aquí también iría el script de ePayco, 
        usualmente se añade en el layout.js o aquí 
        usando el componente <Script> de Next.js
      */}
    </div>
  );
};

export default PaymentOptions;