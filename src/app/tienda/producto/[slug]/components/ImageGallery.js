export default function ImageGallery({ productSlug }) {
  return (
    <div className="image-gallery">
      <h3>Galería del Producto</h3>
      <div className="main-image">
        <div className="image-placeholder">
          <p>Imagen principal del producto: {productSlug}</p>
        </div>
      </div>
      <div className="thumbnail-images">
        <div className="thumbnail">Thumb 1</div>
        <div className="thumbnail">Thumb 2</div>
        <div className="thumbnail">Thumb 3</div>
      </div>
    </div>
  );
}