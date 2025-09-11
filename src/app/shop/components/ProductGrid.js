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
        // ... (los 50 productos originales)
        {
          id: '51',
          name: 'Plataforma de Big Data Analytics',
          price: '450.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'plataforma-big-data-analytics'
        },
        {
          id: '52',
          name: 'Herramienta de ETL Avanzada',
          price: '180.50',
          images: ['/img-examples/1.jpg'],
          slug: 'herramienta-etl-avanzada'
        },
        {
          id: '53',
          name: 'Software de Business Intelligence (BI)',
          price: '220.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-business-intelligence-bi'
        },
        {
          id: '54',
          name: 'Solución de Cadena de Suministro (SCM)',
          price: '320.99',
          images: ['/img-examples/2.jpg'],
          slug: 'solucion-cadena-suministro-scm'
        },
        {
          id: '55',
          name: 'ERP para Manufactura',
          price: '600.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'erp-para-manufactura'
        },
        {
          id: '56',
          name: 'Software de Logística y Transporte',
          price: '150.00',
          images: ['/img-examples/3.jpg'],
          slug: 'software-logistica-transporte'
        },
        {
          id: '57',
          name: 'Sistema de Gestión de Almacenes (SGA)',
          price: '210.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'sistema-gestion-almacenes-sga'
        },
        {
          id: '58',
          name: 'Plataforma de Realidad Virtual para Capacitación',
          price: '350.00',
          images: ['/img-examples/2.jpg'],
          slug: 'plataforma-realidad-virtual-capacitacion'
        },
        {
          id: '59',
          name: 'Software de Simulación de Procesos',
          price: '280.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-simulacion-procesos'
        },
        {
          id: '60',
          name: 'API de Reconocimiento Facial',
          price: '99.99',
          images: ['/img-examples/1.jpg'],
          slug: 'api-reconocimiento-facial'
        },
        {
          id: '61',
          name: 'Software de Transcripción de Audio a Texto',
          price: '65.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-transcripcion-audio-texto'
        },
        {
          id: '62',
          name: 'Plataforma de Chatbots con IA',
          price: '120.00',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-chatbots-ia'
        },
        {
          id: '63',
          name: 'Sistema de Recomendaciones Personalizadas',
          price: '190.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'sistema-recomendaciones-personalizadas'
        },
        {
          id: '64',
          name: 'Herramienta de Análisis Predictivo',
          price: '250.00',
          images: ['/img-examples/2.jpg'],
          slug: 'herramienta-analisis-predictivo'
        },
        {
          id: '65',
          name: 'Software de Detección de Fraude',
          price: '310.50',
          images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
          slug: 'software-deteccion-fraude'
        },
        {
          id: '66',
          name: 'Plataforma de Trading Algorítmico',
          price: '500.00',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-trading-algoritmico'
        },
        {
          id: '67',
          name: 'Software para Telemedicina',
          price: '275.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'software-telemedicina'
        },
        {
          id: '68',
          name: 'Sistema de Expediente Clínico Electrónico',
          price: '380.99',
          images: ['/img-examples/2.jpg'],
          slug: 'sistema-expediente-clinico-electronico'
        },
        {
          id: '69',
          name: 'Software de Gestión de Granjas (AgriTech)',
          price: '160.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-gestion-granjas-agritech'
        },
        {
          id: '70',
          name: 'Sistema de Monitoreo de Cultivos con Drones',
          price: '420.00',
          images: ['/img-examples/1.jpg'],
          slug: 'sistema-monitoreo-cultivos-drones'
        },
        {
          id: '71',
          name: 'Software de Gestión Hotelera (PMS)',
          price: '230.50',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-gestion-hotelera-pms'
        },
        {
          id: '72',
          name: 'Sistema de Reservas para Restaurantes',
          price: '110.00',
          images: ['/img-examples/3.jpg'],
          slug: 'sistema-reservas-restaurantes'
        },
        {
          id: '73',
          name: 'Software de Edición de Pódcasts',
          price: '55.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'software-edicion-podcasts'
        },
        {
          id: '74',
          name: 'Herramienta de Animación 2D',
          price: '180.00',
          images: ['/img-examples/2.jpg'],
          slug: 'herramienta-animacion-2d'
        },
        {
          id: '75',
          name: 'Software de Composición Musical',
          price: '210.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-composicion-musical'
        },
        {
          id: '76',
          name: 'Software de Gestión de Redes Sociales',
          price: '95.50',
          images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
          slug: 'software-gestion-redes-sociales'
        },
        {
          id: '77',
          name: 'Herramienta de Escucha Social (Social Listening)',
          price: '140.00',
          images: ['/img-examples/2.jpg'],
          slug: 'herramienta-escucha-social'
        },
        {
          id: '78',
          name: 'Plataforma para Marketing de Influencers',
          price: '199.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'plataforma-marketing-influencers'
        },
        {
          id: '79',
          name: 'Generador de Contenido para Blogs con IA',
          price: '85.00',
          images: ['/img-examples/3.jpg'],
          slug: 'generador-contenido-blogs-ia'
        },
        {
          id: '80',
          name: 'Optimizador de Campañas Publicitarias',
          price: '130.50',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'optimizador-campanas-publicitarias'
        },
        {
          id: '81',
          name: 'Software de Control Parental',
          price: '45.00',
          images: ['/img-examples/2.jpg'],
          slug: 'software-control-parental'
        },
        {
          id: '82',
          name: 'Aplicación de Cifrado de Archivos',
          price: '35.99',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'aplicacion-cifrado-archivos'
        },
        {
          id: '83',
          name: 'Herramienta de Mapas Mentales',
          price: '25.00',
          images: ['/img-examples/1.jpg'],
          slug: 'herramienta-mapas-mentales'
        },
        {
          id: '84',
          name: 'Software de Escritura Creativa',
          price: '49.50',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-escritura-creativa'
        },
        {
          id: '85',
          name: 'IDE en la Nube',
          price: '75.00',
          images: ['/img-examples/3.jpg'],
          slug: 'ide-en-la-nube'
        },
        {
          id: '86',
          name: 'Plataforma de Integración Continua (CI/CD)',
          price: '160.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'plataforma-integracion-continua-ci-cd'
        },
        {
          id: '87',
          name: 'Repositorio de Paquetes Privado',
          price: '90.00',
          images: ['/img-examples/2.jpg'],
          slug: 'repositorio-paquetes-privado'
        },
        {
          id: '88',
          name: 'Sistema de Gestión de Flotas de Vehículos',
          price: '240.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'sistema-gestion-flotas-vehiculos'
        },
        {
          id: '89',
          name: 'Software de Planificación de Rutas',
          price: '115.50',
          images: ['/img-examples/1.jpg'],
          slug: 'software-planificacion-rutas'
        },
        {
          id: '90',
          name: 'Software de Gestión de Propiedades Inmobiliarias',
          price: '195.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-gestion-propiedades-inmobiliarias'
        },
        {
          id: '91',
          name: 'Herramienta de Diseño de Interiores 3D',
          price: '89.99',
          images: ['/img-examples/3.jpg'],
          slug: 'herramienta-diseno-interiores-3d'
        },
        {
          id: '92',
          name: 'Software Educativo para Niños (EdTech)',
          price: '59.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'software-educativo-ninos-edtech'
        },
        {
          id: '93',
          name: 'Plataforma de Tutorías en Línea',
          price: '135.00',
          images: ['/img-examples/2.jpg'],
          slug: 'plataforma-tutorias-en-linea'
        },
        {
          id: '94',
          name: 'Creador de Cursos Interactivos',
          price: '175.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'creador-cursos-interactivos'
        },
        {
          id: '95',
          name: 'Sistema de Evaluación y Exámenes en Línea',
          price: '205.00',
          images: ['/img-examples/1.jpg'],
          slug: 'sistema-evaluacion-examenes-en-linea'
        },
        {
          id: '96',
          name: 'Plataforma de Organización de Eventos',
          price: '185.99',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'plataforma-organizacion-eventos'
        },
        {
          id: '97',
          name: 'Herramienta de Creación de Encuestas Avanzadas',
          price: '65.00',
          images: ['/img-examples/3.jpg'],
          slug: 'herramienta-creacion-encuestas-avanzadas'
        },
        {
          id: '98',
          name: 'Software de Gestión de Membresías',
          price: '99.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'software-gestion-membresias'
        },
        {
          id: '99',
          name: 'Plataforma de Donaciones para ONGs',
          price: '79.50',
          images: ['/img-examples/2.jpg'],
          slug: 'plataforma-donaciones-ongs'
        },
        {
          id: '100',
          name: 'Software de Transmisión en Vivo (Live Streaming)',
          price: '155.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-transmision-en-vivo'
        },
        {
          id: '101',
          name: 'Herramienta de Moderación de Contenido',
          price: '110.99',
          images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
          slug: 'herramienta-moderacion-contenido'
        },
        {
          id: '102',
          name: 'Constructor de Comunidades en Línea',
          price: '170.00',
          images: ['/img-examples/2.jpg'],
          slug: 'constructor-comunidades-en-linea'
        },
        {
          id: '103',
          name: 'API de Gamificación',
          price: '88.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'api-gamificacion'
        },
        {
          id: '104',
          name: 'Software de Gestión de Nóminas',
          price: '215.50',
          images: ['/img-examples/3.jpg'],
          slug: 'software-gestion-nominas'
        },
        {
          id: '105',
          name: 'Plataforma de Beneficios para Empleados',
          price: '145.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'plataforma-beneficios-empleados'
        },
        {
          id: '106',
          name: 'Sistema de Seguimiento de Candidatos (ATS)',
          price: '260.00',
          images: ['/img-examples/2.jpg'],
          slug: 'sistema-seguimiento-candidatos-ats'
        },
        {
          id: '107',
          name: 'Herramienta de Evaluación de Desempeño',
          price: '130.99',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'herramienta-evaluacion-desempeno'
        },
        {
          id: '108',
          name: 'Plataforma de Facturación Electrónica',
          price: '85.00',
          images: ['/img-examples/1.jpg'],
          slug: 'plataforma-facturacion-electronica'
        },
        {
          id: '109',
          name: 'Herramienta de Planificación Financiera',
          price: '115.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'herramienta-planificacion-financiera'
        },
        {
          id: '110',
          name: 'Software de Diseño de Circuitos (EDA)',
          price: '320.00',
          images: ['/img-examples/3.jpg'],
          slug: 'software-diseno-circuitos-eda'
        },
        {
          id: '111',
          name: 'Simulador de Redes de Comunicación',
          price: '280.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'simulador-redes-comunicacion'
        },
        {
          id: '112',
          name: 'Plataforma de Desarrollo de Sistemas Embebidos',
          price: '250.00',
          images: ['/img-examples/2.jpg'],
          slug: 'plataforma-desarrollo-sistemas-embebidos'
        },
        {
          id: '113',
          name: 'Software de Gestión de Laboratorio (LIMS)',
          price: '300.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-gestion-laboratorio-lims'
        },
        {
          id: '114',
          name: 'Herramienta de Bioinformática',
          price: '350.00',
          images: ['/img-examples/1.jpg'],
          slug: 'herramienta-bioinformatica'
        },
        {
          id: '115',
          name: 'Software de Modelado Molecular',
          price: '400.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-modelado-molecular'
        },
        {
          id: '116',
          name: 'Constructor de Landing Pages',
          price: '70.99',
          images: ['/img-examples/3.jpg'],
          slug: 'constructor-landing-pages'
        },
        {
          id: '117',
          name: 'Optimizador de Tasa de Conversión (CRO)',
          price: '125.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'optimizador-tasa-conversion-cro'
        },
        {
          id: '118',
          name: 'Herramienta de Heatmaps y Grabación de Sesiones',
          price: '95.00',
          images: ['/img-examples/2.jpg'],
          slug: 'herramienta-heatmaps-grabacion-sesiones'
        },
        {
          id: '119',
          name: 'Software de Pop-ups Inteligentes',
          price: '48.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-pop-ups-inteligentes'
        },
        {
          id: '120',
          name: 'Plataforma de Afiliados',
          price: '180.00',
          images: ['/img-examples/1.jpg'],
          slug: 'plataforma-afiliados'
        },
        {
          id: '121',
          name: 'Software de Mantenimiento Predictivo',
          price: '330.99',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-mantenimiento-predictivo'
        },
        {
          id: '122',
          name: 'Plataforma de Gemelos Digitales',
          price: '480.00',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-gemelos-digitales'
        },
        {
          id: '123',
          name: 'Sistema de Control de Calidad Automatizado',
          price: '290.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'sistema-control-calidad-automatizado'
        },
        {
          id: '124',
          name: 'Base de Datos en Memoria',
          price: '520.00',
          images: ['/img-examples/2.jpg'],
          slug: 'base-de-datos-en-memoria'
        },
        {
          id: '125',
          name: 'Herramienta de Modelado de Datos',
          price: '140.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'herramienta-modelado-de-datos'
        },
        {
          id: '126',
          name: 'Software de Cumplimiento Normativo (RegTech)',
          price: '265.00',
          images: ['/img-examples/1.jpg'],
          slug: 'software-cumplimiento-normativo-regtech'
        },
        {
          id: '127',
          name: 'Plataforma de Fitness y Bienestar Corporativo',
          price: '190.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'plataforma-fitness-bienestar-corporativo'
        },
        {
          id: '128',
          name: 'Plataforma de Mercado para Agricultores',
          price: '95.99',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-mercado-agricultores'
        },
        {
          id: '129',
          name: 'Plataforma de Experiencias Turísticas',
          price: '150.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'plataforma-experiencias-turisticas'
        },
        {
          id: '130',
          name: 'Librería de Efectos de Sonido',
          price: '75.00',
          images: ['/img-examples/2.jpg'],
          slug: 'libreria-efectos-sonido'
        },
        {
          id: '131',
          name: 'Gestor de Tareas Personales Avanzado',
          price: '22.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'gestor-tareas-personales-avanzado'
        },
        {
          id: '132',
          name: 'Compilador de Código Optimizado',
          price: '110.00',
          images: ['/img-examples/1.jpg'],
          slug: 'compilador-codigo-optimizado'
        },
        {
          id: '133',
          name: 'Plataforma de Movilidad como Servicio (MaaS)',
          price: '310.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'plataforma-movilidad-como-servicio-maas'
        },
        {
          id: '134',
          name: 'Plataforma de Crowdfunding Inmobiliario',
          price: '240.99',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-crowdfunding-inmobiliario'
        },
        {
          id: '135',
          name: 'Software de Genealogía',
          price: '60.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'software-genealogia'
        },
        {
          id: '136',
          name: 'Sistema de Votación en Línea Seguro',
          price: '280.00',
          images: ['/img-examples/2.jpg'],
          slug: 'sistema-votacion-en-linea-seguro'
        },
        {
          id: '137',
          name: 'Software de Contabilidad Forense',
          price: '350.50',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'software-contabilidad-forense'
        },
        {
          id: '138',
          name: 'Agregador de Cuentas Bancarias',
          price: '40.00',
          images: ['/img-examples/1.jpg'],
          slug: 'agregador-cuentas-bancarias'
        },
        {
          id: '139',
          name: 'Herramienta de Análisis de Firmware',
          price: '190.00',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'herramienta-analisis-firmware'
        },
        {
          id: '140',
          name: 'Plataforma de Ensayos Clínicos',
          price: '550.00',
          images: ['/img-examples/3.jpg'],
          slug: 'plataforma-ensayos-clinicos'
        },
        {
          id: '141',
          name: 'Sistema de Gestión de Franquicias',
          price: '270.99',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'sistema-gestion-franquicias'
        },
        {
          id: '142',
          name: 'Software de Eficiencia Energética',
          price: '160.00',
          images: ['/img-examples/2.jpg'],
          slug: 'software-eficiencia-energetica'
        },
        {
          id: '143',
          name: 'Lector de Ebooks con Sincronización',
          price: '15.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'lector-ebooks-sincronizacion'
        },
        {
          id: '144',
          name: 'Plataforma de Creación de Portafolios',
          price: '38.00',
          images: ['/img-examples/1.jpg'],
          slug: 'plataforma-creacion-portafolios'
        },
        {
          id: '145',
          name: 'Software de Automatización de Marketing',
          price: '225.50',
          images: ['/img-examples/2.jpg', '/img-examples/3.jpg'],
          slug: 'software-automatizacion-marketing'
        },
        {
          id: '146',
          name: 'API de Análisis de Sentimientos',
          price: '72.00',
          images: ['/img-examples/3.jpg'],
          slug: 'api-analisis-sentimientos'
        },
        {
          id: '147',
          name: 'Herramienta de Testing de Carga',
          price: '175.00',
          images: ['/img-examples/1.jpg', '/img-examples/2.jpg'],
          slug: 'herramienta-testing-carga'
        },
        {
          id: '148',
          name: 'Software de Gestión de Comunidades',
          price: '98.99',
          images: ['/img-examples/2.jpg'],
          slug: 'software-gestion-comunidades'
        },
        {
          id: '149',
          name: 'Plataforma de Finanzas Descentralizadas (DeFi)',
          price: '410.00',
          images: ['/img-examples/3.jpg', '/img-examples/1.jpg'],
          slug: 'plataforma-finanzas-descentralizadas-defi'
        },
        {
          id: '150',
          name: 'Herramienta de Visualización Arquitectónica (ArchViz)',
          price: '360.00',
          images: ['/img-examples/1.jpg', '/img-examples/3.jpg'],
          slug: 'herramienta-visualizacion-arquitectonica-archviz'
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