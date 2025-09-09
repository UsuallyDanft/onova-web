export default function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <div className="category-icon">
        {category?.icon || '📁'}
      </div>
      <div className="category-info">
        <h3>{category?.name || 'Categoría'}</h3>
        <p>{category?.description || 'Descripción de la categoría'}</p>
        <span className="products-count">
          {category?.productCount || 0} productos
        </span>
      </div>
    </div>
  );
}