// src/components/shop/CategoryGrid.js
import CategoryCard from "@/components/category/CategoryCard";
import "./CategoryGrid.css";

export default function CategoryGrid({ categories }) {
  // verifica si hay categorías para mostrar
  if (!categories || categories.length === 0) {
    return <p>No hay categorías disponibles.</p>;
  }

  return (
    <div className="category-grid">
      {/* Mapea las categorías y renderizamos una Card por cada una */}
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}