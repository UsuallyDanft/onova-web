// Archivo: app/shop/page.js

import { queryAPI } from '@/components/lib/strapi'; 
import ShopClientPage from './ShopClientPage'; 

export default async function ShopPageContainer() {
  

  // AHORA (Más específico): ✅
  const productsData = await queryAPI('api/products?populate=images');

  console.log('DATOS RECIBIDOS DE STRAPI:', JSON.stringify(productsData, null, 2));

  const products = productsData ? productsData.data : [];

  return <ShopClientPage products={products} />;
}