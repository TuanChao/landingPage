import { useEffect, useState } from "react";
import { useSiteContent } from "../../hooks/useSiteContent";
import "./HeroSection.css";

export default function HeroSection() {
  const { hero } = useSiteContent();
  const slides = hero.slides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      goTo((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function goTo(updater: (prev: number) => number) {
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(updater);
      setAnimating(false);
    }, 220);
  }

  const prevSlide = () => goTo((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => goTo((prev) => (prev + 1) % slides.length);

  const activeSlide = slides[activeIndex];

  return (
    <header className="hero">
      <div className={`hero-banner ${activeSlide.theme}`}>
        <div className="hero-deco-ring hero-deco-ring-1" aria-hidden="true" />
        <div className="hero-deco-ring hero-deco-ring-2" aria-hidden="true" />
        <div className="hero-deco-dots" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="hero-dot-dot" />
          ))}
        </div>

        <div className="container hero-grid">
          <div className={`hero-left ${animating ? "hero-fade-out" : "hero-fade-in"}`}>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="hero-title">{activeSlide.title}</h1>
            <p className="lead">{activeSlide.subtitle}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn-hero-cta">{activeSlide.cta}</a>
              <a href="#features" className="btn-hero-ghost">Xem s?n ph?m</a>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-mockup">
              <div className="mockup-bar">
                <span /><span /><span />
              </div>
              <div className="mockup-body">
                <div className="mockup-toolbar" />
                <div className="mockup-canvas">
                  <div className="mockup-line mockup-line-h" style={{ top: "30%" }} />
                  <div className="mockup-line mockup-line-h" style={{ top: "55%" }} />
                  <div className="mockup-line mockup-line-v" style={{ left: "28%" }} />
                  <div className="mockup-shape mockup-rect" />
                  <div className="mockup-shape mockup-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls">
          <button type="button" className="slider-arrow" onClick={prevSlide} aria-label="Slide trý?c">‹</button>
          <div className="slider-dots" aria-hidden="true">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" className="slider-arrow" onClick={nextSlide} aria-label="Slide sau">›</button>
        </div>
      </div>
    </header>
  );
}
