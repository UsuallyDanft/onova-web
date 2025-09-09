export default function CartSummary() {
  return (
    <div className="cart-summary">
      <h3>Resumen del Carrito</h3>
      <div className="cart-items">
        <div className="cart-item">
          <span>Producto 1</span>
          <span>$99.99</span>
        </div>
        <div className="cart-item">
          <span>Producto 2</span>
          <span>$149.99</span>
        </div>
      </div>
      <div className="cart-total">
        <strong>Total: $249.98</strong>
      </div>
    </div>
  );
}