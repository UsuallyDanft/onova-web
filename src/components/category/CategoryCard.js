// [MODIFICADO] src/components/category/CategoryCard.js
import Image from 'next/image';
import Link from 'next/link';
import "./CategoryCard.css"; // Importamos los nuevos estilos

export default function CategoryCard({ category }) {
  
  // URL de la imagen (ajusta 'imageUrl' según tu API)
  // Usamos una imagen placeholder si no viene
  const imageUrl = category?.imageUrl || '/img-examples/placeholder.jpg';

  return (
    // Envolvemos la tarjeta en un Link para que sea navegable
    <Link href={`/shop/categories/${category?.slug || category.id}`} className="category-card-link">
      <div className="category-card">
        
        {/* Contenedor de la Imagen */}
        <div className="category-image-container">
          <Image
            src={imageUrl}
            alt={category?.name || 'Categoría'}
            fill // 'fill' hace que la imagen cubra el contenedor
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Contenedor de la Información (Título y Descripción) */}
        <div className="category-info">
          <h3>{category?.name || 'Categoría'}</h3>
          <p>{category?.description || 'Descripción de la categoría'}</p>
        </div>
        
      </div>
    </Link>
  );
}