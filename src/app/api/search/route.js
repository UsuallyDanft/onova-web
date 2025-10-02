// route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim() === '') {
      return NextResponse.json({ data: [] });
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

    if (!STRAPI_URL || !STRAPI_TOKEN) {
      console.error('Strapi configuration missing:', { STRAPI_URL: !!STRAPI_URL, STRAPI_TOKEN: !!STRAPI_TOKEN });
      return NextResponse.json({ error: 'Strapi configuration missing' }, { status: 500 });
    }

    // La query a Strapi ahora no necesita ordenar, lo haremos nosotros después.
    const searchQuery = `api/products?filters[$or][0][name][$containsi]=${encodeURIComponent(query)}&filters[$or][1][description][$containsi]=${encodeURIComponent(query)}&populate[images][fields]=url&populate[categories][fields]=name&pagination[pageSize]=10`;

    const response = await fetch(`${STRAPI_URL}/${searchQuery}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('🔍 API Search: Strapi API error:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to fetch from Strapi' }, { status: response.status });
    }

    const data = await response.json();

    // --- NUEVO BLOQUE DE ORDENACIÓN INTELIGENTE ---
    if (data.data && data.data.length > 0) {
      const lowerCaseQuery = query.toLowerCase();

      data.data.sort((a, b) => {
        const nameA = (a.attributes.name || '').toLowerCase();
        const nameB = (b.attributes.name || '').toLowerCase();

        const aStartsWithQuery = nameA.startsWith(lowerCaseQuery);
        const bStartsWithQuery = nameB.startsWith(lowerCaseQuery);

        // Prioridad 1: Si 'a' empieza con la query pero 'b' no, 'a' va primero.
        if (aStartsWithQuery && !bStartsWithQuery) {
          return -1;
        }
        // Prioridad 2: Si 'b' empieza con la query pero 'a' no, 'b' va primero.
        if (!aStartsWithQuery && bStartsWithQuery) {
          return 1;
        }

        // Prioridad 3 (desempate): Si ambos empiezan (o no) con la query, ordenar alfabéticamente.
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        
        return 0;
      });
    }
    // --- FIN DEL NUEVO BLOQUE ---

    return NextResponse.json(data);
  } catch (error) {
    console.error('🔍 API Search: Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}