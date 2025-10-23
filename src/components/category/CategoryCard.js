// src/components/category/CategoryCard.js
import Image from 'next/image';
import Link from 'next/link';
import "./CategoryCard.css"; 

export default function CategoryCard({ category }) {
  
  // Usamos 1.jpg como placeholder si no hay imagen
  const imageUrl = category?.imageUrl || '/img-examples/1.jpg'; 

  return (
    // --- ¡CAMBIO CLAVE AQUÍ! ---
    // Apuntamos el Link a la página de la tienda (/shop)
    // y pasamos el 'slug' de la categoría en la URL.
    <Link 
      href={`/shop?category=${category?.slug || category.id}`} 
      className="category-card-link"
    >
      <div className="category-card">
        
        <div className="category-image-container">
          <Image
            src={imageUrl}
            alt={category?.name || 'Categoría'}
            fill 
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="category-info">
          <h3>{category?.name || 'Categoría'}</h3>
          <p>{category?.description || 'Descripción de la categoría'}</p>
        </div>
        
      </div>
    </Link>
  );
}