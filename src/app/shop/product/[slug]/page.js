// src/app/shop/product/[slug]/page.js

// 1. Importa el archivo CSS de forma global
import "./ProductDetailPage.css";

import ImageGallery from "@/components/product/ImageGallery";
import ProductActions from "@/components/product/InfoActions";

export default function ProductPage({ params }) {
  const { slug } = params;

  return (
    // 2. Asegúrate de que los className coincidan con el archivo CSS
    <main className="product-page">
      <div className="product-container">
        <div className="product-layout">
          <section className="product-images">
            <ImageGallery productSlug={slug} />
          </section>

          <section className="product-info">
            <ProductActions productSlug={slug} />
          </section>
        </div>
      </div>
    </main>
  );
}