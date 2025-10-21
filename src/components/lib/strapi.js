export async function queryAPI(path, init = {}) {
  const strapiHost = process.env.NEXT_PUBLIC_STRAPI_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;

  if (!strapiHost) {
    console.error("Error: El host de Strapi no está configurado.");
    return null;
  }
  if (!strapiToken) {
    console.error("Error: El token de la API de Strapi no está configurado.");
    return null;
  }

  const relativePath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(relativePath, strapiHost);

  try {
    const response = await fetch(url.href, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        ...init.headers,
      },
      // Evita respuestas cacheadas durante navegación entre páginas
      cache: 'no-store',
      next: { revalidate: 0 },
      ...init,
    });

    if (!response.ok) {
      console.error(`Error al hacer la petición: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error de conexión con la API de Strapi:", error);
    return null;
  }
}