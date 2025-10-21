// src/app/shop/product/[slug]/page.js

import { queryAPI } from '@/components/lib/strapi';
import ProductDetails from '@/components/product/ProductDetails';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }) {
  const { slug } = params;

  // 1. Usamos la consulta exacta que funcionó en api.rest
  const queryString = `api/products?filters[slug][$eq]=${slug}&populate[images][fields]=url&populate[categories][fields]=name&populate[tag][fields]=name&populate[digital_inventories][fields]=saleStatus`;

  const response = await queryAPI(queryString);

  // Si la respuesta es nula o no hay productos, mostramos un 404.
  if (!response || !response.data || response.data.length === 0) {
    notFound();
  }

  // Obtenemos el producto.
  const productRaw = response.data[0];

  // 2. Calculamos el stock real a partir del inventario digital.
  const inventories = productRaw.digital_inventories || [];
  const availableStock = inventories.filter(
    (inv) => inv.saleStatus === 'Available'
  ).length;

  // 3. Creamos el objeto 'product' final con todos los datos limpios.
  const product = {
    id: productRaw.id,
    name: productRaw.name,
    slug: productRaw.slug,
    price: productRaw.price,
    description: productRaw.description,
    longDescription: productRaw.longDescription,
    images: productRaw.images,
    categories: productRaw.categories,
    tag: productRaw.tag,
    createdAt: productRaw.createdAt,
    stock: availableStock, 
  };

  // 4. Pasamos el objeto 'product' limpio al componente cliente.
  return (
    <div>
      <Breadcrumbs productName={product.name} />
      <ProductDetails product={product} />
    </div>
  );
}