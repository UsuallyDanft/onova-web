import { queryAPI } from '@/components/lib/strapi';
import ProductDetails from '@/components/product/ProductDetails';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default async function ProductDetailPage(props) {
  const params = await props.params;
  const { slug } = params;

  const query = `api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[images][fields]=url&populate[categories][fields]=name&populate[tags][fields]=name`;
  const response = await queryAPI(query);
  const productRaw = response?.data?.[0] || null;

  if (!productRaw) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe o fue retirado.</p>
      </div>
    );
  }

  const attrs = productRaw.attributes || {};
  const imagesFlat = Array.isArray(productRaw.images)
    ? productRaw.images.map(img => (typeof img === 'string' ? { url: img } : { url: img?.url }))
    : [];
  const imagesFromAttrs = attrs.images?.data?.map(img => ({ url: img?.attributes?.url })) || [];
  const images = [...imagesFlat, ...imagesFromAttrs].filter(Boolean);

  // Mantenemos la variable `dataSource` para los demás campos, ya que funcionó
  const dataSource = productRaw.attributes || productRaw;

  const categories = (dataSource.categories?.data || []).map(c => (
    c?.attributes ? { id: c.id, name: c.attributes?.name } : { id: c?.id, name: c?.name }
  ));
  const tags = (dataSource.tags?.data || []).map(t => (
    t?.attributes ? { id: t.id, name: t.attributes?.name } : { id: t?.id, name: t?.name }
  ));

  const descSource = dataSource.description ?? '';
  const description = Array.isArray(descSource)
    ? descSource.map(block => block?.children?.map(ch => ch?.text).join(' ') || '').join('\n\n')
    : String(descSource || '');
    
  const longDescription = dataSource.longDescription || null;

  const product = {
    id: productRaw.id,
    name: dataSource.name,
    slug: dataSource.slug,
    price: dataSource.price,
    stock: dataSource.stock ?? 0,
    description,
    longDescription,
    images,
    categories,
    tags,
    createdAt: dataSource.createdAt,
  };

  return (
    <div>
      <Breadcrumbs productName={product.name} />
      <ProductDetails product={product} />
    </div>
  );
}