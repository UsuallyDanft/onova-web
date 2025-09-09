import ImageGallery from "./components/ImageGallery";
import ProductActions from "./components/ProductActions";

export default function ProductPage({ params }) {
  const { slug } = params;

  return (
    <main className="product-page">
      <div className="product-container">
        <div className="product-layout">
          <section className="product-images">
            <ImageGallery productSlug={slug} />
          </section>
          <section className="product-info">
            <h1>Producto: {slug}</h1>
            <p>Detalles del producto seleccionado</p>
            <ProductActions productSlug={slug} />
          </section>
        </div>
      </div>
    </main>
  );
}