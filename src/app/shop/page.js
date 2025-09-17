// src/app/shop/page.js

import { queryAPI } from '@/components/lib/strapi'; 
import ShopClientPage from './ShopClientPage'; 

export default async function ShopPageContainer() {
  
  // 1. Ejecutar todas las consultas a la API en paralelo para eficiencia
  const [productsData, categoriesData, tagsData] = await Promise.all([
    queryAPI('api/products?populate[images][fields]=url&populate[categories][fields]=name&populate[tags][fields]=name'), // Obtenemos productos con sus relaciones
    queryAPI('api/categories'),          // Obtenemos todas las categorías
    queryAPI('api/tags')                 // Obtenemos todos los tags
  ]);

  // 2. Extraer los datos de forma segura, asignando un array vacío si algo falla
  const products = productsData?.data ?? [];
  const categories = categoriesData?.data ?? [];
  const tags = tagsData?.data ?? [];

  // 3. Pasar todos los datos al componente cliente
  return <ShopClientPage products={products} categories={categories} tags={tags} />;
}