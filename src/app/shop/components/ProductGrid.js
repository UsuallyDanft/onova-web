import { useState } from 'react';
import ProductCard from '../../../components/product/ProductCard';
import ProductViewController from '../../../components/product/ProductViewController';
import Pagination from '../../../components/product/Pagination';
import './ProductGrid.css';

export default function ProductGrid() {
  // Estados para el control de vista
  const [currentQuantity, setCurrentQuantity] = useState(15);
  const [currentColumns, setCurrentColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  // Datos de ejemplo para demostrar el componente
  const sampleProducts = [
    {
      id: '1',
      name: 'Software de Desarrollo Avanzado',
      price: '89.99',
      images: ['/placeholder-product-1.jpg', '/placeholder-product-2.jpg'],
      slug: 'software-desarrollo-avanzado'
    },
    {
      id: '2',
      name: 'Herramientas de IA Premium',
      price: '149.99',
      images: ['/placeholder-product-1.jpg'],
      slug: 'herramientas-ia-premium'
    },
    {
      id: '3',
      name: 'Suite de Productividad',
      price: '59.99',
      images: ['/placeholder-product-1.jpg', '/placeholder-product-2.jpg', '/placeholder-product-3.jpg'],
      slug: 'suite-productividad'
    },
    {
      id: '4',
      name: 'Plugin de Automatización',
      price: '29.99',
      images: ['/placeholder-product-1.jpg'],
      slug: 'plugin-automatizacion'
    },
    {
      id: '5',
      name: 'Framework Completo',
      price: '199.99',
      images: ['/placeholder-product-1.jpg', '/placeholder-product-2.jpg'],
      slug: 'framework-completo'
    },
    {
      id: '6',
      name: 'Herramienta de Análisis',
      price: '79.99',
      images: ['/placeholder-product-1.jpg'],
      slug: 'herramienta-analisis'
    }
  ];

  // Función para obtener productos paginados
  const getDisplayedProducts = () => {
    const startIndex = (currentPage - 1) * currentQuantity;
    const endIndex = startIndex + currentQuantity;
    return sampleProducts.slice(startIndex, endIndex);
  };

  // Calcular total de páginas
  const totalPages = Math.ceil(sampleProducts.length / currentQuantity);

  // Handlers para los controles
  const handleQuantityChange = (quantity) => {
    setCurrentQuantity(quantity);
    setCurrentPage(1); // Reset a primera página cuando cambia cantidad
  };

  const handleColumnsChange = (columns) => {
    setCurrentColumns(columns);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-grid">
      {/* Header con título y controlador de vista */}
      <div className="product-grid-header">
        <h2>Productos Disponibles</h2>
        <ProductViewController
          onQuantityChange={handleQuantityChange}
          onColumnsChange={handleColumnsChange}
          currentQuantity={currentQuantity}
          currentColumns={currentColumns}
        />
      </div>

      {/* Contenedor de productos con columnas dinámicas */}
      <div 
        className="products-container"
        data-columns={currentColumns}
      >
        {getDisplayedProducts().map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}