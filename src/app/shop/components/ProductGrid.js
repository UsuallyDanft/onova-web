"use client";

import { useState } from 'react';
import ProductCard from '../../../components/product/ProductCard';
import ProductViewController from '../../../components/product/ProductViewController';
import Pagination from '../../../components/product/Pagination';
import './ProductGrid.css';

export default function ProductGrid({ onFiltersToggle }) {
  // Estados para el control de vista
  const [currentQuantity, setCurrentQuantity] = useState(15);
  const [currentColumns, setCurrentColumns] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  // Datos de ejemplo para demostrar el componente
  const sampleProducts = [
    // ... (los 12 productos originales)
    {
      id: '1',
      name: 'Software de Desarrollo Avanzado',
      price: '89.99',
      images: ['/img-examples/2.jpg', '/img-examples/1.jpg'],
      slug: 'software-desarrollo-avanzado'
    },
    {
      id: '2',
      name: 'Herramientas de IA Premium',
      price: '149.99',
      images: ['/img-examples/3.jpg'],
      slug: 'herramientas-ia-premium'
    },
    {
      id: '3',
      name: 'Suite de Productividad',
      price: '59.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg', '/img-examples/2.jpg'],
      slug: 'suite-productividad'
    },
    {
      id: '4',
      name: 'Plugin de Automatización',
      price: '29.99',
      images: ['/img-examples/1.jpg'],
      slug: 'plugin-automatizacion'
    },
    {
      id: '5',
      name: 'Framework Completo',
      price: '199.99',
      images: ['/img-examples/3.jpg', '/img-examples/2.jpg'],
      slug: 'framework-completo'
    },
    {
      id: '6',
      name: 'Herramienta de Análisis',
      price: '79.99',
      images: ['/img-examples/2.jpg'],
      slug: 'herramienta-analisis'
    },
    {
      id: '7',
      name: 'Plataforma de E-commerce',
      price: '249.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
      slug: 'plataforma-ecommerce'
    },
    {
      id: '8',
      name: 'Servicio de Cloud Hosting',
      price: '49.99',
      images: ['/img-examples/3.jpg'],
      slug: 'servicio-cloud-hosting'
    },
    {
      id: '9',
      name: 'Kit de UI/UX para Móviles',
      price: '39.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'kit-ui-ux-moviles'
    },
    {
      id: '10',
      name: 'Generador de Código IA',
      price: '69.99',
      images: ['/img-examples/2.jpg'],
      slug: 'generador-codigo-ia'
    },
    {
      id: '11',
      name: 'Sistema de Gestión de Contenido (CMS)',
      price: '129.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'sistema-gestion-contenido-cms'
    },
    {
      id: '12',
      name: 'Librería de Componentes Web',
      price: '24.99',
      images: ['/img-examples/3.jpg'],
      slug: 'libreria-componentes-web'
    },
    // ... (Nuevos productos hasta 50)
    {
      id: '13',
      name: 'Suite de Marketing Digital',
      price: '119.99',
      images: ['/img-examples/1.jpg'],
      slug: 'suite-marketing-digital'
    },
    {
      id: '14',
      name: 'Software de Contabilidad en la Nube',
      price: '79.99',
      images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'software-contabilidad-nube'
    },
    {
      id: '15',
      name: 'Plataforma de Email Marketing',
      price: '49.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
      slug: 'plataforma-email-marketing'
    },
    {
      id: '16',
      name: 'Herramienta de Monitoreo de Servidores',
      price: '89.99',
      images: ['/img-examples/3.jpg'],
      slug: 'herramienta-monitoreo-servidores'
    },
    {
      id: '17',
      name: 'Editor de Video Profesional',
      price: '299.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'editor-video-profesional'
    },
    {
      id: '18',
      name: 'Solución de Ciberseguridad',
      price: '199.99',
      images: ['/img-examples/2.jpg'],
      slug: 'solucion-ciberseguridad'
    },
    {
      id: '19',
      name: 'Kit de Desarrollo de Videojuegos',
      price: '159.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'kit-desarrollo-videojuegos'
    },
    {
      id: '20',
      name: 'API de Geolocalización',
      price: '19.99',
      images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
      slug: 'api-geolocalizacion'
    },
    {
      id: '21',
      name: 'Plataforma de Aprendizaje en Línea (LMS)',
      price: '349.99',
      images: ['/img-examples/2.jpg'],
      slug: 'plataforma-aprendizaje-lms'
    },
    {
      id: '22',
      name: 'Software de Gestión de Proyectos',
      price: '69.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'software-gestion-proyectos'
    },
    {
      id: '23',
      name: 'Herramienta de Visualización de Datos',
      price: '99.99',
      images: ['/img-examples/2.jpg'],
      slug: 'herramienta-visualizacion-datos'
    },
    {
      id: '24',
      name: 'SDK para Realidad Aumentada',
      price: '219.99',
      images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
      slug: 'sdk-realidad-aumentada'
    },
    {
      id: '25',
      name: 'CRM para Pequeñas Empresas',
      price: '59.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
      slug: 'crm-pequenas-empresas'
    },
    {
      id: '26',
      name: 'Software de Edición de Audio',
      price: '129.99',
      images: ['/img-examples/3.jpg'],
      slug: 'software-edicion-audio'
    },
    {
      id: '27',
      name: 'Sistema de Reservas Online',
      price: '89.99',
      images: ['/img-examples/2.jpg', '/img-examples/1.jpg'],
      slug: 'sistema-reservas-online'
    },
    {
      id: '28',
      name: 'Plugin de SEO para WordPress',
      price: '49.99',
      images: ['/img-examples/1.jpg'],
      slug: 'plugin-seo-wordpress'
    },
    {
      id: '29',
      name: 'Framework de Backend Escalable',
      price: '179.99',
      images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'framework-backend-escalable'
    },
    {
      id: '30',
      name: 'Generador de Sitios Estáticos',
      price: '39.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'generador-sitios-estaticos'
    },
    {
      id: '31',
      name: 'Herramienta de Pruebas A/B',
      price: '79.99',
      images: ['/img-examples/2.jpg'],
      slug: 'herramienta-pruebas-ab'
    },
    {
      id: '32',
      name: 'Plataforma de Soporte al Cliente',
      price: '99.99',
      images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
      slug: 'plataforma-soporte-cliente'
    },
    {
      id: '33',
      name: 'Software de Diseño Gráfico Vectorial',
      price: '149.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'software-diseno-grafico-vectorial'
    },
    {
      id: '34',
      name: 'API de Procesamiento de Pagos',
      price: '29.99',
      images: ['/img-examples/2.jpg'],
      slug: 'api-procesamiento-pagos'
    },
    {
      id: '35',
      name: 'Sistema de Gestión de Inventario',
      price: '119.99',
      images: ['/img-examples/3.jpg'],
      slug: 'sistema-gestion-inventario'
    },
    {
      id: '36',
      name: 'Herramienta de Colaboración en Equipo',
      price: '34.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
      slug: 'herramienta-colaboracion-equipo'
    },
    {
      id: '37',
      name: 'Software de Renderizado 3D',
      price: '399.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'software-renderizado-3d'
    },
    {
      id: '38',
      name: 'Plataforma No-Code',
      price: '139.99',
      images: ['/img-examples/2.jpg'],
      slug: 'plataforma-no-code'
    },
    {
      id: '39',
      name: 'Extensión de Navegador para Productividad',
      price: '9.99',
      images: ['/img-examples/1.jpg'],
      slug: 'extension-navegador-productividad'
    },
    {
      id: '40',
      name: 'Servicio de VPN Empresarial',
      price: '199.99',
      images: ['/img-examples/3.jpg', '/img-examples/2.jpg'],
      slug: 'servicio-vpn-empresarial'
    },
    {
      id: '41',
      name: 'Software de Recursos Humanos (RRHH)',
      price: '189.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
      slug: 'software-recursos-humanos-rrhh'
    },
    {
      id: '42',
      name: 'API de Traducción Automática',
      price: '49.99',
      images: ['/img-examples/3.jpg'],
      slug: 'api-traduccion-automatica'
    },
    {
      id: '43',
      name: 'Herramienta de Gestión de Contraseñas',
      price: '19.99',
      images: ['/img-examples/2.jpg', '/img-examples/1.jpg'],
      slug: 'herramienta-gestion-contrasenas'
    },
    {
      id: '44',
      name: 'Plataforma de Webinars y Eventos Virtuales',
      price: '159.99',
      images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
      slug: 'plataforma-webinars-eventos-virtuales'
    },
    {
      id: '45',
      name: 'Software de Automatización Robótica de Procesos (RPA)',
      price: '499.99',
      images: ['/img-examples/2.jpg'],
      slug: 'software-rpa'
    },
    {
      id: '46',
      name: 'Sistema de Punto de Venta (POS)',
      price: '139.99',
      images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
      slug: 'sistema-punto-de-venta-pos'
    },
    {
      id: '47',
      name: 'Herramienta de Wireframing y Prototipado',
      price: '59.99',
      images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
      slug: 'herramienta-wireframing-prototipado'
    },
    {
      id: '48',
      name: 'Software de Gestión Documental',
      price: '99.99',
      images: ['/img-examples/2.jpg'],
      slug: 'software-gestion-documental'
    },
    {
      id: '49',
      name: 'Plataforma de Internet de las Cosas (IoT)',
      price: '299.99',
      images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
      slug: 'plataforma-internet-cosas-iot'
    },
    {
      id: '50',
      name: 'Kit de Plantillas para Presentaciones',
      price: '29.99',
      images: ['/img-examples/1.jpg'],
      slug: 'kit-plantillas-presentaciones'
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
          onFiltersToggle={onFiltersToggle}
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