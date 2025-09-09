import CategoryGrid from "./components/CategoryGrid";

export default function CategoriasPage() {
  return (
    <main className="categorias-page">
      <div className="categorias-container">
        <h1>Categorías de Productos</h1>
        <p>Explora nuestras diferentes categorías de software y herramientas.</p>
        <CategoryGrid />
      </div>
    </main>
  );
}