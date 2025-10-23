// src/app/shop/page.js

import { queryAPI } from '@/components/lib/strapi'; 
import ShopClientPage from './ShopClientPage'; 
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// --- ¡CAMBIO 1! ---
// Aceptamos 'searchParams' para leer los parámetros de la URL
export default async function ShopPageContainer({ searchParams }) {
  
  // Leemos el slug de la categoría desde la URL (ej: "categoria-1")
  const categorySlug = searchParams.category;

  // Tu consulta de productos está bien
  const productsQuery = 'api/products?populate[images][fields]=url&populate[categories][fields]=name,slug&populate[tag][fields]=name&populate[digital_inventories][fields]=saleStatus';
  
  // --- ¡CAMBIO 2! ---
  // A TU CONSULTA DE CATEGORÍAS LE FALTABA EL 'slug'. LO AÑADIMOS.
  // (Asumo que la de tags está bien)
  const categoriesQuery = 'api/categories?fields[0]=name&fields[1]=slug';
  const tagsQuery = 'api/tags';

  const [productsData, categoriesData, tagsData] = await Promise.all([
    queryAPI(productsQuery),
    queryAPI(categoriesQuery),
    queryAPI(tagsQuery)
  ]);

  const products = productsData?.data ?? [];
  const categories = categoriesData?.data ?? [];
  const tags = tagsData?.data ?? [];

  // --- ¡CAMBIO 3! ---
  // Buscamos el 'name' de la categoría que coincida con el 'slug' de la URL
  // Si no se encuentra, usamos 'Todos' (el valor por defecto de tu cliente)
  const initialCategoryName = categories.find(c => c.slug === categorySlug)?.name || 'Todos';

  // El procesamiento de stock sigue igual
  const productsWithStock = products.map(product => {
    const inventories = product.digital_inventories || [];
    const availableStock = inventories.filter(
      inv => inv.saleStatus === 'Available'
    ).length;

    return {
      ...product,
      stock: availableStock, 
    };
  });

  return (
    <div>
      <Breadcrumbs/>
      {/* --- ¡CAMBIO 4! --- */}
      {/* Pasamos el nombre de la categoría inicial al cliente */}
      <ShopClientPage 
        products={productsWithStock} 
        categories={categories} 
        tags={tags} 
        initialCategoryName={initialCategoryName} 
      />
    </div>
  );
}