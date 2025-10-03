// src/app/api/search/route.js

import { NextResponse } from 'next/server';
import { queryAPI } from '../../../components/lib/strapi'; // Asegúrate de que esta ruta sea correcta
import Fuse from 'fuse.js'; // 1. Importa Fuse.js

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json({ data: [] });
    }

    // 2. Simplificamos la query a Strapi: Traemos más productos para que Fuse trabaje.
    // Aumentamos el pageSize para tener un buen conjunto de datos para la búsqueda.
    const allProductsPath = 'api/products?populate[images][fields]=url&populate[categories][fields]=name&pagination[pageSize]=100';

    const strapiData = await queryAPI(allProductsPath);

    if (!strapiData || !strapiData.data) {
      return NextResponse.json({ error: 'Failed to fetch products from Strapi' }, { status: 500 });
    }

    const products = strapiData.data;

    // 3. Configura Fuse.js
    const fuseOptions = {
      // keys: Define los campos en los que quieres buscar.
      // name: Le damos más importancia al nombre del producto (weight: 0.7)
      // description: Y menos a la descripción (weight: 0.3)
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description.children.text', weight: 0.3 } // Buscamos en el texto de la descripción
      ],
      includeScore: true,    // Incluye la puntuación de relevancia en los resultados.
      threshold: 0.4,        // Umbral de coincidencia (0.0 = perfecto, 1.0 = cualquiera). Ajusta este valor según tus necesidades.
      minMatchCharLength: 2, // Mínimo de caracteres para empezar a buscar.
    };

    // 4. Crea una instancia de Fuse con tu lista de productos y las opciones.
    const fuse = new Fuse(products, fuseOptions);

    // 5. Realiza la búsqueda
    const results = fuse.search(query);

    // 6. Formatea los resultados para devolver solo los productos.
    // Los resultados de Fuse vienen como { item: producto, score: 0.123, ... }
    const finalResults = results.map(result => result.item);

    // 7. Devuelve los datos filtrados y ordenados por Fuse.js
    // El objeto de respuesta se ajusta para que coincida con el formato original que espera el frontend.
    return NextResponse.json({ data: finalResults });

  } catch (error) {
    console.error('🔍 API Search with Fuse.js Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}