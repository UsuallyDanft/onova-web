// [NUEVO] src/app/shop/categories/CategoryClientPage.js
"use client"; // Marcamos este componente como Cliente

import CategoryGrid from "@/components/shop/CategoryGrid";
import "./CategoryClientPage.css"; // CSS para esta página

export default function CategoryClientPage({ categories }) {
  return (
    <main className="categories-page">
      <div className="categories-container">
        <h1>Categorías de Productos</h1>
        <p>Explora nuestras diferentes categorías de software y herramientas.</p>
        
        {/* Pasamos las categorías al Grid */}
        <CategoryGrid categories={categories} />
      </div>
    </main>
  );
}