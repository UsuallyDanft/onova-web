export default function Banner({ title, subtitle, backgroundImage }) {
  return (
    <div className="banner" style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined}}>
      <div className="banner-content">
        <h1 className="banner-title">{title}</h1>
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}