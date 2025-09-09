export default function ProductGrid() {
  return (
    <div className="product-grid">
      <h2>Productos Disponibles</h2>
      <div className="products-container">
        <div className="product-placeholder">
          <p>Producto 1</p>
        </div>
        <div className="product-placeholder">
          <p>Producto 2</p>
        </div>
        <div className="product-placeholder">
          <p>Producto 3</p>
        </div>
        <p>Aquí se mostrarán todos los productos de la tienda</p>
      </div>
    </div>
  );
}