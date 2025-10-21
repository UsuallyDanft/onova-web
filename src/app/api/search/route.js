// src/app/api/search/route.js

import { NextResponse } from 'next/server';
import { queryAPI } from '../../../components/lib/strapi';
import Fuse from 'fuse.js';

export async function GET(request) {
  try {
    // 1. Obtiene el término de búsqueda de la URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json({ data: [] });
    }

    // 2. Obtiene *todos* los productos de Strapi para buscarlos localmente
    const allProductsPath = 'api/products?populate[images][fields]=url&populate[categories][fields]=name&pagination[pageSize]=100';

    const strapiData = await queryAPI(allProductsPath);

    if (!strapiData || !strapiData.data) {
      return NextResponse.json({ error: 'Failed to fetch products from Strapi' }, { status: 500 });
    }

    const products = strapiData.data;

    // 3. Configura las opciones de búsqueda de Fuse.js
    const fuseOptions = {
      // Define los campos (nombre, descripción) y su prioridad (peso)
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description.children.text', weight: 0.3 }
      ],
      includeScore: true, // Incluye la puntuación de relevancia
      threshold: 0.4,     // Nivel de tolerancia (0.0 es más estricto)
      minMatchCharLength: 2,
    };

    // 4. Crea la instancia de Fuse con los productos y las opciones
    const fuse = new Fuse(products, fuseOptions);

    // 5. Ejecuta la búsqueda con el término del usuario
    const results = fuse.search(query);

    // 6. Formatea los resultados para extraer solo los datos del producto
    const finalResults = results.map(result => result.item);

    // 7. Devuelve los productos encontrados
    return NextResponse.json({ data: finalResults });

  } catch (error) {
    console.error('🔍 API Search with Fuse.js Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}