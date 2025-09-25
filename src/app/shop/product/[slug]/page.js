// Dynamic product detail page (server component)

import { queryAPI } from '@/components/lib/strapi';
import ProductDetails from '@/components/product/ProductDetails';

export default async function ProductDetailPage(props) {
  const params = await props.params;
  const { slug } = params;

  // Fetch product by slug with necessary relations
  const query = `api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[images][fields]=url&populate[categories][fields]=name&populate[tags][fields]=name`;
  const response = await queryAPI(query);

  // Debug logs to verify data arriving from Strapi (server console)
  try {
    // Avoid logging excessively large payloads
    const preview = JSON.stringify(response, null, 2);
    console.log('[ProductDetail] slug:', slug);
    console.log('[ProductDetail] query:', query);
    console.log('[ProductDetail] response preview:', preview?.length > 4000 ? preview.slice(0, 4000) + '...<truncated>' : preview);
  } catch (e) {
    console.log('[ProductDetail] Failed to stringify response for logging');
  }

  const productRaw = response?.data?.[0] || null;

  if (!productRaw) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe o fue retirado.</p>
      </div>
    );
  }

  // Normalize to a flat shape similar to ProductCard expectations
  const attrs = productRaw.attributes || {};

  // Images: support both flat array and Strapi-populated relations
  const imagesFlat = Array.isArray(productRaw.images)
    ? productRaw.images.map(img => (typeof img === 'string' ? { url: img } : { url: img?.url }))
    : [];
  const imagesFromAttrs = attrs.images?.data?.map(img => ({ url: img?.attributes?.url })) || [];
  const images = [...imagesFlat, ...imagesFromAttrs].filter(Boolean);

  // Categories/Tags optional
  const categories = (productRaw.categories || attrs.categories?.data || []).map(c => (
    c?.attributes ? { id: c.id, name: c.attributes?.name } : { id: c?.id, name: c?.name }
  ));
  const tags = (productRaw.tags || attrs.tags?.data || []).map(t => (
    t?.attributes ? { id: t.id, name: t.attributes?.name } : { id: t?.id, name: t?.name }
  ));

  // Description may be rich-text array; reduce to plain text
  const descSource = productRaw.description ?? attrs.description ?? '';
  const description = Array.isArray(descSource)
    ? descSource.map(block => block?.children?.map(ch => ch?.text).join(' ') || '').join('\n\n')
    : String(descSource || '');

  const product = {
    id: productRaw.id,
    name: productRaw.name || attrs.name,
    slug: productRaw.slug || attrs.slug,
    price: productRaw.price ?? attrs.price,
    stock: (productRaw.stock ?? attrs.stock) ?? 0,
    description,
    images,
    categories,
    tags,
    createdAt: productRaw.createdAt || attrs.createdAt,
  };

  return <ProductDetails product={product} />;
}


