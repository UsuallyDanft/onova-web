import ProductGrid from "./components/ProductGrid";
import StoreFilters from "./components/StoreFilters";

export default function TiendaPage() {
  return (
    <main className="tienda-page">
      <div className="tienda-container">
        <h1>Tienda - Listado de Productos</h1>
        <div className="tienda-layout">
          <aside className="tienda-sidebar">
            <StoreFilters />
          </aside>
          <section className="tienda-products">
            <ProductGrid />
          </section>
        </div>
      </div>
    </main>
  );
}