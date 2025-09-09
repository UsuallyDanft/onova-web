import CategoryGrid from "./components/CategoryGrid";

export default function CategoriesPage() {
  return (
    <main className="categories-page">
      <div className="categories-container">
        <h1>Categorías de Productos</h1>
        <p>Explora nuestras diferentes categorías de software y herramientas.</p>
        <CategoryGrid />
      </div>
    </main>
  );
}