// src/app/shop/page.js

import { queryAPI } from '@/components/lib/strapi'; 
import ShopClientPage from './ShopClientPage'; 
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default async function ShopPageContainer() {
  
  const queryString = 'api/products?populate[images][fields]=url&populate[categories][fields]=name&populate[tag][fields]=name&populate[digital_inventories][fields]=saleStatus';

  const [productsData, categoriesData, tagsData] = await Promise.all([
    queryAPI(queryString),
    queryAPI('api/categories'),
    queryAPI('api/tags')
  ]);

  const products = productsData?.data ?? [];
  const categories = categoriesData?.data ?? [];
  const tags = tagsData?.data ?? [];

  // Procesar los productos para calcular el stock real
  const productsWithStock = products.map(product => {
    // 1. Accedemos directamente a la propiedad del producto
    const inventories = product.digital_inventories || [];
    
    // 2. Filtramos accediendo directamente a la propiedad del inventario
    const availableStock = inventories.filter(
      inv => inv.saleStatus === 'Available'
    ).length;

    // Devolvemos el producto con su nuevo stock calculado
    return {
      ...product,
      stock: availableStock, 
    };
  });

  return (
    <div>
      <Breadcrumbs/>
      <ShopClientPage products={productsWithStock} categories={categories} tags={tags} />;
    </div>);
}