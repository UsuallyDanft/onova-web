export default function ProductActions({ productSlug }) {
  return (
    <div className="product-actions">
      <div className="product-price">
        <h3>$99.99</h3>
      </div>
      <div className="product-description">
        <p>Descripción detallada del producto {productSlug}</p>
      </div>
      <div className="action-buttons">
        <button className="add-to-cart">
          Agregar al Carrito
        </button>
        <button className="buy-now">
          Comprar Ahora
        </button>
        <button className="add-to-favorites">
          ❤️ Favoritos
        </button>
      </div>
    </div>
  );
}