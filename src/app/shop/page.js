// Pagina de tienda (ShopPage) que obtiene datos de productos desde Strapi y los pasa a: ShopClientPage para renderizarlos.
// es un componente de servidor

import { queryAPI } from '@/components/lib/strapi'; 
import ShopClientPage from './ShopClientPage'; 

export default async function ShopPageContainer() {
  

  // AHORA (Más específico): ✅
  const productsData = await queryAPI('api/products?populate=images');
  //log para debug (como se optiene la data de strapi):
  //console.log('DATOS RECIBIDOS DE STRAPI:', JSON.stringify(productsData, null, 2));

  const products = productsData ? productsData.data : [];

  return <ShopClientPage products={products} />;
}