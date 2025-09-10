import ProductGrid from "./components/ProductGrid";
import ProductSidebar from "../../components/product/ProductSidebar";
import './ShopPage.css';

export default function ShopPage() {
  return (
    <main className="shop-page">
      <div className="shop-container">
        <h1>Tienda - Listado de Productos</h1>
        <div className="shop-layout">
          <aside className="shop-sidebar">
            {/* <ProductSidebar /> */}
          </aside>
          <section className="shop-products">
            <ProductGrid />
          </section>
        </div>
      </div>
    </main>
  );
}