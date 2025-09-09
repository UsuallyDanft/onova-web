import ImageGallery from "./components/ImageGallery";
import ProductActions from "./components/ProductActions";

export default function ProductoPage({ params }) {
  const { slug } = params;

  return (
    <main className="producto-page">
      <div className="producto-container">
        <div className="producto-layout">
          <section className="producto-images">
            <ImageGallery productSlug={slug} />
          </section>
          <section className="producto-info">
            <h1>Producto: {slug}</h1>
            <p>Detalles del producto seleccionado</p>
            <ProductActions productSlug={slug} />
          </section>
        </div>
      </div>
    </main>
  );
}