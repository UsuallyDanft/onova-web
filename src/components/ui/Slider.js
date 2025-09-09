import { useState } from 'react';

export default function Slider({ items = [], autoPlay = true }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="slider">
      <div className="slider-content">
        <button onClick={prevSlide} className="slider-btn prev">‹</button>
        <div className="slide-container">
          {items.length > 0 ? (
            <div className="slide">{items[currentSlide]}</div>
          ) : (
            <div className="slide">No items to display</div>
          )}
        </div>
        <button onClick={nextSlide} className="slider-btn next">›</button>
      </div>
      <div className="slider-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}