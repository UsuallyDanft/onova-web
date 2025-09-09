export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          📦 Imagen
        </div>
      </div>
      <div className="product-info">
        <h3>{product?.name || 'Producto'}</h3>
        <p className="product-price">${product?.price || '99.99'}</p>
        <p className="product-description">
          {product?.description || 'Descripción del producto'}
        </p>
        <button className="add-to-cart-btn">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}