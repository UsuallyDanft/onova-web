// src/app/shop/categories/page.js

import { queryAPI } from '@/components/lib/strapi';
import CategoryClientPage from "./CategoryClientPage";

/**
 * Procesa los datos de categorías planos recibidos de Strapi.
 */
function processCategories(strapiData) {
  if (!strapiData || !strapiData.data || !Array.isArray(strapiData.data)) {
    return [];
  }

  const validItems = strapiData.data.filter(item => {
    // Filtra ítems que no tienen un nombre o slug válido.
    return item.name && item.slug;
  });

  const processedCategories = validItems.map(item => {
    const { id, name, description, slug, image } = item;

    // Lee la URL absoluta directamente del objeto 'image'.
    // Asume que la URL es absoluta (por ejemplo, de Supabase o Strapi configurado).
    const finalImageUrl = image?.url;

    // Usa la URL final o un placeholder si no se encuentra la imagen.
    const imageUrl = finalImageUrl || '/img-examples/1.jpg';

    return {
      id: id,
      name: name,
      description: description,
      slug: slug,
      imageUrl: imageUrl
    };
  });

  return processedCategories;
}


export default async function CategoriesPage() {
  const CATEGORY_ENDPOINT = 'api/categories';
  const IMAGE_FIELD_NAME = 'image';
  const queryString = `${CATEGORY_ENDPOINT}?populate=${IMAGE_FIELD_NAME}`;

  const categoriesData = await queryAPI(queryString);

  if (!categoriesData) {
    // Si la API devuelve null (error), devuelve una lista vacía.
    return <CategoryClientPage categories={[]} />;
  }

  const categories = processCategories(categoriesData);

  return (
    <CategoryClientPage categories={categories} />
  );
}