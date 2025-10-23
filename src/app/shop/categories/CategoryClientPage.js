// src/app/shop/categories/CategoryClientPage.js
"use client";

import CategoryGrid from "@/components/shop/CategoryGrid";
import "./CategoryClientPage.css";

export default function CategoryClientPage({ categories }) {
  return (
    <main className="categories-page">
      <div className="categories-container">
        <h1>Categorías de Productos</h1>
        <p>Explora nuestras diferentes categorías de software y herramientas.</p>
        <CategoryGrid categories={categories} />
      </div>
    </main>
  );
}