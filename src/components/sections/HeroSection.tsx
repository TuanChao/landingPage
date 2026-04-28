import { useEffect, useState } from "react";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function HeroSection() {
  const { hero } = useSiteContent();
  const slides = hero.slides;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <header className="hero">
      <div className={`hero-banner ${activeSlide.theme}`}>
        <div className="container hero-content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-title">{activeSlide.title}</h1>
          <p className="lead">{activeSlide.subtitle}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-outline">
              {activeSlide.cta}
            </a>
          </div>
          <div className="slider-nav">
            <button type="button" className="slider-arrow" onClick={prevSlide} aria-label="Previous slide">
              ‹
            </button>
            <button type="button" className="slider-arrow" onClick={nextSlide} aria-label="Next slide">
              ›
            </button>
          </div>
          <div className="slider-dots" aria-hidden="true">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
