import ProductCard from '../../../components/product/ProductCard';
import './ProductGrid.css';

export default function ProductGrid() {
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

  return (
    <div className="product-grid">
      <h2>Productos Disponibles</h2>
      <div className="products-container">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}